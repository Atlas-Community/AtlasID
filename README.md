<p align="center">
  <img width="400" alt="Logo of AtlasID" src="http://atlas-scp.fr/logo.svg" />
</p>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-inDEV-blue.svg?cacheSeconds=2592000&style=for-the-badge" />
  <img alt="Documentation" src="https://img.shields.io/badge/synapse%20version-2.6.1-purple.svg?style=for-the-badge" />
  <a href="https://github.com/ServeurHydeos/Wyrd/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained-no-red.svg?style=for-the-badge" />
  </a>
</p>

> AtlasID is a complete solution including an API in NodeJS (AdonisJS) and a plugin (Synapse), allowing to manage players for SCP:SL servers.

### 🏠 [Homepage](https://atlas-scp.fr)

## Prerequisites

AtlasID requires a MySQL server and a Redis server to run properly.

## Structure
 
The ``API`` folder contains the source code of the the NodeJS server (AdonisJS).
<br/>
The ``Synapse-Plugin`` folder contains the source code of the plugin which allows to interact with the API.

## API: main commands

To install the necessary dependencies:
```sh
yarn install
```
To build the API (for production):
```sh
yarn build
yarn start
```
To launch the API for development:
```sh
yarn dev
```

## Author

👤 **Antt0n / Atlas**

* Website: https://antt0n.tech
* Github: [@antt0n](https://github.com/antt0n)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator) (modified slightly though)._
