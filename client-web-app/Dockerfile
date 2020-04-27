FROM nginx:1.17-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:13 AS build
WORKDIR /src
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM base AS final
COPY --from=build /src/dist/client-web-app /usr/share/nginx/html
