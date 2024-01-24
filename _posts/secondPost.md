---
title: Angular JS Controller error Argument is not a function
date: 2021-06-23
description: Today I got an error of several hello world todo examples in AngularJS when I tryed new 1.3 version.
img: /hacker.jpg
alt: blåtonade bilder av dator
---
# Broken Control error in Angular

Today I got an error of several hello world todo examples in AngularJS when I tryed new 1.3 version.
# Prevent bad habits
It seems that they have broken the api. See my working example:
http://jsfiddle.net/patriklindstrom/XGeJb/
See the broken example:
http://jsfiddle.net/patriklindstrom/LGhEJ/
See my fix of the broken example:
http://jsfiddle.net/patriklindstrom/5cFy8/
Only difference is the version of AngularJS
If you change the external resource in jsfiddle from beta 1.3.0-beta.16 to previous version like //ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js it starts to work.
So lots of AngularJS democode on the net will stop working.
See: Angular Changelog and reason given
