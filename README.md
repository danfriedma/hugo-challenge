
# Hugo Challenge

Thank you for reviewing my work!

A few things to note:

This implementation contains a bare bones, happy path implementation.

As such, there are many areas that would need attention before becoming stable production code, namely: API response error handling, more robust front-end state management, documentation, testing and of course styling.

## API

Routes are found in `pages/api`

POST **api/application/create**
PUT **api/application/update**
GET **api/application/[id]**
GET **api/application/validate**

## Front-end
`/` is the homepage with form for creating the application
`pages/index.tsx`

`/application/[id]` is the page for editing and validating a previously created application
`pages/application/[id].tsx`


## Database

The postgresql database is hosted on supabase.
The API interacts with the databse through the Prisma Client defined in `lib/prisma.ts`
The database schema is defined in `prisma/schema.prisma`
Validation schema is defined by zod `prisma/schema.ts` and used on the front-end and back-end.
