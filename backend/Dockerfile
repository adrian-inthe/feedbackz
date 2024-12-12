FROM node:20 AS builder

RUN mkdir -p /app/backend
WORKDIR /app/backend

COPY ./backend/package*.json /app/backend
RUN npm install

COPY ./backend /app/backend
COPY ./shared /app/shared

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/backend/dist ./dist
COPY ./backend/package*.json ./
RUN npm install

EXPOSE 3000

CMD ["node", "dist/backend/src/main"]
