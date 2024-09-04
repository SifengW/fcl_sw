# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn build

# Stage 3: Production environment
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy only necessary files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY prisma ./prisma

EXPOSE 3000

CMD ["yarn", "start"]
