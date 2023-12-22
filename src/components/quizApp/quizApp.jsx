import React, { useState } from 'react';
import InputUrlSection from './InputUrlSection';
import UploadPdfSection from './UploadPdfSection';
import DisplayMcqSection from './DisplayMcqSection';

const QuizApp = () => {
  const [section, setSection] = useState(1); // Track the current section

  const handleSectionChange = () => {
    setSection((prevSection) => prevSection + 1);
  };

  // You may need to manage MCQs state here and pass it to DisplayMcqSection

  return (
    <div style={{margin:'0'}}>
      {section === 1 && <InputUrlSection onNext={handleSectionChange} />}
      {section === 2 && <UploadPdfSection onNext={handleSectionChange} />}
      {/* {section === 3 && <DisplayMcqSection mcqs=Pass your MCQs array here />} */}
    </div>
  );
};

export default QuizApp;
