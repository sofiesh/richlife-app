# ROADMAP – Susbud

Uppdaterad: 2026-04-30

**Stack:** React 18 + Firebase (Auth + Firestore) — ingen egen backend.

---

## Nuläge

- Firebase Auth: inloggning, registrering, utloggning
- React Router v6 med routes för `/login`, `/register`, `/purchaseplan`, `/userprofile`, `/itemdetail`
- PurchasePlan-komponenter mockade
- MongoDB och Express borttagna — all data lagras i Firestore

---

## Fas 1 – Städning & säkerhet ✅

- [x] Firebase-config flyttad till `.env`
- [x] Firebase-initialisering extraherad till `src/firebase.js`
- [x] Död kod borttagen (AppOld.js, firebaseUser.js, router/history.js)
- [x] Backend borttagen (server.js, express, mongoose)
- [x] index.js rensat

---

## Fas 2 – Kärnfunktioner

### 2a. Dashboard för inloggad användare ✅
- [x] `/purchaseplan`-route (skyddad, kräver inloggning)
- [x] Nav-logik i `<Navbar>`-komponent
- [x] `<PurchasePlan />` i purchase plan
- [x] `<itemdetail />` separat page samt länk i dashboard
- [x] Datamodell (basic): `{ name, price, createdAt, ... }`

### 2b. Koppla inköpslista till Firestore
- [ ] Spara items per användare i Firestore: `users/{uid}/purchasePlans/{id}`
- [ ] Ladda items när användaren loggar in

### 2c. Komplettera CRUD för inköpsposter
- [ ] Redigera ett item
- [ ] Ta bort ett item
- [ ] Datamodell (advanced): `{ CO2, savings opportunity ... }`

---

## Fas 3 – Features (från kravlistan)

1. Mobil layout
2. Budget-funktion
3. Auth-uppgradering
4. Sustainability-data
5. Nyköp vs secondhand
6. Insikter/analys

---

## Teknisk skuld (kvarvarande)

| Skuld | Fil | Prioritet |
|-------|-----|-----------|
| `PurchasePlanInputField` PropTypes kräver `label` men `PurchasePlanForm` skickar det aldrig | `src/components/` | Medel |
| `key={index}` i lista — bör ersättas med Firestore-dokument-ID | `purchasePlanList.js:14` | Låg |
| Routing-logik och UI blandas i `<header>` i App.js | `src/App.js` | Låg |
| CRA (`react-scripts`) är deprecated — migrera till Vite på sikt | `package.json` | Låg |
