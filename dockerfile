FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --immutable

COPY . .
RUN yarn build

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=5s \
  CMD node -e "fetch('http://localhost:4173/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["yarn", "preview", "--host"]