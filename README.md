# Next.js Hotel Details Application

A modern web application built with Next.js 15 and React 19 that displays hotel information with dynamic routing and server-side rendering capabilities.

## 🚀 Features

- Server-side rendering for optimal performance
- Dynamic routing with slug and hotel ID parameters
- Custom 404 page for invalid routes
- TypeScript support
- Unit testing setup with Jest
- Tailwind CSS for styling
- ESLint for code quality

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (latest stable version)
- npm (comes with Node.js)
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Ashfiq98/w3Engineers-assignment-4-reactjs-nextjs.git
```
```bash
cd w3Engineers-assignment-4-reactjs-nextjs
```

2. Install dependencies for client:
```bash
cd client
```
```bash
npm install
```

3. Start the backend server:
```bash
cd server
```
```bash
npm install
```
```bash
npm run dev
```

4. In a new terminal, start the frontend application:
```bash
npm run dev
```

The application will be running on:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## 🏗️ Project Structure

```
├── app/
│   ├── components/
│   ├── fonts/
│   ├── hotel-details/
│   │   └── [slug]/
│   │       └── [hotelId]/
│   │           └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
├── public/
├── node_modules/
└── various config files (.env, jest.config.ts, etc.)
```

## 🔍 Routes

- Home Page: `/`
- Hotel Details: `/hotel-details/{slug}/{hotelId}`
  - Displays hotel information based on the provided slug and ID
  - Shows custom 404 page for invalid routes

## 🔄 Data Fetching

- Server-side rendering implemented using async/await
- API route pattern: `/hotel-details/{slug}/{hotelId}`
- No client-side useEffect for data fetching

## 🧪 Testing

The project includes unit testing setup with:
- Jest
- React Testing Library
- Jest DOM environment

To run tests:
```bash
npm test
```

Note: Unit tests are currently in development and may not have 100% coverage.

## 📚 Tech Stack

### Core Dependencies
- Next.js (15.0.3)
- React (19.0.0-rc)
- React DOM (19.0.0-rc)

### Development Dependencies
- TypeScript
- ESLint
- Tailwind CSS
- Jest & Testing Library
- Various TypeScript type definitions

## 🤝 Contributing

Feel free to open issues and pull requests for any improvements you want to add.

## 📝 License

[Add your license information here]

## 👤 Author

[Add your author information here]

## ✨ Acknowledgments

[Add any acknowledgments here]