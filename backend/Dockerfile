FROM node:latest

WORKDIR /usr/src/app/backend/

COPY ./package.json         ./
COPY ./package-lock.json    ./
COPY ./yarn.lock            ./
COPY ./prisma               ./prisma/

RUN npm i
RUN npm i global npm@10.2.5
# RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

# RUN npm run build

EXPOSE 3000

COPY --chmod=744 ./docker-entrypoint.sh /docker-entrypoint.sh

# ENTRYPOINT "/docker-entrypoint.sh"

CMD [ "npm", "run", "dev" ]
