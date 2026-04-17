# ROADMAP – Susbud

Uppdaterad: 2026-04-17

**Stack:** React 18 + Firebase (Auth + Firestore) — ingen egen backend.

---

## Nuläge

- Firebase Auth fungerar: inloggning, registrering, utloggning
- React Router v6 med routes för `/login` och `/register`
- PurchasePlan-komponenter (form + lista) är skrivna men kommenterade i App.js
- Ingen dashboard för inloggad användare ännu
- MongoDB och Express borttagna — all data lagras i Firestore

---

## Fas 1 – Klar (städning & säkerhet)

- [x] Firebase-config flyttad till `.env`
- [x] Firebase-initialisering extraherad till `src/firebase.js`
- [x] Död kod borttagen (AppOld.js, firebaseUser.js, router/history.js)
- [x] Backend borttagen (server.js, express, mongoose)
- [x] index.js rensat

---

## Fas 2 – Kärnfunktioner

### 2a. Dashboard för inloggad användare
- Skapa `/dashboard`-route (skyddad, kräver inloggning)
- Flytta nav-logik till en `<Navbar>`-komponent
- Rendera `<PurchasePlan />` i dashboard

### 2b. Koppla inköpslista till Firestore
- Spara items per användare i Firestore: `users/{uid}/purchasePlans/{id}`
- Ladda items när användaren loggar in
- `handleSubmit` i PurchasePlan skriver till Firestore istället för `console.log`

### 2c. Komplettera CRUD för inköpsposter
- Redigera ett item
- Ta bort ett item
- Datamodell: `{ name, newPrice, usedPrice, createdAt }`

---

## Fas 3 – Features (från kravlistan)

| Feature | Beskrivning |
|---------|-------------|
| Prisuppskattning | Nyköp vs second-hand per artikel, visa potentiell besparing |
| Köpbeslut | Markera post som köpt (faktiskt pris, datum, ny/begagnad) |
| Köphistorik | Lista köpta varor med datum och betalat pris |
| Besparingsanalys | Faktisk besparing vs möjlig besparing |
| Konsumtionsmönster | Statistik per kategori över tid |
| OAuth 2.0 | Google-inloggning via Firebase Auth (redan förberett) |

---

## Teknisk skuld (kvarvarande)

| Skuld | Fil | Prioritet |
|-------|-----|-----------|
| `PurchasePlanInputField` PropTypes kräver `label` men `PurchasePlanForm` skickar det aldrig | `src/components/` | Medel |
| `key={index}` i lista — bör ersättas med Firestore-dokument-ID | `purchasePlanList.js:14` | Låg |
| Routing-logik och UI blandas i `<header>` i App.js | `src/App.js` | Låg |
| CRA (`react-scripts`) är deprecated — migrera till Vite på sikt | `package.json` | Låg |
