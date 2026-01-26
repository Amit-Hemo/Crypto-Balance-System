# Product Overview

## Product Purpose

The **Crypto Balance System** is a platform tailored for end-users to manage their cryptocurrency holdings and view real-time or current valuations. While functional for end-users, this project is primarily designed for educational purposes, serving as a learning ground for microservices architecture and NestJS.

## Target Users

- **End-Users**: Individuals who want to track their crypto portfolio balance and value.
- **Developers (Learning)**: The primary audience is the developer (yourself) using this as a reference or playground for learning advanced backend concepts.

## Key Features

- **User Management**: Authentication and user profile management (Auth/User service).
- **Crypto Holdings Tracking**: specific service to handle user balances (`balance` service).
- **Exchange Rate Integration**: Service to fetch and provide current crypto exchange rates (`rate` service).
- **API Gateway**: Unified entry point for client applications to interact with the backend microservices.

## Business Objectives

- **Educational Value**: Master NestJS microservices patterns, TypeORM, and inter-service communication.
- **Functional Prototype**: A working system that accurately tracks balances and calculates values based on rates.
- **Scalability**: Designed to be modular (microservices) to allow independent scaling of components.

## User Journey

1.  **Registration/Login**: User authenticates via the API Gateway.
2.  **Portfolio View**: User requests their current portfolio balance.
3.  **Data Processing**:
    - Gateway routes request to Balance service.
    - Balance service retrieves holdings.
    - Balance service (or Gateway) requests current rates from Rate service.
    - System calculates total value.
4.  **Result**: User sees their crypto headings and total fiat value.

## Success Criteria

- Successful communication between microservices.
- Accurate calculation of portfolio value.
- Secure user authentication.
