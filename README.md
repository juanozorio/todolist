# Task UI

Cloud-native SPA for task management, built with React + Vite and served via Nginx. Designed for Kubernetes deployment following the [12-Factor App](https://12factor.net/) methodology.

---

## Stack

- **React 18** — UI framework
- **Vite 5** — build tool
- **TypeScript** — type safety
- **Nginx** — production static server + reverse proxy
- **Docker** — containerization

---

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Backend running (see [todolist-backend](https://github.com/juanozorio/todolist-backend))

### Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

App available at `http://localhost:5656`

### Quick start with Docker Compose (full stack)

```bash
docker compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`
- **Swagger UI**: `http://localhost:8080/swagger/index.html`

---

## Environment Variables

All configuration is done via environment variables (12-Factor III).

### Build-time (Vite dev server)

| Variable       | Required | Default | Description                |
|----------------|----------|---------|----------------------------|
| `VITE_API_URL` | No       | (empty) | Backend API URL for dev    |

### Runtime (Docker / Kubernetes)

| Variable        | Required | Default          | Description                            |
|-----------------|----------|------------------|----------------------------------------|
| `API_UPSTREAM`  | No       | `localhost:8080`  | Backend host:port for nginx proxy_pass |

> In production, nginx proxies `/api/` requests to the backend via `API_UPSTREAM`. The frontend code uses relative URLs — no client-side configuration needed.

---

## Health Probes

| Endpoint       | Description      |
|----------------|------------------|
| `GET /healthz` | Liveness check   |

---

## CI/CD (GitHub Actions)

Two jobs run on every push to `main`:

1. **build** — compiles TypeScript and builds the Vite bundle
2. **docker** — builds and pushes `juanozorio/task-ui` to Docker Hub (linux/amd64 + linux/arm64)

### Required GitHub Secrets

| Secret               | Value                                   |
|----------------------|-----------------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username (`juanozorio`) |
| `DOCKERHUB_TOKEN`    | Docker Hub access token (not password)  |

---

## Project Structure

```
.
├── src/
│   ├── components/        # React components (Input, Task, Info, NoTask)
│   ├── interfaces/        # TypeScript interfaces (ITask)
│   ├── services/          # API client (api.ts)
│   ├── assets/            # SVG logos and icons
│   ├── config.ts          # Centralized env-based configuration
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entrypoint
│   └── global.css         # Design tokens and global styles
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Full-stack dev environment
├── Dockerfile             # Multi-stage production image
├── nginx.conf.template    # Nginx config with env var substitution
├── .env.example           # Environment variable reference
└── vite.config.ts         # Vite build configuration
```

---

## 12-Factor Compliance

| Factor | Implementation |
|--------|---------------|
| I. Codebase | Single repo, multiple deploys via image tags |
| II. Dependencies | Explicit in `package.json` / `package-lock.json` |
| III. Config | Build-time via `VITE_*`, runtime via `API_UPSTREAM` env var |
| IV. Backing services | Backend API treated as attached resource via nginx proxy |
| V. Build/release/run | Separated via Dockerfile stages |
| VI. Processes | Stateless SPA, no server-side state |
| VII. Port binding | Exports service via nginx on port 80 |
| VIII. Concurrency | Horizontal scaling via container orchestration |
| IX. Disposability | Nginx fast startup/shutdown |
| X. Dev/prod parity | Same Docker image across environments (`API_UPSTREAM` env var) |
| XI. Logs | Nginx logs to stdout/stderr |
| XII. Admin processes | N/A (frontend) |
