# Susbud

A personal finance app for mindful purchasing decisions. Helps users manage a purchase wishlist, track budgets, and reflect on what truly brings value to their lives.

## Live demo
[cu1059.camp.lnu.se](https://cu1059.camp.lnu.se)

[richlife-budgetapp.netlify.app](https://richlife-budgetapp.netlify.app/)

## Video
...

## Tech stack

- React 18 + Vite
- Firebase Authentication
- Supabase (PostgreSQL)
- Deployed via Docker + Caddy on a self-hosted server

## Prerequisites

- Node.js 20+
- A Firebase project with Authentication enabled
- A Supabase project

## Getting started

1. Clone the repository and install dependencies:

```bash
   git clone <repo-url>
   cd budgetapp
   npm install --legacy-peer-deps
```

2. Copy the environment template and fill in your credentials:
```bash
    cp .env.example .env
```

3. Start the development server:
```bash
    npm start
```
The app runs at http://localhost:5173.

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm test` | Run test suite |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run coverage` | Run tests with coverage report |

## Deployment

The app is containerised with Docker. Production deployment is handled automatically by GitLab CI/CD on push to main.

To deploy manually:

```bash
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up --build -d
```

## Contributing
See [Contributing](https://gitlab.lnu.se/1dv613/student/ss226jn/project-hub/-/wikis/Contributing) in the project wiki.

## Folder Structure
```
.
├── Caddyfile
├── certs
├── docker-compose.development.yaml
├── docker-compose.production.yaml
├── docker-compose.yaml
├── Dockerfile
├── Dockerfile.caddy
├── index.html
├── nginx.conf
├── package-lock.json
├── package.json
├── public
├── README.md
├── ROADMAP.md
├── src
└── vite.config.js
```


