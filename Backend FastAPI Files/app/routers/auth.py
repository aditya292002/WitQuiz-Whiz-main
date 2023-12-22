from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..utility import passwd_utils

from .. import database, schemas, models, oauth2

router = APIRouter(tags=['Authentication'])


@router.post('/check')
def check_login(user: schemas.User, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(    
        models.User.email == user.email).first()
    if not user:
        return {"details": "New User"}
    return HTTPException(status_code=status.HTTP_200_OK,detail="User Already exists")


@router.post('/login', response_model=schemas.Token)
def login(user_credentials: schemas.UserCreate, db: Session = Depends(database.get_db)):

    user = db.query(models.User).filter(    
        models.User.email == user_credentials.email).first()


    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not passwd_utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    # create a token
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    
    # return token
    return {"access_token": access_token, "token_type": "bearer"}

# get access 
@router.get("/access_count", status_code=status.HTTP_200_OK)
async def getAccessCount(db: Session = Depends(get_db),user_id: int = Depends(oauth2.get_current_user)):
    
    user = db.query(models.User).filter(    
        models.User.id == user_id).first()


    return user.access_count