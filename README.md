# Plantify - Mock E-Commerce Plant Store

A full-stack e-commerce application for buying plants, built with React, TypeScript, Express, and MongoDB.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Axios
- Framer Motion
- CSS-in-JS

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- CORS

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ujjwal-Gowda/e-cart.git
cd plantify
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/plantify
PORT=5000
```

**Note:** If using MongoDB Atlas, replace the `MONGO_URI` with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plantify?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 4. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:

   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and add it to backend `.env`

### 5. Add Sample Products (Optional)

You can add products using the API endpoint or MongoDB Compass:

````

### 6. Running the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
````

Backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
plantify/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── cartcontroller.ts
│   │   │   └── productcontroller.ts
│   │   ├── models/
│   │   │   ├── cart.ts
│   │   │   └── product.ts
│   │   ├── routes/
│   │   │   ├── cartRoute.ts
│   │   │   └── productRoute.ts
│   │   ├── db/
│   │   │   └── connection.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── navbar.tsx
    │   │   ├── productCard.tsx
    │   │   ├── productlist.tsx
    │   │   ├── cartpage.tsx
    │   │   └── checkoutmodal.tsx
    │   ├── api.ts
    │   ├── types.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## API Endpoints

### Products

- `GET /api/product` - Get all products
- `POST /api/product` - Add a new product

### Cart

- `GET /api/cart` - Get cart items for current session
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/cart/checkout` - Complete checkout

## Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/plantify
PORT=5000
```

````
## Development Commands

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
````

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
