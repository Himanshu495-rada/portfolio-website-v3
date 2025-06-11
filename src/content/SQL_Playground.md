# SQL Playground 🎯

## Project Overview

**SQL Playground** is an interactive web-based SQL editor and learning platform that allows users to practice SQL queries, visualize database schemas, and learn database concepts through hands-on exercises.

## 🎯 Key Features

### Interactive SQL Editor

- **Syntax Highlighting** - PostgreSQL, MySQL, SQLite syntax support
- **Auto-completion** - Intelligent table and column suggestions
- **Query Execution** - Real-time query execution with results
- **Error Highlighting** - Immediate feedback on SQL errors
- **Query History** - Save and revisit previous queries
- **Export Results** - CSV, JSON, and Excel export options

### Learning Platform

```sql
-- Example interactive lesson
-- Lesson 1: Basic SELECT queries
SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC
LIMIT 10;

-- Try it yourself: Find all products with price > 100
-- Your query here...
```

## 🛠️ Technology Stack

### Frontend Architecture

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Monaco Editor** - VS Code-like SQL editor
- **D3.js** - Database schema visualization
- **React Query** - Server state management
- **Tailwind CSS** - Responsive styling

### Backend Services

- **Node.js + Express** - API server
- **PostgreSQL** - Primary database
- **Docker** - Isolated SQL environments
- **WebSockets** - Real-time collaboration
- **Redis** - Query caching and sessions

### Database Environments

```yaml
# Docker Compose for isolated databases
version: "3.8"
services:
  postgres-playground:
    image: postgres:14
    environment:
      POSTGRES_DB: playground
      POSTGRES_USER: student
      POSTGRES_PASSWORD: learning
    volumes:
      - ./sample-data:/docker-entrypoint-initdb.d/

  mysql-playground:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: playground
      MYSQL_USER: student
      MYSQL_PASSWORD: learning
```

## 🎓 Learning Modules

### Beginner Level

1. **SQL Basics**

   - SELECT statements
   - WHERE clauses
   - ORDER BY and LIMIT
   - Basic filtering

2. **Data Manipulation**
   - INSERT, UPDATE, DELETE
   - Data types understanding
   - NULL handling

### Intermediate Level

3. **Advanced Queries**

   - JOINs (INNER, LEFT, RIGHT, FULL)
   - Subqueries and CTEs
   - Aggregate functions
   - GROUP BY and HAVING

4. **Database Design**
   - Table creation and modification
   - Primary and foreign keys
   - Indexing strategies
   - Normalization concepts

### Advanced Level

5. **Performance Optimization**

   - Query execution plans
   - Index optimization
   - Query tuning techniques
   - Performance monitoring

6. **Advanced Features**
   - Window functions
   - Stored procedures
   - Triggers and views
   - JSON operations

## 🖥️ User Interface

### Schema Visualizer

```typescript
interface TableSchema {
  tableName: string;
  columns: Column[];
  relationships: Relationship[];
  position: { x: number; y: number };
}

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: {
    table: string;
    column: string;
  };
}
```

### Query Editor Features

- **Multi-tab Support** - Work on multiple queries
- **Syntax Validation** - Real-time error checking
- **Performance Metrics** - Execution time and row count
- **Result Pagination** - Handle large datasets
- **Query Sharing** - Share queries with permalink

## 🏗️ Sample Databases

### E-commerce Database

```sql
-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO products (name, price, category_id) VALUES
('MacBook Pro', 2499.99, 1),
('iPhone 14', 999.99, 1),
('AirPods', 199.99, 1);

-- Practice query
SELECT p.name, p.price, c.name as category
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 500;
```

### HR Management Database

- **Employees** - Staff information
- **Departments** - Organization structure
- **Salaries** - Compensation data
- **Projects** - Work assignments

### Financial Database

- **Accounts** - Bank account information
- **Transactions** - Financial movements
- **Customers** - Client data
- **Loans** - Credit information

## 🎮 Interactive Challenges

### Coding Challenges

```javascript
// Challenge system
const challenges = [
  {
    id: 1,
    title: "Find Top Customers",
    difficulty: "Easy",
    description: "Find customers who spent more than $1000",
    expectedResult: [
      { customer_name: "John Doe", total_spent: 1250.0 },
      { customer_name: "Jane Smith", total_spent: 1450.0 },
    ],
    hint: "Use SUM() and GROUP BY with HAVING clause",
  },
];
```

### Progress Tracking

- **Skill Levels** - Beginner to Expert progression
- **Badges** - Achievement system
- **Leaderboards** - Community rankings
- **Certificates** - Completion certificates

## 📊 Analytics & Insights

### Learning Analytics

