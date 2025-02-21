---
title: Angular JS Controller error Argument is not a function
date: 2021-06-23
description: Today I got an error of several hello world todo examples in AngularJS when I tryed new 1.3 version.It seems that they have broken the api. See my working example...
img: /img/angularjs.png
alt: Angularlogan, Stort A med röd bakgrund
---
![Alt text](/img/angularjs.png "Angularlogan, Stort A med röd bakgrund")

## Broken Control error in Angular
Today I got an error of several hello world todo examples in AngularJS when I tryed new 1.3 version.

Error Like;
```js
Error: [ng:areq] Argument 'sarcCntrl' is not a function, got undefined
```

## Prevent bad habits
It seems that they have broken the api. See my working example:
http://jsfiddle.net/patriklindstrom/XGeJb/
See the broken example:
http://jsfiddle.net/patriklindstrom/LGhEJ/
See my fix of the broken example:
http://jsfiddle.net/patriklindstrom/5cFy8/
Only difference is the version of AngularJS
If you change the external resource in jsfiddle from beta 1.3.0-beta.16 to previous version like 

//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js it starts to work.
So lots of AngularJS democode on the net will stop working.

See: Angular Changelog and reason given

```js
With the exception of simple demos, it is not helpful to use globals
for controller constructors. This adds a new method to `$controllerProvider`
to re-enable the old behavior, but disables this feature by default.

BREAKING CHANGE:
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default
```

To make it work: Before:
```js
function MyController() {
  // ...
}
```
After:
```js
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);
```
or you could set the settings back to allow global controllers.
```js
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
```