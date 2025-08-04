import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminFilters from './AdminFilters';
import CandidateTable from './CandidateTable';

function AdminDashboard({ token, onLogout }) {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/candidates`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setCandidates(res.data))
      .catch(() => alert('Failed to load candidates'));
  }, [token]);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const [day, month, year] = dobString.split('/');
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const applyFilters = () => {
    return candidates.filter((c) => {
      const actualAge = calculateAge(c.age);

      let ageMatch = true;
      switch (filters.ageRange) {
        case '18-25':
          ageMatch = actualAge >= 18 && actualAge <= 25;
          break;
        case '25-35':
          ageMatch = actualAge > 25 && actualAge <= 35;
          break;
        case '35-45':
          ageMatch = actualAge > 35 && actualAge <= 45;
          break;
        case '45+':
          ageMatch = actualAge > 45;
          break;
        default:
          ageMatch = true;
      }

      const educationMatch =
        !filters.education ||
        filters.education === '' ||
        (c.education &&
          c.education.toLowerCase().includes(filters.education.toLowerCase()));

      const positionMatch =
        !filters.position ||
        filters.position === '' ||
        (c.position &&
          c.position.toLowerCase().includes(filters.position.toLowerCase()));

      const sedeMatch =
        !filters.sede ||
        filters.sede === '' ||
        (c.sede &&
          c.sede.toLowerCase().includes(filters.sede.toLowerCase()));

      return ageMatch && educationMatch && positionMatch && sedeMatch;
    });
  };

  const filteredCandidates = applyFilters();

  return (
    <>
      <style>
        {`
          body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
            min-height: 100vh;
          }
          .creative-dashboard-container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 32px;
            background: rgba(255,255,255,0.97);
            border-radius: 18px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            position: relative;
            transition: box-shadow 0.3s;
          }
          .creative-dashboard-container:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          }
          .creative-dashboard-title {
            text-align: center;
            color: #ff7e5f;
            margin-bottom: 28px;
            font-weight: 700;
            font-size: 2rem;
            font-family: 'Montserrat', Arial, sans-serif;
            letter-spacing: 1px;
          }
          .creative-dashboard-logout-btn {
            padding: 12px 24px;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 16px;
            cursor: pointer;
            font-weight: 700;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
            float: right;
          }
          .creative-dashboard-logout-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px rgba(255,126,95,0.18);
          }
          .creative-dashboard-empty {
            text-align: center;
            color: #d7263d;
            font-size: 1.1rem;
            margin-top: 32px;
            font-weight: 500;
          }
        `}
      </style>
      <div className="creative-dashboard-container">
        <h2 className="creative-dashboard-title">Submitted Applications</h2>
        <button onClick={onLogout} className="creative-dashboard-logout-btn">
          Logout
        </button>

        <div style={{ clear: 'both', marginBottom: 24 }}></div>

        <AdminFilters setFilters={setFilters} />

        {filteredCandidates.length > 0 ? (
          <CandidateTable candidates={filteredCandidates} />
        ) : (
          <p className="creative-dashboard-empty">
            Al momento non ci sono Candidati in base ai filtri selezionati.
          </p>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;