```typescript
interface UserProgress {
  userId: string;
  completedLessons: number;
  totalLessons: number;
  correctQueries: number;
  totalQueries: number;
  timeSpent: number; // in minutes
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  badges: Badge[];
}

interface QueryAnalytics {
  queryId: string;
  executionTime: number;
  rowsReturned: number;
  successful: boolean;
  errorMessage?: string;
  userId: string;
  timestamp: Date;
}
```

### Popular Queries

1. **SELECT with WHERE** (85% success rate)
2. **INNER JOIN** (72% success rate)
3. **GROUP BY with HAVING** (68% success rate)
4. **Subqueries** (45% success rate)
5. **Window Functions** (35% success rate)

## 🔧 Advanced Features

### Real-time Collaboration

```javascript
// WebSocket implementation for shared sessions
const socket = io("/sql-playground");

socket.on("query_executed", (data) => {
  if (data.sessionId === currentSession) {
    updateSharedResults(data.results);
    showCollaboratorActivity(data.user);
  }
});

// Share query execution
const executeSharedQuery = (query) => {
  socket.emit("execute_query", {
    sessionId: currentSession,
    query: query,
    user: currentUser,
  });
};
```

### AI-Powered Assistance

- **Query Suggestions** - AI recommends optimizations
- **Error Explanations** - Natural language error descriptions
- **Learning Path** - Personalized curriculum recommendations
- **Code Generation** - Natural language to SQL conversion

## 🛡️ Security & Sandboxing

### Query Safety

```javascript
// SQL injection prevention
const sanitizeQuery = (query) => {
  // Block dangerous operations
  const blockedPatterns = [
    /DROP\s+TABLE/i,
    /DELETE\s+FROM.*WHERE\s+1=1/i,
    /TRUNCATE/i,
    /ALTER\s+TABLE/i,
  ];

  return blockedPatterns.every((pattern) => !pattern.test(query));
};

// Resource limits
const queryLimits = {
  maxExecutionTime: 30000, // 30 seconds
  maxMemoryUsage: 100 * 1024 * 1024, // 100MB
  maxRowsReturned: 10000,
};
```

### Isolated Environments

- **Docker Containers** - Separate execution environments
- **Resource Quotas** - CPU and memory limits
- **Network Isolation** - No external connections
- **Auto-cleanup** - Automatic environment reset

## 📱 Mobile Experience

### Progressive Web App

```json
{
  "name": "SQL Playground",
  "short_name": "SQLPlay",
  "theme_color": "#007acc",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Touch-Optimized

- **Virtual Keyboard** - SQL symbols and shortcuts
- **Gesture Navigation** - Swipe between tabs
- **Responsive Layout** - Adapts to screen size
- **Offline Mode** - Basic functionality without internet

## 🚀 Performance Optimization

### Query Execution

```javascript
// Query optimization techniques
const optimizeQuery = (query) => {
  return {
    original: query,
    optimized: addIndexHints(query),
    executionPlan: generatePlan(query),
    estimatedCost: calculateCost(query),
  };
};

// Caching strategy
const queryCache = new Map();
const getCachedResult = (queryHash) => {
  if (queryCache.has(queryHash)) {
    return queryCache.get(queryHash);
  }
  return null;
};
```

### Frontend Performance

- **Code Splitting** - Lazy load editor components
- **Virtual Scrolling** - Handle large result sets
- **Memoization** - Cache expensive computations
- **Service Workers** - Cache static assets

## 🎯 Future Enhancements

### Planned Features

- [ ] **NoSQL Support** - MongoDB, Redis playground
- [ ] **Data Visualization** - Charts and graphs
- [ ] **Team Workspaces** - Collaborative learning
- [ ] **Mobile Apps** - Native iOS/Android apps
- [ ] **API Integration** - Connect external databases
- [ ] **Advanced Analytics** - Query performance insights

### Community Features

- [ ] **User-generated Content** - Community challenges
- [ ] **Discussion Forums** - Help and discussions
- [ ] **Mentorship Program** - Expert guidance
- [ ] **Code Reviews** - Peer feedback system

## 📞 Project Resources

- 🌐 **Live Platform**: [sqlplayground.dev](https://sqlplayground.dev)
- 🐙 **GitHub**: [github.com/himanshu-tekade/sql-playground](https://github.com/himanshu-tekade/sql-playground)
- 📖 **Documentation**: [docs.sqlplayground.dev](https://docs.sqlplayground.dev)
- 🎓 **Tutorials**: [learn.sqlplayground.dev](https://learn.sqlplayground.dev)
- 💬 **Community**: [discord.gg/sqlplayground](https://discord.gg/sqlplayground)

---

_"Master SQL through practice, not theory."_
