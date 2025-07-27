FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4100
CMD ["node", "--inspect=0.0.0.0:9232", "src/app.js"]
