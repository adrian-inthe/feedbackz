FROM node:20 AS builder

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY /frontend/package*.json /app/frontend
RUN npm install

COPY ./frontend /app/frontend
COPY ./shared /app/shared

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
