FROM node:16

WORKDIR /app

RUN npm install -g pm2

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

RUN npm run build

CMD ["pm2-runtime", "npm", "--", "start"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$PORT/ || exit 1
