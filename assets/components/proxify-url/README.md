![Logo](https://s.yimg.com/lq/i/us/pps/yql128.gif)

# proxify-url
[![Build Status](https://travis-ci.org/HQarroum/proxify-url.svg?branch=master)](https://travis-ci.org/HQarroum/Fsm)
[![Code Climate](https://codeclimate.com/github/HQarroum/proxify-url/badges/gpa.svg)](https://codeclimate.com/github/HQarroum/proxify-url)

An YQL wrapper used to generate a proxy URL to a given resource.

Current version: **1.0.0**

Lead Maintainer: [Halim Qarroum](mailto:hqarroum@awox.com)

## Install

##### Using NPM

```bash
npm install --save proxify-url
```

##### Using Bower

```bash
bower install --save proxify-url
```

## Description

This small component aims to make it possible to issue AJAX requests to third-party resources when it is not possible in normal cases, typically because of [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) or because the remote service does not support [JSONP](https://en.wikipedia.org/wiki/JSONP) for instance.

The library will generate an URL pointing to the initial resource, but instead of having the browser directly request the remote server for the resource, it will request the Yahoo Query Language API to act as a middle man since it supports `CORS` and `JSONP`.

## Usage

### Proxify an url

Simply require the `proxify-url` module according to the environment you are in (Node.js, AMD and the browser are supported), and call the returned function with the given URL. An example in the browser would be as follow :

```javascript
var url = proxify('https://api.github.com/users/octocat');
```

> Note that the returned proxy URL will be secured and that by default the output will be a JSON document.

### Options

To customize the proxy URL parameters and how the document is returned by the YQL API, you can pass the following options to the `proxify` function :

Option key    | Description
------------- | -------------
`outputformat`| The format in which the document must be returned. The default value is `json`.
`inputFormat` | Indicates in what format the YQL API should be parsing the document. The default value is `json`.
`jsonCompat`  | YQL transforms all JSON data sources into XML before returning results. During the tranformation from XML to JSON, the original JSON may be altered or become "lossy". In other words, the original JSON may not be the same as the returned JSON. By default, this library disables lossy JSON, but you can pass the boolean `false` to get a lossy JSON.
`callback`    | Indicates to the YQL API that it should return the result of the query as a parameter of a function, in a JSONP manner. The value of the `callback` parameter specifies the name of the function.

#### Example

The below example will ask the YQL API to parse the document as JSON and to output it as an XML document, and to pass it to a function called `foo`.

```javascript
var url = proxify('http://jsonplaceholder.typicode.com/posts', {
  inputFormat: 'json',
  outputFormat: 'xml',
  callback: 'foo'
});
```

### No conflict

Since this module is distributed in the form of an UMD (Univeral Module Definition), it might be easy to use it using module loaders such as `RequireJS` or `require` in Node while still keeping the module completely encapsulated.

However, in the context of a browser, the `proxify` object name is exported in the global namespace. To prevent it from conflicting with another component exporting an object with the same name, you can use the `.noConflict` function as follow.

```javascript
var proxy = proxify.noConflict();
```