FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

# Use the production server in the container so Next.js binds to 0.0.0.0
# `npm run start` uses: next start -H 0.0.0.0 -p 3000 (see package.json)
CMD ["npm", "run", "start"]
