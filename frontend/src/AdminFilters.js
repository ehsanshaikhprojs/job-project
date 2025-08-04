import React from 'react';

function AdminFilters({ setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <style>
        {`
          .creative-filters-container {
            margin-bottom: 24px;
            padding: 20px 24px;
            background: rgba(255, 245, 235, 0.7);
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(255,126,95,0.07);
          }
          .creative-filters-title {
            color: #ff7e5f;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 14px;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .creative-filters-row {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }
          .creative-filter-select {
            padding: 10px;
            border: 1.5px solid #ff7e5f;
            border-radius: 6px;
            font-size: 16px;
            background: #fff;
            transition: border-color 0.2s;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .creative-filter-select:focus {
            border-color: #feb47b;
            outline: none;
          }
        `}
      </style>
      <div className="creative-filters-container">
        <div className="creative-filters-title">Filtri</div>
        <div className="creative-filters-row">
          <select name="ageRange" onChange={handleChange} className="creative-filter-select">
            <option value="">Tutte le età</option>
            <option value="18-25">18-25 anni</option>
            <option value="25-35">25-35 anni</option>
            <option value="35-45">35-45 anni</option>
            <option value="45+">{'> 45 anni'}</option>
          </select>

          <select name="education" onChange={handleChange} className="creative-filter-select">
            <option value="">Tutti i titoli di studio</option>
            <option value="Diploma">Diploma</option>
            <option value="Laurea">Laurea</option>
          </select>

          <select name="position" onChange={handleChange} className="creative-filter-select">
            <option value="">Tutte le posizioni</option>
            <option value="Cuoco">Cuoco</option>
            <option value="Cameriere">Cameriere</option>
          </select>

          <select name="sede" onChange={handleChange} className="creative-filter-select">
            <option value="">Tutte le sedi</option>
            <option value="Milano">Milano</option>
            <option value="Roma">Roma</option>
            <option value="Genova">Genova</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default AdminFilters;