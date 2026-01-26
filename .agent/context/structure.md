# Project Structure

## Directory Layout

```
/home/itsamit/projects/Crypto-Wallet-System/
├── apps/               # Microservices and Gateway
│   ├── api-gateway/    # Main Entry point
│   ├── balance/        # Balance Microservice
│   ├── rate/           # Rate Microservice
│   └── user/           # User Microservice
├── docs/               # Project documentation (Architecture, Setup, Services)
├── libs/               # Shared libraries

## Environment Configuration

- **.env**: Local development environment variables (per app).
- **Docker Secrets**: `password.txt` files used in `apps/*/db/` for Docker Compose database authentication.
- **ConfigModule**: NestJS ConfigModule used to validate and load variables (using Joi).
│   └── shared/         # Common code (DTOs, interfaces, utils) used across apps
├── dist/               # Build output (gitignored)
├── node_modules/       # Dependencies (gitignored)
├── .agent/             # Agent configuration and context
│   ├── rules/          # Agent rules
│   ├── workflows/      # Agent workflows
│   ├── skills/         # Agent skills
│   └── context/        # Project context documentation
├── compose.yml         # basic Docker Compose setup
├── nest-cli.json       # NestJS CLI configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.js        # Linting config
└── .prettierrc         # Formatting config
```

## Module Organization

- **Apps (`apps/`)**: standalone NestJS applications. Each usually contains `src/main.ts` and `src/app.module.ts`.
- **Libs (`libs/`)**: Shared modules intended to be imported by the apps. Mapped via `tsconfig` paths (e.g., `@app/shared`).

## File Naming Conventions

- **Classes**: `UserModule`, `AuthService`.
- **Files**: `kebab-case`.
  - `user.module.ts`
  - `auth.service.ts`
  - `create-user.dto.ts`
- **Tests**: `*.spec.ts`

## Configuration Files

- `nest-cli.json`: Defines the monorepo structure.
- `package.json`: Scripts and dependencies.
- `tsconfig.json`: Global TS config, paths mapping.
- `compose.yml`: Local infrastructure (DB, services, etc.) orchestration.

## Data Management

- **Database**: PostgreSQL interactions are routed through TypeORM entities in respective services.
- **Migrations**: Currently no migrations are used. Databases are synchronized with TypeORM entities using `synchronize: true` in TypeORM configuration. In the future, TypeORM migrations will be used to manage database schema changes.
