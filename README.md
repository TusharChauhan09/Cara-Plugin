# Cara - Developer Typing Analytics

A developer productivity tool that tracks typing speed, coding patterns, and provides analytics through a VS Code extension and web dashboard.

## Project Overview

Cara helps developers:

- Track real-time typing speed (WPM) in the VS Code status bar
- Run typing tests with code samples
- View detailed analytics and coding patterns
- Compare rankings on global leaderboards

## Tech Stack

| Component           | Technology               |
| ------------------- | ------------------------ |
| **Build System**    | Turborepo                |
| **Package Manager** | Bun                      |
| **Frontend**        | Next.js (App Router)     |
| **Database**        | PostgreSQL + Prisma 7    |
| **Extension**       | VS Code Extension API    |

## Project Structure

```
cara-plugin/
├── apps/
│   ├── web/                    # Next.js Web Dashboard
│   └── extension/              # VS Code Extension
│
├── packages/
│   ├── database/               # Prisma schema & client
│   ├── typescript-config/      # Shared TypeScript configs
│   ├── eslint-config/          # Shared ESLint configs
│   └── ui/                     # Shared UI components
│
├── turbo.json                  # Turborepo config
└── package.json                # Root package.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1+)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [VS Code](https://code.visualstudio.com/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cara-plugin

# Install dependencies
bun install

# Start PostgreSQL (Docker)
docker run --name cara-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cara -p 5432:5432 -d postgres:16-alpine

# Setup database
cd packages/database
cp .env.example .env
# Update DATABASE_URL in .env
bun run db:push
bun run db:generate
```

### Development

```bash
# Start all apps in development mode
bun run dev

# Start specific app
bunx turbo dev --filter=web
bunx turbo dev --filter=extension
```

### Build

```bash
# Build all apps
bun run build

# Build specific app
bunx turbo build --filter=web
```

## Apps & Packages

### Apps

| App         | Description           | Port |
| ----------- | --------------------- | ---- |
| `web`       | Next.js web dashboard | 3000 |
| `extension` | VS Code extension     | -    |

### Packages

| Package                   | Description               |
| ------------------------- | ------------------------- |
| `@cara/database`          | Prisma client & schema    |
| `@repo/typescript-config` | Shared TypeScript configs |
| `@repo/eslint-config`     | Shared ESLint configs     |
| `@repo/ui`                | Shared UI components      |

## Database

The project uses PostgreSQL with Prisma ORM (v7).

```bash
cd packages/database
bun run db:generate   # Generate Prisma client
bun run db:push       # Push schema to database
bun run db:migrate    # Run migrations
bun run db:studio     # Open Prisma Studio
```

## VS Code Extension

The extension tracks typing speed and provides:

- Real-time WPM display in status bar
- Typing tests with code samples
- Statistics view

### Extension Commands

- `Cara: Start Typing Test` - Start a typing test
- `Cara: Reset Typing Test` - Reset current typing test
- `Cara: Show Statistics` - View your typing stats
- `Cara: Show Status Bar` - Restore the status bar item

### Development

```bash
cd apps/extension
bun run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
