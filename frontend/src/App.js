import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import SuccessPage from './SuccessPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const allowedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const schema = yup.object().shape({
  firstName: yup.string().required('Il nome è obbligatorio'),
  lastName: yup.string().required('Il cognome è obbligatorio'),
  email: yup.string().email('Email non valida').required('L\'email è obbligatoria'),
  phone: yup
    .string()
    .matches(/^\+?\d{7,15}$/, 'Numero di telefono non valido')
    .required('Il telefono è obbligatorio'),
  age: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Età deve essere nel formato gg/mm/aaaa')
    .required('L\'età è obbligatoria'),
  education: yup.string().required('Titolo di studio obbligatorio'),
  position: yup.string().required('Posizione aperta obbligatoria'),
  sede: yup.string().when('position', {
    is: (val) => val === 'Cuoco' || val === 'Cameriere',
    then: (schema) => schema.required('Sede di lavoro obbligatoria'),
    otherwise: (schema) => schema.notRequired()
  }),
  role: yup.string().when('position', {
    is: (val) => val === 'Cuoco' || val === 'Cameriere',
    then: (schema) => schema.required('Ruolo specifico obbligatorio'),
    otherwise: (schema) => schema.notRequired()
  }),
  cv: yup
    .mixed()
    .required('Il CV è obbligatorio')
    .test('fileType', 'Sono accettati solo file PDF e DOCX', (value) => {
      if (!value || !value.length) return false;
      return allowedFileTypes.includes(value[0].type);
    }),
  verificationCode: yup.string().required('Il codice di verifica è obbligatorio')
});

