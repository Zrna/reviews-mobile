# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this app is

React Native (Expo) mobile client for **Moovier**, a personal movie & TV review app. Users sign in (email/password or Google), browse TMDB-sourced media, and create reviews with a rating, free-text body, optional URL, and a "watch again" flag. Talks to the `reviews-backend` API (see sibling repo). The web counterpart is `reviews-web`.

## Common commands

- `npm start` — `expo start` (Metro dev server, opens the Expo dev menu).
- `npm run ios` / `npm run android` / `npm run web` — `expo start` with platform selected.
- `npm run typecheck` — `tsc --noEmit --incremental false --tsBuildInfoFile null --skipLibCheck`.
- `npm run lint` — runs typecheck **then** `eslint --fix '*/**/*.{js,ts,tsx}'`. Lint failures here are typically TS errors; run `npm run typecheck` alone to isolate.
- `npm test` — `jest --watchAll` (preset `jest-expo`). No test files currently exist; the harness is wired but unused.

Configure `EXPO_PUBLIC_API_URL` in `.env` — this is the backend base URL used by `services/backend.ts`. Anything prefixed with `EXPO_PUBLIC_` is inlined into the client bundle at build time.

### Pre-commit hook

Husky runs `npm run typecheck` then `npx lint-staged` (which runs `eslint --fix` on staged `*.{js,jsx,ts,tsx}`). A type error blocks the commit — fix the root cause rather than bypassing with `--no-verify`.

### Builds (EAS)

`eas.json` defines `development`, `development-device`, `preview`, and `production` profiles. App identity lives in `app.json` (bundle id `com.moovier.app`, slug `moovier`, EAS project `8cee474f-...`). The Google Sign-In plugin's `iosUrlScheme` is hardcoded in `app.json` — keep it in sync with the OAuth client.

## Architecture

Expo Router (file-based routing) + React Query (server state) + Context (auth state) + NativeWind (Tailwind for RN) + react-hook-form / zod (forms).

### Entry & navigation

`app/_layout.tsx` is the root: it loads Poppins fonts, mounts `QueryClientProvider` (1-week `staleTime`, retry once, no refetch on window focus), `AuthProvider`, `AuthNavigator`, and a custom `ToastManager` with branded colors.

`app/AuthNavigator.tsx` is the auth gate — it reads `authState.isLoggedIn` from `AuthContext` and renders **either** the `(auth)` stack (login/register) **or** the `(protected)` stack (tabs + review screens). This gate is wrapped in the `withNetworkCheck` HOC, which renders a "No Internet" screen when offline before any route mounts.

File-based routes under `app/`:
- `(auth)/login`, `(auth)/register` — public.
- `(protected)/(tabs)/...` — main tab navigator.
- `(protected)/reviews/[id]` — review detail.
- `(protected)/reviews/grouped-by-rating/[rating]` — reviews filtered by star rating (shows native header).

`expo-router` typed routes are enabled (`app.json` → `experiments.typedRoutes`).

### Auth flow

`contexts/AuthContext.tsx` owns auth state and exposes `onLogin` / `onRegister` / `onGoogleLogin` / `onLogout`. The access token is persisted in `expo-secure-store` under the `accessToken` key and set as `axios.defaults.headers.common["Authorization"] = Bearer <token>`. On mount, the provider hydrates from SecureStore and redirects to `/home` or `/`.

**Sliding session.** `services/backend.ts` is the axios instance. A response interceptor watches every response for an `x-new-token` header (sent by the backend when the JWT is close to expiry), persists the new token to SecureStore, updates the axios default header, and notifies `AuthContext` via a callback registered with `setTokenRefreshCallback`. A 401 from any request triggers the same callback with `null`, which logs the user out. **Don't add a separate refresh endpoint** — token rotation is purely header-driven from the backend.

Google sign-in uses `@react-native-google-signin/google-signin`; `services/googleAuth.ts` is imported in `app/_layout.tsx` to configure it at startup. The flow obtains an `idToken` client-side, posts it to the backend, and gets back an app access token.

### Data layer

All API calls live in `apis/*.ts` (`auth.ts`, `account.ts`, `reviews.ts`) and use the shared `backend` axios instance. React Query hooks wrapping these calls live in `hooks/api/*.tsx` (`reviews.tsx`, `account.tsx`). Mutations explicitly invalidate the relevant query keys on success — when adding a new mutation, follow that pattern (e.g. `useCreateReview` invalidates `reviewsGroupedByRatings`, `reviewsByRating`, and `latestReviews`). Paginated endpoints use `useInfiniteQuery` with `lastPage.hasNextPage` driving `getNextPageParam`.

### Styling

NativeWind v4 (`global.css` + `nativewind.setup.ts` imported in `_layout.tsx`). Tailwind config in `tailwind.config.js`. The Babel preset is `babel-preset-expo` with `jsxImportSource: "nativewind"`, and Metro is wrapped with `withNativeWind(config, { input: "./global.css" })`. The app is dark-themed (black background set via `SystemUI.setBackgroundColorAsync`).

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`). Import as `@/components/...`, `@/apis/...`, `@/hooks/api/...`, etc. — never relative paths across directories.

### Other conventions

- New architecture (`newArchEnabled: true`) and React 19 are in use; prefer hooks/concurrent-safe patterns.
- Errors surface via `toastify-react-native` (`Toast.success` / `Toast.error`) inside React Query mutation callbacks, or `Alert.alert` for blocking auth errors. Use `getErrorMessage(error)` from `utils/error.ts` to extract a user-facing message.
- The `withNetworkCheck` HOC only wraps the root navigator — don't re-wrap individual screens.
