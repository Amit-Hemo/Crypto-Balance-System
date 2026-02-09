# Getting Started

This guide will help you set up the **Crypto Balance System** for development, production and testing.

> _**Note**: Production environment is not yet set up, we simulate it using Docker Compose, so when we say production, we mean the production-like Docker environment._

## Prerequisites

- **Node.js**: v24.13.0 or higher
- **npm**: Installed with Node.js
- **PostgreSQL**: A running instance (local or Docker)
- **Docker** (Optional): For running infrastructure services via `compose.yml`

## Configuration

The application requires environment variables to be set for each microservice.

1.  **Create `.env` files**:
    Navigate to each app's directory in `apps/` and create a `.env` file based on the provided `.env.example`.
    - `apps/api-gateway/.env`
    - `apps/user/.env`
    - `apps/balance/.env`
    - `apps/rate/.env`

    _Ensure you fill in valid values, especially for `COINGECKO_API_KEY` and database credentials._

2.  **Docker Secrets (Docker Compose only)**:
    If running via Docker Compose, database passwords are strictly managed via secrets.
    - Create a `password.txt` file containing the DB password in the respective `db/` folder for services that require it (e.g., `apps/user/db/password.txt`).

## Running the Application

### Option 1: Docker (Recommended)

This method runs all services and databases with a single command in a production-like environment.

1.  **Prerequisites**: Ensure Docker and Docker Compose are installed.
2.  **Setup Secrets**: Ensure your `password.txt` files are created as mentioned in Configuration.
3.  **Run**:
    ```bash
    docker compose up --build
    ```
> _**Note**: Tests currently need to be run manually outside of Docker._

### Option 2: Local Development (Manual)

To run services individually on your machine:

1.  **Database**: Ensure you have PostgreSQL running locally and created the databases specified in your `.env` files (e.g., `users_db`, `balances_db`) and also run the migrations (list of commands in the migration section).
2.  **Start Services**:
    Open separate terminal tabs for each service. **Note**: You must run each service individually; there is no script to run them all at once.

    ```bash
    # 1. Microservices (Start these first)
    npm run start:dev user
    npm run start:dev balance
    npm run start:dev rate

    # 2. API Gateway (Depends on microservices)
    npm run start:dev api-gateway
    ```

> _**Note**: The `start:dev` script is a convenience wrapper for `nest start <app_name> --watch`._

### Database Migrations

The project uses TypeORM Migrations to manage database schema changes.

1.  **Generate Migration**:
    If you modify an entity, generate a migration file locally using the following script:

    ```bash
    npm run migration:generate:<app_name> -- <path_to_migration_file>
    # Example: npm run migration:generate:user -- apps/user/src/db/migrations/AddUserField
    ```

2.  **Run Migrations**:
    Apply pending migrations to the database:

    ```bash
    # Local database migrations:
    npm run migration:run:<app_name>
    # Example: npm run migration:run:user

    # Production database migrations:
    docker exec <service_name> npm run migration:run:<app_name>:prod
    # Example: docker exec user-service npm run migration:run:user:prod
    ```

> _**Note**: Migrations are run automatically when the application starts with docker compose._

3.  **Revert Migration**:
    Undo the last applied migration:

    ```bash
    # Local database migrations:
    npm run migration:revert:<app_name>
    # Example: npm run migration:revert:user

    # Production database migrations:
    docker exec <service_name> npm run migration:revert:<app_name>:prod
    # Example: docker exec user-service npm run migration:revert:user:prod
    ```

## Testing

The project uses Jest for testing.

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests (specifically for api-gateway)
npm run test:e2e
```
