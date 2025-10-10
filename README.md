# M🌕🌑D Journal

A journaling web application that uses artificial intelligence to analyze your entries and track your emotional patterns over time.

## Features

-  **AI-Powered Mood Analysis**: Automatically analyzes journal entries to determine emotional states and sentiment
-  **Secure Authentication**: User authentication and management powered by Clerk
-  **Auto-Save**: Automatic saving of journal entries as you write
-  **Mood Visualization**: Interactive charts and graphs to track mood patterns over time
-  **Real-time Analysis**: Instant AI feedback on your emotional state using Google's Generative AI

## Tech Stack

### Frontend

-  **Next.js 14** - React framework for production
-  **React 18** - UI library
-  **TypeScript** - Type-safe development
-  **Tailwind CSS** - Utility-first styling
-  **Recharts** - Data visualization for mood tracking

### Backend & Database

-  **Prisma** - Type-safe database ORM
-  **PostgreSQL** - Relational database

### AI & NLP

-  **Google Generative AI** - Core AI model for mood analysis
-  **LangChain** - Framework for building AI applications
   -  @langchain/core - Core LangChain functionality
   -  @langchain/google-genai - Google Generative AI integration
   -  @langchain/google-vertexai - Vertex AI integration
-  **Zod** - Schema validation for AI responses

### Authentication

-  **Clerk** - Complete authentication solution with user management

### Additional Features

-  **React Autosave** - Automatic saving functionality
-  **ESLint** - Code quality and consistency

### Testing

-  **Vitest** - Fast unit testing framework
-  **Testing Library** - React component testing
-  **JSDOM** - DOM implementation for testing

## Getting Started

### Prerequisites

-  Node.js 20.x or higher
-  A database (PostgreSQL, MySQL, or SQLite)
-  Clerk account for authentication
-  Google AI API key

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-name>
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Add your environment variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Database
DATABASE_URL="your_database_url"

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_key
```

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up/Login**: Create an account or log in using Clerk authentication
2. **Write**: Start writing your journal entries
3. **Analyze**: The AI automatically analyzes your entry and determines your mood
4. **Track**: View your mood patterns over time through interactive charts
5. **Reflect**: Use insights to understand your emotional journey

## Development

### Running Tests

```bash
npm run test
```

### Database Management

```bash
# Create a migration
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

### Linting

```bash
npm run lint
```

## Deployment

This application can be deployed on Vercel, the platform from the creators of Next.js:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

-  Built with [Next.js](https://nextjs.org/)
-  AI powered by [Google Generative AI](https://ai.google.dev/)
-  Authentication by [Clerk](https://clerk.com/)
-  Database management with [Prisma](https://www.prisma.io/)
