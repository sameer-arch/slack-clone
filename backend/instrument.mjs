import * as Sentry from "@sentry/node";
import { env } from "./src/config/env.js";

Sentry.init({
	dsn: env.SENTRY_DSN,
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
	environment: env.NODE_ENV || "development",
	includeLocalVariables: true,
	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events

	sendDefaultPii: true,
});
