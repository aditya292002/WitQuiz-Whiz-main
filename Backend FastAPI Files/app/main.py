from fastapi import FastAPI
from fastapi.middleware.cors import  CORSMiddleware
from .routers import users, auth, mcq_routes  # Adjust import paths
from .database import engine
from . import models

# Allow all origins to access your API (adjust as needed for production)
origins = ["http://localhost:3000"]

models.Base.metadata.create_all(bind=engine)  # Consider using Alembic for production

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Including the routers
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(mcq_routes.router)

@app.get("/")
async def test():
    return {"message": "Hello World"}
