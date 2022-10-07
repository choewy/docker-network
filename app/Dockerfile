

FROM node:16

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm ci --only-production
RUN npm run build

CMD ["npm", "run", "serve"]