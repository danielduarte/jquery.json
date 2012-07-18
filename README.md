jQuery.json plugin
==================

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

    var myPrettyJsonString  = $.toJSON(myObject, 'pretty'); // default

        // Output:
        //
        // {
        //     "aNumber": 123,
        //     "aString": "two\nlines",
        //     "aNullValue": null,
        //     "nestedObject": {},
        //     "anArray": [
        //         1,
        //         2,
        //         null,
        //         {
        //             "a": 1,
        //             "b": 2,
        //             "c": []
        //         },
        //         ""
        //     ]
        // }

    var mySpacedJsonString  = $.toJSON(myObject, 'spaced');

        // Output:
        //
        // {"aNumber": 123, "aString": "two\nlines", "aNullValue": null, "nestedObject": {}, "anArray": [1, 2, null, {"a": 1, "b": 2, "c": []}, ""]}

    var myCompactJsonString = $.toJSON(myObject, 'compact');

        // Output:
        //
        // {"aNumber":123,"aString":"two\nlines","aNullValue":null,"nestedObject":{},"anArray":[1,2,null,{"a":1,"b":2,"c":[]},""]}

Specification:

`$.toJSON(value, options)`

`value`: Any JavaScript value.

`options` (optional): it could be

- A string value: one of `'pretty'`, `'spaced'`, `'compact'` values. Defaults to `'pretty'`.

  Detail:
  - `'pretty'`: Generates a multiline indented string.
  - `'spaced'`: Generates a one-line string, adding spaced (by default) as separators.
  - `'compact'`: Generates a one-line string, with the minified version of the value.

- An object with the following options (all of them optional):

  - `preset` *(string)*: `'pretty'`, `'spaced'` or `'compact'`. Defaults to `'pretty'`. See details above.

  - `indent` *(int | string)*: if it is an integer value, represents the number of spaces used for indentation. It it is a string, represents the string used for any level indentation. For example, if you want to indent with tabs, you should set this option to `"\t"`. Defaults to `4` if the used preset is `'pretty'`, or to `""` otherwise.

  - `keyValueSeparator` *(boolean | string)*: If boolean, indicates if there must be used a single space character to separate colon and values in objects, or if there must not be used any separator. If string, represents the string used as separator between the colon and the value in the objects. Defaults to `false` for `'compact'` preset, or to `true` otherwise.

  - `undefinedReplace` *(mixed)*: The value that should be used when an `undefined` value is transformed to a JSON string. This options in needed because JSON does not support undefined values. Defaults to `null`.

  - `functionReplace` *(mixed)*: The value that should be used when a `function` value is transformed to a JSON string. This options in needed because JSON does not support function values. Defaults to `null`.

  - `compactEmptyArrays` *(boolean)*: Indicates if empty arrays are compacted even if the used preset is `'pretty'`. A compacted array looks always like `[]`. Defaults to `true`.

  - `compactEmptyObjects` *(boolean)*: Indicates if empty objects (those which don't have any own property) are compacted even if the used preset is `'pretty'`. A compacted array looks always like `{}`. Defaults to `true`.

  - `compactOneElemArrays` *(boolean)*: Indicates if arrays with one only element are compacted even if the used preset is `'pretty'`. A one-element compacted array looks always like `["elem"]`. Defaults to `true`.


For a live demo, see demo/index.html inside this package.


License
-------

This product must be used under the license specified in the included file LICENSE.