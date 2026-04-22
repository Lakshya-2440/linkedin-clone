# LinkedIn Clone

A full-featured LinkedIn clone built with React, Vite, and Tailwind CSS. Features a mock REST API using JSON Server for development and testing.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-1.0-000000?style=flat)

## Features

### Core Features
- **Authentication** - Login/Logout with protected routes
- **Feed** - Post creation, reactions, comments, and real-time updates
- **Profile** - Editable profile with experience, education, skills
- **Network** - Connection requests, invitations, people you may know
- **Jobs** - Job listings with save/apply functionality
- **Messaging** - Real-time chat interface
- **Notifications** - Real-time notification system

### Advanced Features
- **AI Post Assistant** - Generate post content with AI suggestions
- **Analytics Dashboard** - Profile views with Recharts visualization
- **Events** - Webinar listings with RSVP functionality
- **Toast Notifications** - Global toast system with auto-dismiss
- **Scroll Animations** - Fade-in and slide-up animations using Intersection Observer
- **Skeleton Loading** - Shimmer loading states for better UX
- **Dark Mode** - Full dark mode support throughout the app

### Performance Optimizations
- **Code Splitting** - Lazy loaded routes with React.lazy and Suspense
- **Memoization** - React.memo, useMemo, and useCallback optimizations
- **Error Boundaries** - Graceful error handling with recovery options
- **Debounced Search** - Optimized search with useDebounce hook
- **Optimistic Updates** - Instant UI feedback with usePosts hook

## Tech Stack

- **Frontend**: React 19, React Router DOM, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Charts**: Recharts for analytics
- **State Management**: React Context API
- **Mock API**: JSON Server with realistic data
- **Build Tools**: Vite with manual chunk splitting

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lakshya-2440/linkedin-clone.git
cd linkedin-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server (runs both JSON Server and Vite):
```bash
npm run dev
```

This will start:
- JSON Server on http://localhost:3001 (mock API)
- Vite dev server on http://localhost:5173

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both JSON Server and Vite concurrently |
| `npm run server` | Start only the JSON Server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Mock API Endpoints

The JSON Server provides the following endpoints:

- `GET /users` - List all users
- `GET /users/:id` - Get specific user
- `GET /posts` - List all posts
- `GET /jobs` - List all jobs
- `GET /notifications` - List notifications
- `GET /conversations` - List conversations
- `GET /messages` - List messages

See `db.json` for full data structure.

## Project Structure

```
linkedin-clone/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Skeleton.jsx
│   │   └── SlideInModal.jsx
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ProfileContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.js
│   │   ├── useFetch.js
│   │   ├── useInView.js
│   │   ├── usePosts.js
│   │   └── useCountUp.js
│   ├── pages/             # Route page components
│   │   ├── Feed.jsx
│   │   ├── Profile.jsx
│   │   ├── Network.jsx
│   │   ├── Jobs.jsx
│   │   ├── Analytics.jsx
│   │   └── Events.jsx
│   ├── routes/            # Routing configuration
│   │   └── AppRoutes.jsx
│   ├── services/          # API service layer
│   │   ├── api.js
│   │   ├── postsService.js
│   │   ├── usersService.js
│   │   ├── jobsService.js
│   │   └── notificationsService.js
│   ├── App.jsx
│   └── index.css
├── db.json                # Mock API database
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
└── package.json
```

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Add `_redirects` file for SPA routing (already included in `/public`)

### Vercel
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`

## Team Members

- **Lakshya Gupta** - Lead Developer & UI/UX Designer

## Screenshots

> _Screenshots will be added here_

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

- Design inspired by LinkedIn
- Icons from [Lucide](https://lucide.dev)
- Mock data generated for demonstration purposes
