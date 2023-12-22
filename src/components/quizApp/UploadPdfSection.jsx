import React, { useState } from 'react';

const UploadPdfSection = ({ onNext }) => {
  const [pdfInput, setPdfInput] = useState(null);

  const handlePdfSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to handle PDF submission
    console.log('PDF Submitted:', pdfInput);
    onNext();
  };

  return (
    <div className="container-fluid" style={{background:"#f8edeb"}}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <section>
            <h2>Section 2: Upload PDF</h2>
            <form onSubmit={handlePdfSubmit} encType="multipart/form-data">
              <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="pdfInput"
                  onChange={(e) => setPdfInput(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="pdfInput">
                  {pdfInput ? pdfInput.name : 'Choose PDF file'}
                </label>
              </div>
              <button className="btn btn-primary" type="submit">
                Generate MCQs
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UploadPdfSection;
