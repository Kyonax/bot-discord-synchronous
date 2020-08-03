# APEX 



A simple, easy to use module for interacting with the [API.](https://apex.tracker.gg/site-api)

This module is powered by [apex-api.tk](http://apex-api.tk)
## Setup and Installation
```
$ npm i apex-api
```

1. Signup at [ApexTracker](https://apex.tracker.gg/)
2. Generate an [API Key](https://apex.tracker.gg/site-api)

## Get stats
```js
// Bring in the Apex module
const Apex = require('apex-api');
// Create an instance of the client with your API Key
const apex = new Apex('YourAPIkey');

apex.user('username', 'platform [PC | XBOX | PSN]').then(data => {
    console.log(data.data)
});

```

## Get info of weapons
```js
const Apex = require('apex-api');
const apex = new Apex('YourAPIkey');

apex.weaponInfo('[alternator, devotion, eva8auto, flatline, g7scout, havoc, hemlok, kraber, longbow, mastiff, mozambique, p2020, peacekeeper, prowler, r99, r301, re45, spitfire, tripletake, wingman]').then(data => {
    console.log(data)
});
```

## Get info of legends
```js
const Apex = require('apex-api');
const apex = new Apex('YourAPIkey');

apex.legendInfo('[bloodhound, gibraltar, lifeline, pathfinder, wraith, bangalore, caustic, mirage]').then(data => {
    console.log(data)
});

```

## Get usage of legends
```js
const Apex = require('apex-api');
const apex = new Apex('YourAPIkey');

apex.legendUsage().then(data => {
    console.log(data)
});

```
