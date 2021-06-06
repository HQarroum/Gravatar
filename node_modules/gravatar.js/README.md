<p align="center">
  <img src="assets/logo.png" />
</p>

# Gravatar
> A promise-based Gravatar client for Node and the browser. See [demo here](https://hqarroum.github.io/Gravatar/).

[![Build Status](https://travis-ci.org/HQarroum/Gravatar.svg?branch=master)](https://travis-ci.org/HQarroum/Gravatar)
[![Code Climate](https://codeclimate.com/github/HQarroum/Gravatar/badges/gpa.svg)](https://codeclimate.com/github/HQarroum/Gravatar)

Current version: **2.0.0**

## Install

```bash
npm install --save gravatar.js
```

## Description

This library covers most of the accessible interfaces exposed by the [Gravatar service](https://en.gravatar.com/site/implement/) and makes them accessible in the context of a browser or a Node.js application. For features requiring a bit more than simply just returning an URL to an image associated with an e-mail address, this module uses asynchronous requests accessible through a promise-based API to resolve remote resources.

## Usage

### Requiring the library

The entry point of the library can be required through different means, each one depending on the environment in which the library is executed.

#### ESM

```javascript
import gravatar from 'gravatar.js';
```

#### Common JS

```javascript
const gravatar = require('gravatar.js');
```

#### Browser (ESM)

```javascript
import gravatar from 'https://esm.sh/gravatar.js/dist/index.esm.js'
```

#### Browser (UMD)

```javascript
<script src="./dist/index.umd.js"></script>
```

### Associating an e-mail with an avatar

To do so, you simply need to pass an e-mail address to the library :

```javascript
const url = gravatar.url('foo@bar');
```

It is also possible to pass several options to this method in order to customize the behaviour of the Gravatar interface :

```javascript
const url = gravatar.url('foo@bar', { defaultIcon: '404', size: 200 });
```

You will find below the list of supported parameters you can pass to the library.

Option key    | Description
------------- | -------------
`defaultIcon` | The adopted behaviour when no image is associated with the given e-mail address. The default value is `404`.
`size`        | The size of the image in pixels. The default value is *80* pixels.
`rating`      | Defines whether to retrieve an avatar given its category, or rating. Take a look [here](https://en.gravatar.com/site/implement/images#rating) for more informations. The default value is `G`.

### Retrieving user profiles

It is possible through the Gravatar API to retrieve a collection of profile objects associated with a user. Using this library it is possible to retrieve this collection using the user e-mail address.

```javascript
// `profiles` is an array of profile objects associated
// with the given e-mail address.
const profiles = await gravatar.profiles('foo@bar');
```

### Resolving an e-mail address

Simply generating an URL given an e-mail address does not mean this URL does actually point to an existing resource. As such, this library provides an interface used to resolve the given e-mail address to a valid avatar URL.

```javascript
// `url` will contain the url to the *main* thumbnail
// associated with the given e-mail address.
const url = await gravatar.resolve('foo@bar');
```

> Similarly to when you generate an URL, you can pass an optional object as a second argument to the `.resolve` method in order to specify how you would like the avatar to be resolved. If the avatar has been resolved, it will be passed as an argument to the success callback.
