FROM node:20.15.0-alpine

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev"]