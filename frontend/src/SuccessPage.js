import React from 'react';

function SuccessPage({ onBack }) {
  return (
    <>
      <style>
        {`
          body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: linear-gradient(120deg, #e6ffe6 0%, #f6d365 100%);
            min-height: 100vh;
          }
          .creative-success-container {
            max-width: 500px;
            margin: 48px auto;
            padding: 36px 32px 32px 32px;
            background: rgba(255,255,255,0.97);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.10);
            text-align: center;
            font-family: 'Montserrat', Arial, sans-serif;
            animation: fadeIn 0.7s;
            transition: box-shadow 0.3s;
            position: relative;
          }
          .creative-success-container:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
          .creative-success-title {
            color: #ff7e5f;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 18px;
            font-family: 'Montserrat', Arial, sans-serif;
            letter-spacing: 1px;
          }
          .creative-success-text {
            color: #444;
            font-size: 1.15rem;
            margin-bottom: 24px;
          }
          .creative-success-btn {
            margin-top: 24px;
            padding: 13px 32px;
            font-size: 17px;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 7px;
            cursor: pointer;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .creative-success-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px rgba(255,126,95,0.18);
          }
        `}
      </style>
      <div className="creative-success-container">
        <h2 className="creative-success-title">Application Submitted Successfully!</h2>
        <p className="creative-success-text">
          Thank you for your application.<br />
          We will get back to you soon.
        </p>
        <button
          onClick={onBack}
          className="creative-success-btn"
        >
          Submit Another Application
        </button>
      </div>
    </>
  );
}

export default SuccessPage;