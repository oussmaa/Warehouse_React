# Stage 1: Build React app
FROM node:20-alpine  as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN ls -l /app


RUN yarn build


FROM nginx:alpine

# Copy built React app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
