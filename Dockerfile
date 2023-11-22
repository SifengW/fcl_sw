# Build Stage
FROM node:21 AS BUILD_IMAGE
WORKDIR /myapp
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# Production Stage
FROM node:21 AS PRODUCTION_STAGE
WORKDIR /myapp
COPY --from=BUILD_IMAGE /myapp/package*.json ./
COPY --from=BUILD_IMAGE /myapp/.next ./.next
COPY --from=BUILD_IMAGE /myapp/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]