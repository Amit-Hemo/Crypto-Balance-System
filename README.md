# Crypto Balance System

> A scalable microservices-based platform for tracking cryptocurrency holdings and real-time valuations, built with NestJS.

![System Architecture](https://github.com/user-attachments/assets/87732884-22fd-42ba-806b-e4f6d3815732)

## 📖 Overview

The **Crypto Balance System** is designed to demonstrate a robust microservices architecture. It allows users to manage their crypto portfolios while the system automatically handles exchange rate fetching, caching, and value calculation.

This project serves as both a functional application and an advanced learning resource for NestJS microservices patterns, TypeORM, and inter-service communication.

### Key Features

- **Microservices Architecture**: Modular design with dedicated services for Users, Balances, and Rates.
- **Real-time Valuations**: Fetches and caches live exchange rates (via CoinGecko).
- **Secure Authentication**: JWT-based auth via Passport.
- **Optimized Performance**: In-memory caching to reduce external API dependency.
- **Docker Ready**: Full containerization support for easy deployment.

## 🛠️ Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) (Monorepo)
- **Language**: TypeScript
- **Database**: PostgreSQL (Access via TypeORM)
- **Communication**: TCP (Internal) & HTTP (External)
- **Tools**: Docker, Jest, Swagger
- **External APIs**: [CoinGecko](https://www.coingecko.com/en/api) (for exchange rates)

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:

- [**Getting Started**](docs/getting-started.md): Installation, configuration, and running the app.
- [**Architecture**](docs/architecture.md): Deep dive into the system design and tech stack.
- [**Services Overview**](docs/services.md): Breakdown of each microservice's responsibilities.

## 🚀 Quick Start

The recommended way to run the system is via Docker.

1.  **Configure Secrets**: Create `password.txt` files for your DB passwords in `apps/*/db/`.
2.  **Environment Variables**: Create `.env` files for the services, (see `.env.example` for help).
2.  **Run**:
    ```bash
    docker compose up --build
    ```
3.  **Access**:
    - **API**: http://localhost:3000/api (Swagger UI)

For manual local development (without Docker) and general, please refer to the [Getting Started Guide](docs/getting-started.md).

## 🧪 Testing

```bash
# Unit tests
npm test

# Coverage
npm run test:cov
```
