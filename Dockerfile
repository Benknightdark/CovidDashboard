FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:ssr

FROM node:alpine as host
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
EXPOSE 4000
CMD ["npm","run","serve:ssr"]
