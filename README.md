# Web App for Course Selection
## Business requirements
The present web API application was developed by JP with the aim of creating a more engaging learning environment, allowing users to choose which courses they want to take. Additionally, certain restrictions have been taken into account to ensure concentration and maximize knowledge absorption, which are as follows:

A user can only take one course at a time.
A user cannot access a course that has another course as a prerequisite without having completed it beforehand.
Through our web application, users have access to a list of available courses from which they can make their selection.

## Technichal spefications
[![N|Solid](https://herbertograca.files.wordpress.com/2018/11/100-explicit-architecture-svg.png?w=1200)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)#:~:text=The%20hexagonal%20architecture%20divides%20a,to%20the%20traditional%20layered%20architecture.)
For the implementation of this application, the NestJS framework for Node.js was utilized. NestJS provides a modular and scalable architecture for web applications. Additionally, the application follows the hexagonal architecture, also known as ports and adapters, which separates the business logic from the technical implementation and focuses on the problem domain.

The development approach employed was Domain-Driven Design (DDD), which emphasizes a deep understanding of the business and the modeling of domain objects. This approach results in more flexible, maintainable, and scalable software. By combining these tools and approaches, a robust and scalable application that meets the business requirements was achieved.

In the infrastructure layer, the TypeORM framework was used for handling the database's data model. TypeORM is a TypeScript-compatible ORM that simplifies database communication and allows for intuitive operations such as querying, insertion, updating, and deletion. With TypeORM, table schemas could be defined and managed using classes and annotations. This facilitated the creation of entities, relationships, and queries, as well as the implementation of design patterns like the Repository Pattern for encapsulating data access logic.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

important: you need a database connection for typeorm, I used postgres sql, but you are free to decide what you want 
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

## Endpoints
Once you have the app up and running, you can access the Swagger documentation to explore the available endpoints. It's important to note that all endpoints are protected and require user authentication via Firebase.
On the http://localhost:5000/api you can see this

[![N|Solid](https://gcdnb.pbrd.co/images/9mAVxsjLjcVr.png?o=1)](https://swagger.io/)

## Stay in touch

- Author  - Juan Pablo meza (Flexuxs)
- github  - [juanpablomg17](https://github.com/juanpablomg17)
- Twitter - [@GazabonJuan](https://twitter.com/GazabonJuan)

## License

[MIT licensed](LICENSE).

