import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLoginSuccess, onBack }) {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
        username: 'admin',
        password
      });
      onLoginSuccess(res.data.token);
    } catch {
      alert('Invalid admin password');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
            min-height: 100vh;
          }
          .creative-admin-container {
            max-width: 420px;
            margin: 48px auto;
            padding: 36px 32px 32px 32px;
            background: rgba(255,255,255,0.97);
            border-radius: 18px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            position: relative;
            transition: box-shadow 0.3s;
          }
          .creative-admin-container:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          }
          .creative-admin-title {
            text-align: center;
            color: #ff7e5f;
            margin-bottom: 28px;
            font-weight: 700;
            font-size: 2rem;
            font-family: 'Montserrat', Arial, sans-serif;
            letter-spacing: 1px;
          }
          .creative-admin-label {
            font-weight: 600;
            color: #ff7e5f;
            margin-bottom: 8px;
            display: block;
          }
          .creative-admin-input {
            width: 100%;
            padding: 12px;
            border: 1.5px solid #ff7e5f;
            border-radius: 7px;
            font-size: 17px;
            margin-bottom: 18px;
            transition: border-color 0.2s;
            background: #fff;
          }
          .creative-admin-input:focus {
            border-color: #feb47b;
            outline: none;
          }
          .creative-admin-btn {
            flex: 1;
            padding: 13px 0;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 17px;
            cursor: pointer;
            font-weight: 700;
            margin-right: 14px;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .creative-admin-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px rgba(255,126,95,0.18);
          }
          .creative-admin-back-btn {
            flex: 1;
            padding: 13px 0;
            background: #6c757d;
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 17px;
            cursor: pointer;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(108,117,125,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .creative-admin-back-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px rgba(108,117,125,0.18);
          }
        `}
      </style>
      <div className="creative-admin-container">
        <h2 className="creative-admin-title">Area Admin</h2>
        <label className="creative-admin-label">Password Admin</label>
        <input
          type="password"
          placeholder="Inserisci la password admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="creative-admin-input"
        />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={handleLogin} className="creative-admin-btn">Login</button>
          <button onClick={onBack} className="creative-admin-back-btn">Indietro</button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;