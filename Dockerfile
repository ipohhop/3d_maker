FROM node:10-alpine
WORKDIR /app
COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY public public
COPY src src
COPY tsconfig.json ./

RUN npm run build

RUN npm install --global serve
CMD serve -s build
