FROM node:12.6.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/nginx.conf" && nginx -g 'daemon off;'
