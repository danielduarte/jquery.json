jQuery.json plugin
===================

- *Author*: Daniel David Duarte
- *Version*: 1.0.0
- *License*: See included file LICENSE

---------------------------------------------


Summary
-------

A jQuery plugin to convert JavaScript values to JSON format. Thus, converts
values to string.
It supports all the JSON specification: objects, arrays, strings, numbers, and
null values.


Usage
-----

1) Include jQuery in your page.
2) Include the jQuery.json plugin (jquery.json.js located in src/ folder of this package).
3) Just call $.toJSON(someValue) with your JavaScript value.

Example:

    var myObject = {
        aNumber: 123,
        aString: "two\nlines",
        aNullValue: null,
        nestedObject: {},
        anArray: [1, 2, null, {a:1, b:2, c: []}, ""]
    };
    
    var myPrettyJsonString  = $.toJSON(myObject, { mode: 'pretty' }); // default
    var mySpacedJsonString  = $.toJSON(myObject, { mode: 'spaced' });
    var myCompactJsonString = $.toJSON(myObject, { mode: 'compact' });

Specification:

`$.toJSON(value, options)`
    
`value`: Any JavaScript value.

`options`: hash with the following components:

- `mode`: One of `'pretty'`, `'spaced'`, `'compact'` values. Defaults to `'pretty'`.
  - `'pretty'`: Generates a multiline indented string.
  - `'spaced'`: Generates a one-line string, adding spaced as separators.
  - `'compact'`: Generates a one-line string, with the minified version of the value.

For a live demo, see demo/index.html inside this package.


License
-------

This product must be used under the license specified in the included file LICENSE.
