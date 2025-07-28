import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // best practice

  tracesSampleRate: 0, // 0 means no performance tracing (safe for now)
  debug: process.env.NODE_ENV !== "production", // helpful in dev, silent in prod

  // Optionally add a release version (if doing CI/CD later)
  // release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  environment: process.env.NODE_ENV,
});
