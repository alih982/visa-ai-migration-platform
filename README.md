<div align="center">

# 🌍 Visa & Migration Platform

**A unified platform for visa and immigration services — expert booking, consultation orders, and a custom RAG-based AI assistant.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Django-5.0-092E20?logo=django)](https://djangoproject.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📖 Overview

**Visa & Migration Platform** is a full-stack, integrated platform that digitizes the entire immigration consulting cycle — from discovering the right visa pathway to booking an expert and managing consultation orders.

The platform combines a **service marketplace**, **expert booking system**, and a **RAG-powered AI assistant** into a single ecosystem, serving three user roles: **Customers**, **Experts**, and **Admins**.

### 🎯 Key Features

- 🌐 **Visa Pathway Explorer** — Browse visa categories, requirements, and country guides
- 📅 **Expert Booking System** — Book consultations with immigration experts
- 🛒 **Service Marketplace** — Order consultations, document reviews, and premium packages
- 📄 **Document Management** — Upload, track, and get expert feedback on documents
- 🤖 **Custom AI Assistant** — Powered by RAG and the Gemma 2 model
- 📊 **Automated Dashboard** — Live stats on bookings, revenue, and expert performance
- 👥 **Multi-Role Access Control** — Admin / Expert / Customer
- 📚 **Full API Documentation** — Auto-generated OpenAPI / Swagger docs

---

## 🎬 Demo

[![Watch the demo](https://img.youtube.com/vi/q1w0eNsZfVU/maxresdefault.jpg)](https://www.youtube.com/watch?v=q1w0eNsZfVU)

▶️ **[Watch the full demo on YouTube](https://www.youtube.com/watch?v=q1w0eNsZfVU)**

---

## 🏗️ Architecture

```mermaid
flowchart LR
    A["🌐 Next.js 14<br/>+ TailwindCSS"]
    B["🔌 Django REST API<br/>(Business Logic)"]
    C["🗄️ PostgreSQL<br/>+ pgvector"]
    D["🧠 FastAPI + RAG<br/>(Gemma 2 / LLM)"]
    E["📚 Vector Database"]

    A -->|REST| B
    B -->|ORM| C
    A -->|Chat API| D
    D -->|Query Embeddings| E
    D -.->|Business Context| B
```

**Flow summary:**
- The **Next.js frontend** talks to the **Django REST API** for all business operations (bookings, orders, documents).
- The **Django API** persists data in **PostgreSQL** (with **pgvector** for embeddings).
- For AI chat, the frontend calls the **FastAPI service**, which uses **Gemma 2** and queries the **vector database** for RAG context.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, TailwindCSS |
| **Backend Core** | Django 5 + Django REST Framework |
| **Backend AI** | FastAPI, LangChain, HuggingFace Transformers |
| **Database** | PostgreSQL 16 + pgvector |
| **AI Model** | Gemma 2 (via Ollama / vLLM) |
| **RAG** | pgvector + Multilingual Embeddings |
| **DevOps** | Docker, Docker Compose, Nginx |
| **Auth** | JWT + Role-Based Access Control (RBAC) |
| **API Docs** | OpenAPI 3 / Swagger UI / ReDoc |

---

## 👤 Roles & Panels

### 🧑‍💼 Customer Panel
- Browse visa pathways and country guides
- Book consultations with experts
- Order services (document review, package deals)
- Upload and manage documents
- Chat with the AI assistant

### 🎓 Expert Panel
- Manage availability and consultation calendar
- Review customer documents and provide feedback
- Track orders and earnings
- Performance and revenue reports

### 🛡️ Admin Panel
- Manage users, experts, and service categories
- Manage visa pathways and country data
- Full analytics dashboard
- Manage RAG knowledge base content

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+
- Git LFS (optional, for AI model)

### 1. Clone the repository

```bash
git clone https://github.com/alih982/visa-migration-platform.git
cd visa-migration-platform
```

### 2. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Download the AI model

Due to its size, the model file is not included in the repository. Choose one of the following methods:

**Option 1 — From HuggingFace:**
```bash
pip install huggingface-hub
huggingface-cli download google/gemma-2-9b-it --local-dir ai_service/app/ai_model/
```

**Option 2 — From Ollama (recommended):**
```bash
ollama pull gemma2:9b
```

**Option 3 — Use a lighter model:**
```bash
ollama pull gemma2:2b
```

### 4. Run with Docker

```bash
docker compose up -d --build
```

Then access the services at:

| Service | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:3000 |
| 🔌 Django API | http://localhost:8000 |
| 🧠 FastAPI AI | http://localhost:8001 |
| ⚙️ Django Admin | http://localhost:8000/admin |
| 📚 API Docs (Swagger) | http://localhost:8000/api/docs |
| 📖 API Docs (ReDoc) | http://localhost:8000/api/redoc |

### 5. Manual Setup (Development)

**Backend (Django):**
```bash
cd backend/django_app
python -m venv .venv && source .venv/bin/activate
pip install -r requirements/dev.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**AI Service (FastAPI):**
```bash
cd ai_service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

**Frontend (Next.js):**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

See `.env.example` for the complete list. The most important ones:

```env
# ---------- Django ----------
DJANGO_SECRET_KEY=change-me-in-production
DEBUG=True
DATABASE_URL=postgresql://visa:visa_pass@db:5432/visa_db

# ---------- JWT ----------
JWT_SECRET_KEY=change-me-too
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# ---------- AI ----------
AI_MODEL=gemma2:9b
OLLAMA_HOST=http://ollama:11434
RAG_ENABLED=false
EMBEDDING_MODEL=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2

# ---------- Frontend ----------
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_AI_URL=http://localhost:8001
```

> ⚠️ **Never** commit the real `.env` file.

---

## 📚 API Documentation

The platform exposes fully documented REST APIs via **OpenAPI 3.0**.

| Service | Swagger UI | ReDoc |
|---------|------------|-------|
| Django Core API | `/api/docs/` | `/api/redoc/` |
| FastAPI AI Service | `/docs` | `/redoc` |

### Authentication

All protected endpoints require a **JWT Bearer token**:

```bash
# Get access token
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'

# Use it in requests
curl http://localhost:8000/api/bookings/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | Register new user |
| `POST` | `/api/auth/token/` | Obtain JWT token |
| `GET` | `/api/visas/` | List visa pathways |
| `GET` | `/api/experts/` | List experts |
| `POST` | `/api/bookings/` | Create a booking |
| `GET` | `/api/bookings/{id}/` | Booking details |
| `POST` | `/api/orders/` | Create a service order |
| `POST` | `/api/documents/` | Upload a document |
| `POST` | `/api/ai/chat/` | Chat with AI assistant |

> Full interactive reference: **`/api/docs/`** after running the project.

---

## 🤖 AI Assistant (RAG)

The RAG system is implemented as a **potential feature** and can be activated by setting `RAG_ENABLED=true`.

- **LLM:** Gemma 2 (compatible with Ollama / vLLM)
- **Embeddings:** Multilingual (Persian + English)
- **Vector Store:** pgvector inside PostgreSQL
- **Sources:** Visa regulations, country guides, immigration FAQ

### Activation

```env
RAG_ENABLED=true
AI_MODEL=gemma2:9b
```

Then index your documents:

```bash
python manage.py rag_index --source=visa_docs/
```

---

## 📸 Screenshots

> Coming soon

| Customer Panel | Expert Panel | Admin Panel |
|----------------|--------------|-------------|
| ![Customer](docs/screens/customer.png) | ![Expert](docs/screens/expert.png) | ![Admin](docs/screens/admin.png) |

---

## 📂 Project Structure

```
visa-migration-platform/
├── backend/
│   ├── django_app/           # Django REST API
│   │   ├── apps/
│   │   │   ├── accounts/     # Auth & roles
│   │   │   ├── experts/      # Expert management
│   │   │   ├── bookings/     # Consultation bookings
│   │   │   ├── services/     # Service marketplace
│   │   │   ├── orders/       # Order management
│   │   │   ├── documents/    # Document handling
│   │   │   └── customers/    # Customer profiles
│   │   └── manage.py
│   └── fastapi_ai/           # AI service
├── ai_service/               # Model & RAG
│   └── app/
│       ├── rag/
│       ├── embeddings/
│       └── chat/
├── frontend/                 # Next.js 14
│   └── src/
│       ├── app/
│       │   ├── (auth)/
│       │   ├── dashboard/
│       │   ├── services/
│       │   └── bookings/
│       └── components/
├── nginx/                    # Reverse Proxy
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🗺️ Roadmap

- [x] Initial architecture & Docker setup
- [x] Authentication & RBAC
- [x] Expert booking system
- [x] Service marketplace & orders
- [x] Admin / Expert / Customer dashboards
- [x] Full API documentation (OpenAPI / Swagger)
- [ ] Full RAG activation in production
- [ ] Payment gateway integration (Stripe / ZarinPal)
- [ ] Document e-signature
- [ ] Mobile app (React Native)
- [ ] Unit & E2E tests
- [ ] CI/CD with GitHub Actions

---

## 🧪 Testing

```bash
# Backend
cd backend/django_app
pytest

# Frontend
cd frontend
npm run test
npm run test:e2e
```

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

Commit message conventions:

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting |
| `refactor:` | Code refactoring |
| `chore:` | Maintenance tasks |
| `test:` | Adding tests |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **GitHub:** [@alih982](https://github.com/alih982)
- **Repository:** [visa-migration-platform](https://github.com/alih982/visa-migration-platform)

---

<div align="center">

**Built with ❤️ to simplify immigration processes**

⭐ If you find this project useful, please give it a star!

</div>