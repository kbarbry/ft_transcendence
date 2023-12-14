FROM node:latest

WORKDIR /usr/src/app/backend/

COPY ./package.json         ./
COPY ./package-lock.json    ./
COPY ./prisma               ./prisma/

RUN npm i
RUN npm i global npm@10.2.5
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY ./                     ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
# COPY --chmod=744 ./docker-entrypoint.sh /docker-entrypoint.sh

# ENTRYPOINT "/docker-entrypoint.sh"