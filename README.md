# ThapaWebsite

A modern React + Vite country explorer web app with smooth animations, routing, filtering, and detailed country pages powered by the REST Countries API.

## Features

- Browse countries with a responsive card-based UI.
- Search countries by name with 500ms debounced input.
- Filter countries by region.
- Open detailed country pages with extra metadata:
  - native names
  - region
  - languages
  - currency
  - population
  - capital
- Lazy-loaded routes with Suspense fallback loader.
- Animated UI using GSAP (`@gsap/react`, `ScrollTrigger`).
- Scroll-to-top support on route/page navigation.
- Theme and sidebar controls managed with app-level logic hooks.

## Tech Stack

- React 19
- Vite 6
- React Router DOM 7
- GSAP + `@gsap/react`
- React Icons
- ESLint

## Project Structure

```txt
thapawebsite/
  public/
  src/
    Components/      # Reusable UI parts (Navbar, Footer, Cards, Loader, Sidebar, etc.)
    Pages/           # Route pages (Home, About, Country, CountryPg, Contact, Error)
    hooks/           # Custom hooks (useCountries, useAppLogic)
    App.jsx          # App layout + route definitions
    main.jsx         # App entry (BrowserRouter + ScrollToTop)
```

## Routes

- `/` - Home
- `/About` - About section/details
- `/Country` - Country listing with search/filter
- `/Country/:name` - Country detail page
- `/Contact` - Contact form
- `*` - Error/fallback page

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build optimized production output
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## API

This project fetches country data from:

- `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`
- `https://restcountries.com/v3.1/name/{countryName}`

## Notes

- A Netlify-style redirect file exists at `public/_redirects` for SPA routing support during deployment.
- If API requests fail, users are redirected to the error page.
