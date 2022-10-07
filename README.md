# Docker Network

## app(React)

- host : `::`
- port : `3000 -> 3000`
- axios
  - baseURL : http://localhost:3001

## server(NestJS)

- host : `::`
- port : `3001 -> 3001`
- cors
  - origin : http://localhost:3000
