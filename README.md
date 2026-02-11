# 🚀 CodePulse - Developer Typing Analytics Platform

A comprehensive developer productivity tool that tracks typing speed, coding patterns, and provides analytics through a VS Code extension and web dashboard.

## 📋 Project Overview

CodePulse helps developers:

- Track real-time typing speed (WPM) in the VS Code status bar
- Run typing tests with code samples
- View detailed analytics and coding patterns
- Compare rankings on global leaderboards
- Sync data across devices

## 🛠️ Tech Stack

| Component           | Technology               |
| ------------------- | ------------------------ |
| **Build System**    | Turborepo                |
| **Package Manager** | Bun                      |
| **Frontend**        | Next.js 14+ (App Router) |
| **Database**        | PostgreSQL + Prisma 7    |
| **Authentication**  | NextAuth.js v5 (Auth.js) |
| **Charts**          | Apache ECharts           |
| **Extension**       | VS Code Extension API    |

## 📁 Project Structure

```
codepulse/
├── apps/
│   ├── web/                    # Next.js Web Application
│   ├── extension/              # VS Code Extension
│   └── docs/                   # Documentation
│
├── packages/
│   ├── database/               # Prisma schema & client
│   ├── typescript-config/      # Shared TypeScript configs
│   ├── eslint-config/          # Shared ESLint configs
│   └── ui/                     # Shared UI components
│
├── workflows/
│   └── PROJECT_GUIDE.md        # Detailed implementation guide
│
├── turbo.json                  # Turborepo config
└── package.json                # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1+)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd codepulse

# Install dependencies
bun install

# Start PostgreSQL (Docker)
docker run --name codepulse-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=codepulse -p 5432:5432 -d postgres:16-alpine

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

## 📦 Apps & Packages

### Apps

| App         | Description           | Port |
| ----------- | --------------------- | ---- |
| `web`       | Next.js web dashboard | 3000 |
| `extension` | VS Code extension     | -    |
| `docs`      | Documentation site    | 3001 |

### Packages

| Package                   | Description               |
| ------------------------- | ------------------------- |
| `@cara/database`          | Prisma client & schema    |
| `@repo/typescript-config` | Shared TypeScript configs |
| `@repo/eslint-config`     | Shared ESLint configs     |
| `@repo/ui`                | Shared UI components      |

## 🗄️ Database

The project uses PostgreSQL with Prisma ORM (v7).

```bash
# Generate Prisma client
cd packages/database
bun run db:generate

# Push schema to database
bun run db:push

# Run migrations
bun run db:migrate

# Open Prisma Studio
bun run db:studio
```

## 🔌 VS Code Extension

The extension tracks typing speed and provides:

- Real-time WPM display in status bar
- Typing tests with code samples
- Statistics view
- Cloud sync

### Extension Commands

- `CodePulse: Start Typing Test` - Start a typing test
- `CodePulse: Show Statistics` - View your typing stats
- `CodePulse: Sync to Cloud` - Manually sync data

### Development

```bash
cd apps/extension
bun run compile
# Press F5 in VS Code to launch Extension Development Host
```

## 📚 Documentation

For detailed implementation guide, see [workflows/PROJECT_GUIDE.md](./workflows/PROJECT_GUIDE.md)

## 📝 License

MIT
