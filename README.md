# Server: NesjtJS + GraphQL

## General ##

- **Server** : Made up of somes APIs with PostgreSQL database. Using NestJS framework, Prisma ORM, and GraphQL.

## Technologies ##

| Server | 
| ------ |
| [plugins/nestjs/README.md](https://github.com/nestjs/nest) |
| [plugins/postgreSQL/README.md](https://github.com/postgres/postgres) |
| [plugins/graphql-playground/README.md](https://github.com/graphql/graphql-playground) |
| [plugins/prisma/README.md](https://github.com/prisma/prisma) |
| [plugins/bcrypt/README.md](https://github.com/kelektiv/node.bcrypt.js) |

## Set up server 

- Clone repositories.
- Add .env into server folder before running the server.

```
DATABASE_URL=YOUR_DATABASE_URL          //PostgreSQL Connection

JWT_SECRET=YOUR_KEY_SECRET              //JWT Implement
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN
REFESH_TOKEN_SECRET=YOUR_REFESH_TOKEN
```

Executing server:

```
npm install 
npm run start:dev                       //Dev environment
npm start                               //Product environment
```

Starting prisma:

```
npx prisma init
npx prisma migrate dev --name <NAME_MIGRATION_PROCESS> 
npx prisma studio                       //Running Prisma Studio
```
