import React, { useState } from 'react';

function CandidateTable({ candidates }) {
  const [expandedId, setExpandedId] = useState(null);
  const [cvUrl, setCvUrl] = useState(null);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openCvPopup = (url) => {
    setCvUrl(url);
  };

  const closeCvPopup = () => {
    setCvUrl(null);
  };

  return (
    <>
      <style>
        {`
          .creative-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background: #fff;
            border-radius: 14px;
            box-shadow: 0 2px 12px rgba(255,126,95,0.09);
            overflow: hidden;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .creative-table th, .creative-table td {
            padding: 14px 12px;
            text-align: left;
            font-size: 16px;
          }
          .creative-table th {
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            font-weight: 700;
            border-bottom: 2px solid #ff7e5f;
          }
          .creative-table tr {
            transition: background 0.2s;
            cursor: pointer;
          }
          .creative-table tr:hover {
            background: #fff7f0;
          }
          .creative-table .expanded-row {
            background: #fff3e6;
            animation: fadeIn 0.4s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .creative-cv-link {
            display: inline-block;
            padding: 7px 18px;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
            border: none;
          }
          .creative-cv-link:hover {
            transform: scale(1.07) rotate(-2deg);
            box-shadow: 0 4px 16px rgba(255,126,95,0.18);
            background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
          }
          .creative-table-details {
            font-size: 15px;
            color: #444;
            line-height: 1.7;
            padding: 10px 0 0 0;
          }
          .creative-table-details strong {
            color: #ff7e5f;
            font-weight: 600;
          }
          .cv-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(246, 211, 101, 0.18);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
          }
          .cv-popup-content {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 8px 32px rgba(255,126,95,0.18);
            padding: 36px 32px 32px 32px;
            max-width: 1100px;
            width: 96vw;
            max-height: 92vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            animation: popIn 0.4s;
          }
          @keyframes popIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .cv-popup-close-btn {
            position: absolute;
            top: 18px;
            right: 18px;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            font-size: 22px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: background 0.2s, transform 0.2s;
            z-index: 1;
          }
          .cv-popup-close-btn:hover {
            background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
            transform: scale(1.1) rotate(10deg);
          }
          .cv-popup-title {
            color: #ff7e5f;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 18px;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .cv-popup-frame {
            width: 100%;
            height: 80vh;
            border: none;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(255,126,95,0.09);
            background: #fff;
          }
        `}
      </style>
      <table className="creative-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <React.Fragment key={c._id}>
              <tr onClick={() => toggleRow(c._id)}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    className="creative-cv-link"
                    title="Visualizza il CV"
                    onClick={e => {
                      e.stopPropagation();
                      openCvPopup(`${process.env.REACT_APP_API_URL}/${c.cvPath}`);
                    }}
                  >
                    Visualizza CV
                  </button>
                </td>
              </tr>
              {expandedId === c._id && (
                <tr className="expanded-row">
                  <td colSpan="4" className="creative-table-details">
                    <strong>Età:</strong> {c.age}<br />
                    <strong>Titolo di Studio:</strong> {c.education}<br />
                    <strong>Posizione:</strong> {c.position}<br />
                    <strong>Sede:</strong> {c.sede || 'N/A'}<br />
                    <strong>Ruolo:</strong> {c.role || 'N/A'}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {cvUrl && (
        <div className="cv-popup-overlay" onClick={closeCvPopup}>
          <div className="cv-popup-content" onClick={e => e.stopPropagation()}>
            <button className="cv-popup-close-btn" onClick={closeCvPopup} title="Chiudi">×</button>
            <div className="cv-popup-title">Anteprima CV</div>
            <iframe
              src={cvUrl}
              className="cv-popup-frame"
              title="Anteprima CV"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateTable;