# Technical Test for TicTacTrip

[![Made with GH Actions](https://img.shields.io/badge/CI-GitHub_Actions-orange?logo=github-actions&logoColor=white)](https://github.com/features/actions "Go to GitHub Actions homepage")
[![Made with Docker](https://img.shields.io/badge/Made_with-Docker-blue?logo=docker&logoColor=white)](https://www.docker.com/ "Go to Docker homepage")
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://typescriptlang.org "Go to TypeScript homepage")

## :mega: Description

This GitHub repository contains the technical test for TicTacTrip, which involves implementing and deploying a REST API that justifies a given text. The implementation must follow certain constraints, including the use of a unique token-based authentication mechanism and a rate limit of 80,000 words per day for the justify endpoint. The code must be written in Node.js/TypeScript and should not use any external library for justification. By meeting these requirements, the API will be able to justify text while ensuring security, rate limiting, and scalability.

[Link of technical requirements](https://tictactrip.notion.site/Back-46162bfe474248f4b79672979efcc379)

## :bellhop_bell: Requirements

[![Made with Node.js](https://img.shields.io/badge/Node.js->=16-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

## :raised_hands: How it works

### Setup project

- Clone the repository

```sh
git clone <link>
```

- Launch installation

```sh
make install
```

- Configure .env file

First copy and past `.env.sample` file and rename it to `.env` and in this file configure your environment

```
ACCESS_TOKEN_SECRET=<Your secret key for authentication>
```

**That's it! Everything is ready.**

### Launch project using docker

```sh
make up
```

**:tada:  It's live! Go to [http://localhost:4000](http://localhost:4000)**

## Others commands who can help

- Down container

```sh
make down
```


- Rebuild docker image

```sh
make build
```

## Endpoints

| Method | URL | Description | Header | Body | Return |
|--------|-----|-------------|--------|------|--------|
| POST | https://tictactrip-api.fly.dev/api/token | Generate an access token with your email address | :x: | `{ "email": "email@example.com" }` | { "accessToken": "TOKEN" } | 
| POST |https://tictactrip-api.fly.dev/api/justify | Justify a text | Authorization Bearer `TOKEN` | Your text | Returns the text justified |
| POST | https://tictactrip-api.fly.dev/api/justify?limit=2 | Justify a text with a specific limit of caracters | Authorization Bearer `TOKEN` | Your text | Returns the text justified with 2 caracters |


## :fr: Contributor

- :link: [Rémi Rubis](https://github.com/remirubis)

