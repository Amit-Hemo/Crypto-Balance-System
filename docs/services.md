# Microservices Overview

This document details the responsibilities of each microservice in the Crypto Balance System.

## API Gateway

**Path**: `apps/api-gateway`

The entry point for all client requests. It acts as a reverse proxy and aggregator.

- **Responsibilities**:
  - Route validation.
  - Authentication guard (JWT verification).
  - Proxying requests to the appropriate background service via TCP.
  - Aggregating responses (e.g., combining balance + current rate value).

## User Service

**Path**: `apps/user`

Handles all things related to user identity.

- **Responsibilities**:
  - User Registration.
  - User Login (Credential verification).
  - Profile management.
  - Generates/Validates JWT tokens.
- **Data**: Stores user credentials and profile info in PostgreSQL.

## Balance Service

**Path**: `apps/balance`

The core domain service for the crypto logic.

- **Responsibilities**:
  - Tracking user's crypto holdings (e.g., "User A has 0.5 BTC").
  - Calculating total portfolio value (by querying the Rate service).
- **Data**: Stores ledger/balance entries in PostgreSQL.

## Rate Service

**Path**: `apps/rate`

A simplified oracle/data service.

- **Responsibilities**:
  - Fetching exchange rates from external APIs (CoinGecko).
  - Caching rates in-memory to prevent rate-limiting and improve speed.
  - Serving current rates to other services (Balance service).
  - **Scheduled Tasks**: Automatically refreshes rates for configured assets and currencies every day at midnight to ensure cache readiness.
- **Data**: In-memory cache (transient data).
