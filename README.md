# Investigation Backend + Frontend

The project was created in development mode by isik_hi. 
The project is not production ready. 


- Server Url: [http://localhost:3333/v0]()
- Documentation(Swagger-OpenAPI) [http://localhost:3333/documentation]()
- Client Url: [http://localhost:8080/v0]()

## Running
### Pre requirements:
- Node.js(>=v16), npm(>=7.24) or yarn(>=1.22.11)
### Nice to have 
- Docker(>=20.10.8), Docker Compose(>=v2.0.0)
### Start the app with docker
1. Install dependencies with `yarn` or `npm`
2. Start the services via `docker-compose -f docker-compose.yml up -d`

### Start the app without docker
1. Install dependencies with `yarn` or `npm`
2. Copy `.env.dist` file as `.env` (`copy .env.dist .env`)
3. Client: `nx serve client` 
4. Server: `nx serve server`

### Testing
You can run tests with `yarn test:server` client tests are not wrote yet.

Here is a csv file with more than 30000+ lines of examples. Using this file, testing can be done on the front side.
`apps/server/src/assets/mocks/upload-example.csv`

## Build
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
