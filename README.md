# TypeScript API Testing with Playwright

A showcase project demonstrating industry-standard API testing practices using **Playwright** for TypeScript, featuring type-safe API clients, schema validation with **Zod**, and comprehensive test coverage.

## 🎯 Project Purpose

This project serves as a reference implementation for testing REST APIs using modern TypeScript tooling. It demonstrates:

- **Type-safe API client architecture** with reusable request methods
- **Runtime schema validation** using Zod for response data integrity
- **Comprehensive test coverage** including unit, integration, and E2E API tests
- **Separation of concerns** between API clients, schemas, and test specifications
- **Industry-standard testing patterns** suitable for production environments

> **Note:** This is a prototype/showcase project using the [DummyJSON](https://dummyjson.com) mock API for demonstration purposes.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe development and compile-time checks |
| **Playwright** | API testing framework with built-in request context |
| **Zod** | Runtime schema validation and type inference |
| **Node.js** | JavaScript runtime environment |

---

## 📂 Project Structure

```
ts-api/
├── src/
│   ├── api/                    # API client classes
│   │   ├── productApi.ts       # Product CRUD operations
│   │   ├── cartApi.ts          # Cart management operations
│   │   └── authApi.ts          # Authentication & authorization
│   └── schemas/                # Zod schemas for validation
│       ├── product.schema.ts   # Product type definitions
│       ├── cart.schema.ts      # Cart type definitions
│       ├── auth.schema.ts      # Auth response schemas
│       └── error.schema.ts     # Error response schemas
├── tests/
│   └── api/
│       ├── products.spec.ts    # Product API test suite
│       ├── carts.spec.ts       # Cart API test suite
│       ├── auth.spec.ts        # Authentication test suite
│       ├── integration.spec.ts # Cross-resource integration tests
│       └── unit.spec.ts        # Schema validation unit tests
├── playwright.config.ts        # Playwright configuration
└── package.json
```

---

## ✨ Key Features & Best Practices

### 1. **API Client Pattern**
Each API resource has a dedicated client class that encapsulates all HTTP operations:

```typescript
export class ProductApi {
  constructor(private readonly request: APIRequestContext) {}
  
  async getProduct(id: number): Promise<APIResponse>
  async getProductJson(id: number): Promise<Product>  // Type-safe helper
  async createProduct(payload: Partial<Product>): Promise<APIResponse>
  // ... more methods
}
```

**Benefits:**
- Reusable across multiple test files
- Centralized request logic
- Easy to maintain and extend

### 2. **Zod Schema Validation**
Runtime validation ensures API responses match expected types:

```typescript
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
```

**Benefits:**
- Catches unexpected API contract changes
- Type inference from schemas (single source of truth)
- Self-documenting API expectations

### 3. **Layered Testing Approach**

| Test Type | Purpose | Example |
|-----------|---------|---------|
| **Unit Tests** | Validate schema parsing logic | `ProductSchema.parse()` rejects invalid data |
| **API Tests** | Test individual endpoints | GET `/products/1` returns valid product |
| **Integration Tests** | Test cross-resource workflows | Fetch product → add to cart → verify |

### 4. **Type Safety Throughout**
- TypeScript for compile-time checks
- Zod for runtime validation
- Playwright's typed request context
- Strong typing in test assertions

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ts-api

# Install dependencies
npm install

# Install Playwright browsers (if needed for UI testing)
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/api/products.spec.ts

# Run tests with detailed output
npx playwright test --reporter=list

# View HTML report after tests
npx playwright show-report
```

---

## 📋 Test Coverage

### Products API
- ✅ GET product by ID (happy path)
- ✅ GET non-existent product (404 error handling)
- ✅ POST create product
- ✅ PUT update product (full replacement)
- ✅ PATCH update product (partial update)
- ✅ Search products by query
- ✅ Search with no results

### Carts API
- ✅ GET cart by ID
- ✅ PATCH update cart contents

### Authentication API
- ✅ Login with valid credentials
- ✅ Login with invalid credentials (error handling)
- ✅ GET current user with token
- ✅ Refresh token flow

### Integration Tests
- ✅ Multi-resource workflows (fetch product → create cart)

### Schema Unit Tests
- ✅ Schema validation for valid data
- ✅ Schema rejection for invalid data

---

## 🎓 Learning Points

This project demonstrates:

1. **Separation of Concerns**: API clients, schemas, and tests are cleanly separated
2. **DRY Principle**: Reusable API clients eliminate code duplication
3. **Type Safety**: Compile-time + runtime validation catches bugs early
4. **Error Handling**: Proper handling of error responses with typed error schemas
5. **Test Organization**: Clear naming and grouping of test cases
6. **Real-world Patterns**: Production-ready patterns for API testing

---

## 📝 API Documentation

This project tests the [DummyJSON API](https://dummyjson.com/docs), which provides:

- **Base URL**: `https://dummyjson.com`
- **Resources**: Products, Carts, Users, Auth
- **No authentication required** (except for auth endpoints)

---

## 🔧 Configuration

The Playwright configuration (`playwright.config.ts`) includes:

- **Base URL**: Set to `https://dummyjson.com`
- **Test directory**: `./tests`
- **Parallel execution**: Enabled for faster test runs
- **Retry logic**: Enabled for CI environments
- **Reporting**: HTML reports generated after test runs

---

## 🤝 Contributing

This is a showcase project, but contributions to improve test coverage or demonstrate additional patterns are welcome!

---

## 📄 License

ISC

---

## 📬 Contact

For questions or feedback about this project, feel free to reach out or open an issue.

---

**Happy Testing! 🚀**
