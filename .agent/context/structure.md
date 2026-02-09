# Project Structure

## Directory Layout

```
/home/itsamit/projects/Crypto-Balance-System/
├── apps/               # Microservices and Gateway
│   ├── api-gateway/    # Main Entry point
│   ├── balance/        # Balance Microservice
│   ├── rate/           # Rate Microservice
│   └── user/           # User Microservice
├── libs/               # Shared libraries
│   └── shared/         # Common code (DTOs, interfaces, utils) used across apps
├── docs/               # Project documentation (Architecture, Setup, Services)
├── .agent/             # Agent configuration and context
│   ├── rules/          # Agent rules
│   ├── workflows/      # Agent workflows
│   ├── skills/         # Agent skills
│   └── context/        # Project context documentation
├── dist/               # Build output (gitignored)
├── node_modules/       # Dependencies (gitignored)
├── compose.yml         # Docker Compose setup
├── nest-cli.json       # NestJS CLI configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # Linting config
└── .prettierrc         # Formatting config
```

## Environment Configuration

- **.env**: Local development environment variables (per app).
- **Docker Secrets**: `password.txt` files used in `apps/*/db/` for Docker Compose database authentication.
- **ConfigModule**: NestJS ConfigModule used to validate and load variables (using Joi).

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
- `eslint.config.js`: New Flat Config for ESLint.
- `compose.yml`: Local infrastructure (DB, services, etc.) orchestration.

## Data Management

- **Database**: PostgreSQL interactions are routed through TypeORM entities in respective services.
- **Migrations**: TypeORM migrations are used to manage database schema changes.
