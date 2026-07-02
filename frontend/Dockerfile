# ==========================================
# STAGE 1: INSTALL DEPENDENCIES
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ==========================================
# STAGE 2: BUILD SOURCE
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# ==========================================
# STAGE 3: RUNNER
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
