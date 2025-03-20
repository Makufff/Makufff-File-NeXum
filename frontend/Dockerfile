FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4812

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R nextjs:nodejs .

USER nextjs

EXPOSE 4812

CMD ["node", "server.js"] 