
# Weather Dashboard

Live demo: coming soon  
Repo: https://github.com/kgalvanserrano/weather-dashboard

Status
- Work in progress. Core UI and API integration are implemented and the project runs locally with Vite. UX polish, caching, tests, and CI are not yet added.

Tech stack
- React 19 + Vite
- Fetch for API requests (OpenWeather or similar)
- Local development: Node.js, npm / yarn
- Recommended deployment: Vercel or Netlify (supports static + serverless)

Demo / Screenshots
- Live demo: coming soon
- Screenshot / GIF: coming soon

What it does (current)
- Search current weather by city name.
- Displays temperature, basic weather conditions, and metadata (e.g., humidity, wind).
- Simple responsive layout suitable for desktop and mobile.
- Core data fetching and rendering is implemented.

What’s not yet implemented
- Production caching (localStorage / indexedDB) and more robust error handling.
- Unit tests and CI workflows.
- Server-side proxy for secret API keys (only .env used locally).
- Accessibility and edge-case polish (rate-limit handling, fallback UI in all cases).

Quick start (local)
1. Clone
   git clone https://github.com/kgalvanserrano/weather-dashboard.git
   cd weather-dashboard

2. Install dependencies
   npm install
   # or
   yarn

3. Add environment variables (do NOT commit .env)
   - Create a `.env` file in the repo root. See `.env.example` below.

4. Run dev server
   npm run dev
   # or
   yarn dev

5. Build for production
   npm run build
   # or
   yarn build

.env.example (safe to commit as example)
# Do NOT put secret keys in variables prefixed with VITE_ — those are exposed to client code.
# For local development only (non-secret) base URL:
VITE_PUBLIC_API_BASE=https://api.openweathermap.org/data/2.5

# Recommended approach for secret keys:
# - Do NOT store OPENWEATHER_KEY in VITE_ variables (they are public).
# - Instead, create a serverless proxy that uses OPENWEATHER_KEY stored in the hosting provider's environment.
# Example (do NOT commit secrets):
# OPENWEATHER_KEY=your_openweather_api_key_here

Security notes
- Never commit .env or secret keys. Add `.env` to `.gitignore`.
- Best practice: keep your OpenWeather API key server-side. Create a serverless endpoint (e.g., /api/weather) hosted on Vercel/Netlify that forwards requests to the weather API using a secret env var (OPENWEATHER_KEY). The client calls your serverless endpoint rather than the weather provider directly.

Deployment
- Vercel: import the repository, set environment variables in the Vercel dashboard, add a custom subdomain (recommended: weather.kgalvan.dev), and deploy.
- Netlify: connect the repo, set build command and publish directory (Vite -> dist), add environment variables, and map a custom subdomain.
- GitHub Pages: works for static output only. If you use GitHub Pages, you must either use a public API key with referrer restrictions or host a separate proxy for secret keys.
