<div align="center">

# 🧠 AI Service — RAG-Powered Immigration Assistant

**FastAPI microservice that exposes a custom Retrieval-Augmented Generation (RAG) pipeline for the Visa & Migration Platform — grounded Q&A over visa regulations, country guides, and immigration FAQs.**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)](https://python.org/)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-1C3C3C)](https://python.langchain.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)](https://docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

</div>

---

## 📖 Overview

This is the **AI layer** of the Visa & Migration Platform. It exposes a context-aware assistant that answers customer questions about **visa pathways, requirements, documentation, and country-specific rules** using a **RAG pipeline** over curated immigration documents.

The service is intentionally decoupled from the Django core:

| Service | Owns |
|---------|------|
| **Django (core)** | Users, experts, bookings, orders, documents — transactional truth |
| **FastAPI (this service)** | LLM inference, embeddings, retrieval, evaluation |
| **PostgreSQL (shared)** | Business data |
| **PostgreSQL + pgvector (isolated)** | Embeddings + indexing artifacts — **separate DB** so indexing and inference I/O never contend with transactional queries |

This isolation is a deliberate **workload separation**, not a full microservice split: a crash or slowdown in the AI service does not take down bookings or document uploads.

---

## 🏗️ Architecture

```mermaid
flowchart LR
    FE["🌐 Next.js Frontend"]
    AI["🔌 FastAPI<br/>(this service)"]
    LLM["🧠 Gemma 2<br/>(Ollama / vLLM)"]
    EMB["📐 Embedding Model<br/>(multilingual)"]
    AIDB[("📐 PostgreSQL + pgvector<br/>(AI-only DB)")]
    DJ["🔌 Django Core"]

    FE -->|POST /chat| AI
    AI -->|embed query| EMB
    AI -->|top-k similarity| AIDB
    AI -->|prompt + context| LLM
    LLM -->|answer| AI
    AI -->|JSON + sources| FE
    DJ -.->|optional: booking context| AI
