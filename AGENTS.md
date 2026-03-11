# AGENTS.md

## Build, Lint, and Test Commands

This is an Nx monorepo with a NestJS backend application.

### Development

```bash
npx nx serve account          # Start dev server (watches and rebuilds)
npx nx build account          # Production build
npx nx build account:development # Development build
```

### Code Quality

```bash
npx nx lint account           # Lint all files in account app
npx nx lint account --fix     # Auto-fix linting issues
eslint .                      # Direct ESLint execution
```

### Testing

Currently no test targets are configured. To add testing:

1. Install Jest or Vitest plugin: `npm install -D @nx/jest` or `npm install -D @nx/vitest`
2. Configure in project.json: `npx nx g @nx/jest:configuration --project=account`
3. Run: `npx nx test account` for all tests
4. Run single test: `npx nx test account --testFile=<filename>` or `npx nx test account --testNamePattern="<pattern>"`

### Nx Utilities

```bash
npx nx show project account   # View all available targets
npx nx graph                  # Visualize dependency graph
npx nx g @nx/nest:app <name>  # Generate new app
npx nx g @nx/node:lib <name>  # Generate new library
```

## Code Style Guidelines

### Imports

- Third-party imports first, then internal imports
- Use path aliases: `@school/interfaces` for shared types
- Keep imports sorted alphabetically within each group

```typescript
// Third-party
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal/local
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '@school/interfaces';
```

### Formatting

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (`'`)
- **Semicolons**: Required
- **Trailing whitespace**: Trim
- **Final newline**: Required
- **Max line length**: Not enforced for markdown, keep reasonable for code

### Naming Conventions

- **Classes**: PascalCase (`AuthService`, `UserEntity`)
- **Interfaces**: PascalCase with 'I' prefix (`IUser`)
- **Enums**: PascalCase (`UserRole`)
- **Functions/Methods**: camelCase (`registerUser`, `validatePassword`)
- **Variables/Constants**: camelCase (`email`, `passwordHash`)
- **Private members**: No underscore prefix (private keyword)
- **Files**: kebab-case (`auth.service.ts`, `user.entity.ts`)

### TypeScript Configuration

- **Decorators**: Enabled (`experimentalDecorators`, `emitDecoratorMetadata`)
- **Target**: ES2015
- **Module**: ESNext
- **Module resolution**: Node
- **Strict types**: Use type annotations, avoid `any`
- **Path aliases**: Configure in tsconfig.base.json

### NestJS Patterns

#### Module Structure

```typescript
@Module({
  imports: [
    /* ... */
  ],
  controllers: [
    /* ... */
  ],
  providers: [
    /* ... */
  ],
  exports: [
    /* ... */
  ], // For libraries
})
export class AppModule {}
```

#### Services

- Mark with `@Injectable()`
- Use constructor injection
- Async methods for I/O operations
- Throw `Error` for validation/failure cases

#### Controllers

- Mark with `@Controller('route')`
- Use `@Get()`, `@Post()`, `@Put()`, `@Delete()` decorators
- `@Body()` for DTOs, `@Param()` for route params
- Define DTO classes in controller file or separate dto/ directory

#### Entities

- Implement domain interfaces
- Encapsulate business logic in entity methods
- Use separate repository classes for data access
- Pattern: `new UserEntity(data).method()` chains

### Error Handling

- Throw simple `Error` objects with descriptive messages
- Don't expose sensitive data in error messages
- Use NestJS built-in exception filters where appropriate
- Validate input with class-validator (installed in dependencies)

### MongoDB/Mongoose

- Use `@InjectModel()` injection for models
- Async methods: `.exec()` for queries
- Types: Use `Types.ObjectId` for IDs
- Store password hashes (bcrypt), never plain passwords

### File Organization

```
apps/account/src/app/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── dto/
├── user/
│   ├── user.module.ts
│   ├── entities/
│   ├── models/
│   └── repositories/
├── configs/
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

### Best Practices

- Prefer constructor injection over property injection
- Keep controllers thin (delegation only)
- Business logic in services/entities
- Use dependency injection consistently
- Export types from `libs/*/src/index.ts` for reuse
- Configuration via `@nestjs/config` with env files in `envs/`
- Run `npx nx lint account --fix` before committing
- Keep monorepo boundaries: libs should not depend on apps
