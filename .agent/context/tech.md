# Technical Architecture

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **Caching**: In-memory caching (@nestjs/cache-manager)
- **Authentication**: Passport (JWT, Local strategy)
- **Utilities**: RxJS, Class Validator, Class Transformer, Winston (logging), Swagger (docs)
- **External APIs**: [CoinGecko](https://www.coingecko.com/en/api) (for exchange rates)

## Architecture Overview

**Pattern**: Microservices Architecture with API Gateway (Monorepo)

- **Monorepo Management**: NestJS Monorepo (standard workspace)
- **Services**:
  - **API Gateway (`apps/api-gateway`)**: Entry point, handles routing and auth termination.
  - **User Service (`apps/user`)**: Manages user data and identity.
  - **Balance Service (`apps/balance`)**: Manages crypto holdings.
  - **Rate Service (`apps/rate`)**: Fetches and caches exchange rates.
- **Communication**: TCP Transport (Inter-service communication) and HTTP (REST) (Client-Server communication).

## Development Environment

- **Package Manager**: NPM
- **Runtime**: Node.js
- **Local Dev Server**:
  - Run individual apps: `nest start <app_name> --watch` or `npm run start:dev <app_name>`
  - Convenience scripts: `npm run start:dev <app_name>` (must specify app name).

## Code Standards

- **Formatter**: Prettier
- **Linter**: ESLint
- **Style Guide**: Standard NestJS structure/idioms (Modules, Controllers, Providers, DTOs).

## Testing Strategy

- **Framework**: Jest
- **Types**:
  - **Unit Tests**: `*.spec.ts` colocated with source files.
  - **E2E Tests**: `test/jest-e2e.json` config (specifically present in `apps/api-gateway/test`).
- **Coverage**: `npm run test:cov`

## Deployment Process

- **Build**: `nest build` (can build specific apps).
- **Docker**: `.dockerignore` and `compose.yml` present, indicating containerization support.
- **Prod Execution**: `node dist/apps/<app_name>/main`

## Security Considerations

- **Auth**: JWT-based authentication via Passport.
- **Validation**: Input validation using `class-validator` and `joi` (env vars).
- **Headers**: `helmet` is installed for HTTP header security.
- **Rate Limiting**: `@nestjs/throttler` is installed.
ed.
