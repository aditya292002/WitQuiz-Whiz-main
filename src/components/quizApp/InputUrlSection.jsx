import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { checkCookie } from '../../assets/scripts/login_info';

const InputUrlSection = () => {
  const [urlInput, setUrlInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [accessCount, setAccessCount] = useState(10);

  useEffect(() => {
    // Fetch the access count for the current account
    const fetchAccessCount = async () => {
      try {
        const token = checkCookie();
        const response = await axios.post(
          'http://localhost:3000/access_count',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update the accessCount state with the fetched count
          setAccessCount(response.data.access_count);
        }
      } catch (error) {
        console.error('Error fetching access count:', error);
      }
    };

    fetchAccessCount(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    console.log('URL Submitted:', urlInput);

    if (accessCount === 0) {
      console.log('Access count exhausted. Cannot submit.');
      return;
    }

    try {
      const token = checkCookie();
      const response = await axios.post('http://localhost:8000/gen_mcq/url', { url: urlInput }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        let mcqs = JSON.stringify(response.data, null, 2);
        let parsedData = JSON.parse(mcqs);
        console.log(parsedData);
        setApiResponse(parsedData);
        setAccessCount(accessCount - 1);
      }
    } catch (error) {
      console.error('Error:', error);
      setApiResponse(null);
    }
  };
  const styles = {
    accessCount: {
      color: "#50C878",
      fontStyle: "italic",
      fontWeight: '500',
      fontSize: '1.5rem',
      background: '#E5E4E2',
      width:'19rem',
      margin: 0, // You can adjust the margin as needed
    },
  };

  const PreformattedText = () => {
    const rawHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Binary Search MCQs</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
        }
    
        .question-container {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 20px;
        }
    
        .options-container {
          margin-top: 10px;
        }
    
        .option {
          margin-bottom: 5px;
        }
    
        .description-container {
          display: none;
          margin-top: 10px;
        }
    
        .show-description-btn {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
    
    <div class="question-container">
      <p id="question1">What is the time complexity of the binary search algorithm?</p>
      <div class="options-container">
        <div class="option"><label><input type="radio" name="answer1" value="1"> O(n)</label></div>
        <div class="option"><label><input type="radio" name="answer1" value="2"> O(log n)</label></div>
        <div class="option"><label><input type="radio" name="answer1" value="3"> O(n^2)</label></div>
        <div class="option"><label><input type="radio" name="answer1" value="4"> O(1)</label></div>
      </div>
      <button class="show-description-btn" onclick="showDescription('description1')">Show Description</button>
      <div class="description-container" id="description1">
        <p>Binary search has a time complexity of O(log n) as it divides the search space in half at each step.</p>
      </div>
    </div>
    
    <div class="question-container">
      <p id="question2">In order to perform binary search, the input array must be:</p>
      <div class="options-container">
        <div class="option"><label><input type="radio" name="answer2" value="1"> Unsorted</label></div>
        <div class="option"><label><input type="radio" name="answer2" value="2"> Sorted in ascending order</label></div>
        <div class="option"><label><input type="radio" name="answer2" value="3"> Sorted in descending order</label></div>
        <div class="option"><label><input type="radio" name="answer2" value="4"> Randomly arranged</label></div>
      </div>
      <button class="show-description-btn" onclick="showDescription('description2')">Show Description</button>
      <div class="description-container" id="description2">
        <p>Binary search requires a sorted array to efficiently find an element by repeatedly dividing the search space in half.</p>
      </div>
    </div>
    
    <div class="question-container">
      <p id="question3">What is the key requirement for binary search to work correctly?</p>
      <div class="options-container">
        <div class="option"><label><input type="radio" name="answer3" value="1"> Elements in the array must be unique</label></div>
        <div class="option"><label><input type="radio" name="answer3" value="2"> Elements in the array must be integers</label></div>
        <div class="option"><label><input type="radio" name="answer3" value="3"> Elements in the array must be stored in a linked list</label></div>
        <div class="option"><label><input type="radio" name="answer3" value="4"> Elements in the array must be sorted</label></div>
      </div>
      <button class="show-description-btn" onclick="showDescription('description3')">Show Description</button>
      <div class="description-container" id="description3">
        <p>Binary search relies on the array being sorted for its efficient search strategy.</p>
      </div>
    </div>
    
    <script>
      function showDescription(descriptionId) {
        var descriptionContainer = document.getElementById(descriptionId);
        descriptionContainer.style.display = 'block';
      }
    </script>
    
    </body>
    </html>
    
    
    `;

    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
  };


  return (
    <div className="container-fluid" style={{ background: "#f8edeb" }}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <section>
            <h2 style={{fontSize:'2.5rem'}}>Input URL</h2>
            {/* <p style={{color:"#50C878", textDecoration:"Italics", fontWeight:'500', fontSize:'1rem'}}>Access Count: {accessCount}</p> */}
            <p style={styles.accessCount}>
              Access Count Left: 9
            </p>

            <form onSubmit={handleUrlSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter URL"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Generate MCQs
                </button>
              </div>
            </form>

            {apiResponse && (
              <div className="response-block" style={{ width: '60rem', overflowX: 'auto' }}>
                <h3>API Response:</h3>
                <div style={{ width: "50rem", height: 'auto' }}>
                  {apiResponse.map((item, index) => (
                    <div key={index}>
                      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(item, null, 2)}</pre>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {PreformattedText()}

          </section>
        </div>
      </div>
    </div>
  );
};

export default InputUrlSection;
