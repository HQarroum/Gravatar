# Gravatar
A promise-based Gravatar client for Node and the browser.

## Install

##### Using NPM

```bash
npm install --save gravatar.js
```

##### Using Bower

```bash
bower install --save gravatar.js
```

## Description

This library covers most of the accessible interfaces exposed by the [Gravatar service](https://en.gravatar.com/site/implement/) and makes them accessible in the context of a browser or a Node.js application. For features requiring a bit more than simply just returning an URL to an image associated with an e-mail address, this module uses asynchronous requests accessible through a very clear promise-based API.

The [`es6-promise`](https://www.npmjs.com/package/es6-promise) module is used throughout this module so it should not be problematic to bind the promises returned by this module with any Promises/A+ compliant library.

## Usage

### Building an avatar URL

