
FROM node:18.4-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma

RUN npm install glob rimraf

RUN npm install --only=development

ENV MONGODB_URI=${MONGODB_URI}
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18.4-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=development /usr/src/app/build .

EXPOSE ${PORT}

RUN npx prisma generate

