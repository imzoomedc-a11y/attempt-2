# ---- Dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# ---- Build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# The build does not need a live database (data pages are force-dynamic).
RUN npm run build

# ---- Run ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
# Set DATABASE_URL at runtime (e.g. postgresql://user:pass@host:5432/db).
# The app creates its own tables and seeds data on first request.
CMD ["npm", "start"]
