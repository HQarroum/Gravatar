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
<script src="bower_components/es6-promise-polyfill/promise.min.js"></script>
<script src="bower_components/popsicle/popsicle.js"></script>
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
`defaultIcon` | The adopted behaviour when no image is associated with the given e-mail address.
`size`        | The size of the image in pixers
`rating`      | Defines whether to retrieve an avatar given its category, or rating. Take a look [here](https://en.gravatar.com/site/implement/images#rating) for more informations.

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
