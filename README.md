## Bankof Okra Scrape test

[Challenge Document](https://okrahq.notion.site/Sr-Full-Stack-Engineer-Core-Infrastructure-BE-Institutions-ab05fdb217d64d91b9fddf82ac2846ee) Fullstack Engineer

## Core Tools and Packages used

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

[Typescript](https://www.typescriptlang.org/) Language

[Puppeteer](https://pptr.dev/) Headles browser

[Mongoose](https://mongoosejs.com/) ODM for schema generation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Routes

```
POST /api/auth/login
Body = {
    "email": "alphaTester@test.com",
    "password": "12345678"
}

Response = {
    "data": {
        "authId": "644006938f03d0b30920a051"
    },
    "message": "Login successful please input otp"
}
```

```
POST /api/auth/otp?authId=<REPLACE>
Body = {
    "otp": "12345"
}

Response = {
    "data": {},
    "message": "Otp verification successful"
}
```

```
GET /api/transactions?accountNumber=<REPLACE>&otp=<REPLACE>

Response = {
    "data": {
        "from": 1,
        "to": 10,
        "totalPages": 813,
        "transactions": []
    },
    "message": "Transactions scraped successful"
}
```

## Notes on Possible Improvements and Challenges

- The test scope does not involve app level authentication, will move forward from this. but possible improvements include encrypting the inputed password and decrypting it for logging the user in and making the verify otp route authenticated

- Not enough time to come up with a way to fetch all transactions from an account without hitting the nestjs request time limit

- Latency issues with the site or internet provider makes the response time and reponse type ("Error"/"Success") differ

## Stay in touch

- Author - [Sapele Moses](oyinkuromosesvictor@gmail.com)

This Project is built on Nest which is [MIT licensed](LICENSE).
