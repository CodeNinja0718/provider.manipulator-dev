FROM node:16-alpine AS builder
WORKDIR /src
COPY package.json yarn.lock ./
RUN npm pkg set scripts.prepare=":" && yarn install   # Override prepare script by null command to ignore husky installation
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# https://nextjs.org/docs/messages/sharp-missing-in-production
ENV NEXT_SHARP_PATH /usr/local/lib/node_modules/sharp
RUN npm install --location=global sharp

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY package.json ./
COPY --from=builder /src/public ./public
COPY --from=builder --chown=nextjs:nodejs /src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/.next/static ./.next/static

USER nextjs

ENV PORT 5000
EXPOSE 5000
CMD ["node", "server.js"]