function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const selectedPosition = watch('position');
  const selectedSede = watch('sede');

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key === 'cv') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/apply`, formData);
      setSubmitted(true);
      reset();
    } catch (error) {
      alert('Invio fallito. Riprova.');
    }
  };

  const handleReset = () => {
    reset();
  };

  if (adminMode) {
    return adminToken ? (
      <AdminDashboard token={adminToken} onLogout={() => setAdminToken(null)} />
    ) : (
      <AdminLogin onLoginSuccess={setAdminToken} onBack={() => setAdminMode(false)} />
    );
  }

  if (submitted) {
    return <SuccessPage onBack={() => setSubmitted(false)} />;
  }

  return (
    <>
      <style>
        {`
          body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
            min-height: 100vh;
          }
          .creative-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 32px;
            background: rgba(255,255,255,0.95);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            position: relative;
            transition: box-shadow 0.3s;
          }
          .creative-container:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          }
          .creative-admin-btn {
            position: absolute;
            right: 24px;
            top: 24px;
            padding: 12px 28px;
            font-size: 1.05rem;
            cursor: pointer;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(255,126,95,0.14);
            letter-spacing: 1px;
            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
            z-index: 2;
            animation: popInAdminBtn 0.7s;
          }
          .creative-admin-btn:hover {
            background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
            transform: scale(1.06) rotate(-2deg);
            box-shadow: 0 6px 20px rgba(255,126,95,0.22);
          }
          @keyframes popInAdminBtn {
            from { opacity: 0; transform: scale(0.8);}
            to { opacity: 1; transform: scale(1);}
          }
          .creative-label {
            font-weight: 600;
            color: #ff7e5f;
            margin-bottom: 6px;
            display: block;
          }
          .creative-input, .creative-select {
            width: 100%;
            padding: 10px;
            border: 1.5px solid #ff7e5f;
            border-radius: 6px;
            font-size: 16px;
            margin-bottom: 4px;
            transition: border-color 0.2s;
            background: #fff;
          }
          .creative-input:focus, .creative-select:focus {
            border-color: #feb47b;
            outline: none;
          }
          .creative-btn {
            flex: 1;
            padding: 12px;
            background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(255,126,95,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .creative-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px rgba(255,126,95,0.18);
          }
          .creative-error {
            color: #d7263d;
            font-size: 13px;
            margin-top: 2px;
          }
        `}
      </style>
      <div className="creative-container">
        <button
          onClick={() => setAdminMode(true)}
          className="creative-admin-btn"
          aria-label="Area Admin"
        >
          Area Admin
        </button>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 24,
          color: '#ff7e5f',
          fontFamily: 'Montserrat, Arial, sans-serif',
          marginTop: 0
        }}>
          Modulo di Candidatura
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Nome *</label>
            <input
              {...register('firstName')}
              placeholder="Inserisci il tuo nome"
              className="creative-input"
            />
            <span className="creative-error">{errors.firstName?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Cognome *</label>
            <input
              {...register('lastName')}
              placeholder="Inserisci il tuo cognome"
              className="creative-input"
            />
            <span className="creative-error">{errors.lastName?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Email *</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Inserisci la tua email"
              className="creative-input"
            />
            <span className="creative-error">{errors.email?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Telefono *</label>
            <input
              {...register('phone')}
              placeholder="Inserisci il tuo numero di telefono (es. +391234567890)"
              className="creative-input"
            />
            <span className="creative-error">{errors.phone?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Età * (formato gg/mm/aaaa)</label>
            <input
              {...register('age')}
              placeholder="gg/mm/aaaa"
              className="creative-input"
            />
            <span className="creative-error">{errors.age?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Titolo di Studio *</label>
            <select {...register('education')} className="creative-select">
              <option value="">Seleziona Titolo di Studio</option>
              <option value="Diploma">Diploma</option>
              <option value="Laurea">Laurea</option>
            </select>
            <span className="creative-error">{errors.education?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Posizioni Aperte *</label>
            <select {...register('position')} className="creative-select">
              <option value="">Seleziona una posizione</option>
              <option value="Cuoco">Cuoco</option>
              <option value="Cameriere">Cameriere</option>
            </select>
            <span className="creative-error">{errors.position?.message}</span>
          </div>
          {(selectedPosition === 'Cuoco' || selectedPosition === 'Cameriere') && (
            <div style={{ marginBottom: 16 }}>
              <label className="creative-label">Sede di Lavoro *</label>
              <select {...register('sede')} className="creative-select">
                <option value="">Seleziona una sede</option>
                {selectedPosition === 'Cuoco' && (
                  <>
                    <option value="Milano">Milano</option>
                    <option value="Roma">Roma</option>
                    <option value="Nessuna Preferenza">Nessuna Preferenza</option>
                  </>
                )}
                {selectedPosition === 'Cameriere' && (
                  <>
                    <option value="Milano">Milano</option>
                    <option value="Genova">Genova</option>
                    <option value="Nessuna Preferenza">Nessuna Preferenza</option>
                  </>
                )}
              </select>
              <span className="creative-error">{errors.sede?.message}</span>
            </div>
          )}
          {(selectedPosition === 'Cuoco' || selectedPosition === 'Cameriere') && selectedSede && (
            <div style={{ marginBottom: 16 }}>
              <label className="creative-label">Ruolo Specifico *</label>
              <select {...register('role')} className="creative-select">
                <option value="">Seleziona un ruolo</option>
                {selectedPosition === 'Cuoco' && (
                  <>
                    {(selectedSede === 'Milano' || selectedSede === 'Nessuna Preferenza') && (
                      <>
                        <option value="Cuoco Primi Milano">
                          Cuoco primi (Milano) – 5 anni esperienza
                        </option>
                        <option value="Cuoco Secondi Milano">
                          Cuoco secondi (Milano) – 2 anni esperienza
                        </option>
                      </>
                    )}
                    {(selectedSede === 'Roma' || selectedSede === 'Nessuna Preferenza') && (
                      <option value="Cuoco Primi Roma">Cuoco primi (Roma) – 2 anni esperienza</option>
                    )}
                  </>
                )}
                {selectedPosition === 'Cameriere' && (
                  <>
                    {(selectedSede === 'Milano' || selectedSede === 'Nessuna Preferenza') && (
                      <>
                        <option value="Cameriere di sala Milano">
                          Cameriere di sala (Milano) – 2 anni esperienza
                        </option>
                        <option value="Maître Milano">Maître (Milano) – 10 anni esperienza</option>
                      </>
                    )}
                    {(selectedSede === 'Genova' || selectedSede === 'Nessuna Preferenza') && (
                      <option value="Cameriere di sala Genova">
                        Cameriere di sala (Genova) – 2 anni esperienza
                      </option>
                    )}
                  </>
                )}
              </select>
              <span className="creative-error">{errors.role?.message}</span>
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Carica CV * (solo PDF o DOCX)</label>
            <input type="file" {...register('cv')} accept=".pdf,.docx" className="creative-input" />
            <span className="creative-error">{errors.cv?.message}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="creative-label">Codice di Verifica *</label>
            <input
              {...register('verificationCode')}
              placeholder="Inserisci il codice di verifica"
              className="creative-input"
            />
            <span className="creative-error">{errors.verificationCode?.message}</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="creative-btn">Invia</button>
            <button type="button" onClick={handleReset} className="creative-btn" style={{ background: '#6c757d', backgroundImage: 'none' }}>Reset</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;