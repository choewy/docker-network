FROM node:16

EXPOSE 3001

WORKDIR /server

COPY . .

RUN npm ci --only-production
RUN npm run build

CMD ["npm", "run", "start:prod"]