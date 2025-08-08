# Modulo di Candidatura Lavorativa

## Panoramica del Progetto

Questo progetto è un sistema di candidatura lavorativa full-stack realizzato con lo stack MERN (MongoDB, Express, React, Node.js) e Dockerizzato per una facile distribuzione.

Caratteristiche principali:
- Modulo frontend React interattivo con validazione degli input, campi condizionali e caricamento CV (PDF/DOCX).
- Backend Node.js/Express che gestisce le API, la memorizzazione dei dati e l’upload dei file.
- Database MongoDB per salvare i dati dei candidati.
- Pannello Admin con filtri per la ricerca dei candidati, tabella espandibile e visualizzazione CV.
- Configurazione Docker Compose per avviare backend, frontend, MongoDB e Mongo Express UI come container.

---

## Struttura del Progetto
- **backend/**           (API backend Node.js e upload file)
- **frontend/**          (App frontend React)
- **docker-compose.yml** (Configurazione Docker Compose)
- **README.md**          (Documentazione del progetto)

---

## Prerequisiti

- **Docker (ultima versione)**
- **Docker Compose**

Assicurati che Docker e Docker Compose siano installati e attivi sulla tua macchina.

---

## Come Avviare il Progetto

**1. Clona il repository:**

```bash
git clone https://github.com/ehsanshaikhprojs/job-project
cd job-project
```
**2. Avvia l’applicazione con Docker Compose:**
```bash
docker compose up -d
```
**3. Accedi alle applicazioni dal browser:**
- Modulo di Candidatura: [http://localhost:3000](http://localhost:3000)
- Per accedere all’Area Admin: (Password: admin123)
- Mongo Express Admin UI per visualizzare database e collezioni: [http://localhost:8081](http://localhost:8081)
  (Username: admin, Password: admin)

---

## Note Importanti
- I file CV caricati sono salvati in **backend/uploads/**
- Le variabili d’ambiente sono gestite tramite i file **.env** in **backend/** e **frontend/**
- Per fermare e rimuovere tutti i container in esecuzione, usa:
```bash
docker compose down
```
