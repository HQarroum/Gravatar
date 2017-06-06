<p align="center">
  <img src="assets/logo.png" />
</p>

# Gravatar

[![Greenkeeper badge](https://badges.greenkeeper.io/HQarroum/Gravatar.svg)](https://greenkeeper.io/)
> A promise-based Gravatar client for Node and the browser. See [demo here](https://hqarroum.github.io/Gravatar/).

[![Build Status](https://travis-ci.org/HQarroum/Gravatar.svg?branch=master)](https://travis-ci.org/HQarroum/Gravatar)
[![Code Climate](https://codeclimate.com/github/HQarroum/Gravatar/badges/gpa.svg)](https://codeclimate.com/github/HQarroum/Gravatar)

Current version: **1.0.3**

Lead Maintainer: [Halim Qarroum](mailto:hqm.post@gmail.com)

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

This library covers most of the accessible interfaces exposed by the [Gravatar service](https://en.gravatar.com/site/implement/) and makes them accessible in the context of a browser or a Node.js application. For features requiring a bit more than simply just returning an URL to an image associated with an e-mail address, this module uses asynchronous requests accessible through a promise-based API to resolve remote resources.

> You must bring your own ES6 Promise compatible polyfill, I suggest [es6-promise](https://github.com/jakearchibald/es6-promise).

## Usage

### Requiring the library

The entry point of the library can be required through different means, each one depending on the environment in which the library is executed.

#### Node

Simply use the `require` interface to load the library :

```javascript
var gravatar = require('gravatar.js');
```

#### AMD / Require.js

```javascript
define(['gravatar.js'], function (gravatar) {
  // Use the library.
});
```

#### Browser

You will need to include the Gravatar library as well as its dependencies in order through `script` tags, which you will typically include at the end of your document.

```html
<!-- This example assumes you installed the library using Bower -->
<script src="bower_components/proxify-url/lib/index.js"></script>
<script src="bower_components/blueimp-md5/js/md5.min.js"></script>
<script src="bower_components/fetch/fetch.js"></script>
<script src="bower_components/gravatar.js/lib/index.js"></script>
```

### Associating an e-mail with an avatar

To do so, you simply need to pass an e-mail address to the library :

```javascript
var url = gravatar.get.url('foo@bar');
```

It is also possible to pass several options to this method in order to customize the behaviour of the Gravatar interface :

```javascript
var url = gravatar.get.url('foo@bar', { defaultIcon: '404', size: 200 });
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
gravatar.get.profiles('foo@bar').then(function (profiles) {
  // `profiles` is an array of profile objects associated
  // with the given e-mail address.
}, function (err) {
  // An error occurred.
});
```

### Resolving an e-mail address

Simply generating an URL given an e-mail address does not mean this URL does actually point to an existing resource. As such, this library provides an interface used to resolve the given e-mail address to a valid avatar URL.

```javascript
gravatar.resolve('foo@bar').then(function (url) {
  // `url` will contain the url to the *main* thumbnail
  // associated with the given e-mail address.
}).catch(function (err) {
  // An error occurred, which might indicate that
  // the e-mail address is not associated with any
  // gravatar.
});
```

> Similarly to when you generate an URL, you can pass an optional object as a second argument to the `.resolve` method in order to specify how you would like the avatar to be resolved. If the avatar has been resolved, it will be passed as an argument to the success callback.
