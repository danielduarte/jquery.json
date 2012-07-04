/*!
 * jQuery JSON Plugin
 * Plugin to convert any JavaScript value to JSON format.
 *
 * @version: 1.0
 * @author Daniel Duarte <danielddu@hotmail.com>
 */

/*globals jQuery*/

(function ($) {
    'use strict';

    var _modes = {
        'compact': {
            undefinedReplace: null,
            functionReplace: null,
            array: {
                separator: ",",
                indent: "",
                open: "[",
                close: "]",
                beforeClose: ""
            },
            object: {
                separator: ",",
                indent: "",
                open: "{",
                close: "}",
                beforeClose: "",
                keyValueSeparator: ":"
            }
        },
        'spaced': {
            undefinedReplace: null,
            functionReplace: null,
            array: {
                separator: ", ",
                indent: "",
                open: "[",
                close: "]",
                beforeClose: ""
            },
            object: {
                separator: ", ",
                indent: "",
                open: "{",
                close: "}",
                beforeClose: "",
                keyValueSeparator: ": "
            }
        },
        'pretty': {
            undefinedReplace: null,
            functionReplace: null,
            array: {
                separator: ",\n",
                indent: "    ",
                open: "[\n",
                close: "]",
                beforeClose: "\n"
            },
            object: {
                separator: ",\n",
                indent: "    ",
                open: "{\n",
                close: "}",
                beforeClose: "\n",
                keyValueSeparator: ": "
            }
        }
    };

    var _indent = function (level, indentStr) {
        return new Array(level + 1).join(indentStr);
    };

    var _numberToJson = function (value, mode, indentLevel) {
        return value.toString();
    };

    var _stringToJson = function (value, mode, indentLevel) {
        // \b is not replaced
        value = value
            .replace(/\\/g, "\\\\")
            .replace(/\"/g, "\\\"")
            .replace(/\f/g, "\\f")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t");

        return "\"" + value + "\"";
    };

    var _booleanToJson = function (value, mode, indentLevel) {
        return value ? "true" : "false";
    };

    var _objectToJson = function (value, mode, indentLevel) {
        var json, i, property;

        if (value === null) {
            json = "null";
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
            json = "";
            for (i = 0; i < value.length; i++) {
                if (json.length > 0) {
                    json += mode.array.separator;
                }
                json +=  _indent(indentLevel + 1, mode.array.indent) + _toJson(value[i], mode, indentLevel + 1);
            }

            json = mode.array.open
                + json
                + mode.array.beforeClose
                + _indent(indentLevel, mode.array.indent)
                + mode.array.close;
        } else {
            json = "";
            for (property in value) {
                if (value.hasOwnProperty(property)) {
                    if (json.length > 0) {
                        json += mode.object.separator;
                    }
                    json += _indent(indentLevel + 1, mode.object.indent)
                        + _stringToJson(property, mode, indentLevel + 1)
                        + mode.object.keyValueSeparator
                        + _toJson(value[property], mode, indentLevel + 1);
                }
            }

            json = mode.object.open
                + json
                + mode.object.beforeClose
                + _indent(indentLevel, mode.array.indent)
                + mode.object.close;
        }

        return json;
    };

    var _undefinedToJson = function (value, mode, indentLevel) {
        return null;
    };

    var _unknownToJson = function (value, mode, indentLevel) {
        return null;
    };

    var _toJson = function (value, mode, indentLevel) {
        var valueType = typeof value;
        var json;

        switch (valueType) {
        case 'number':
            json = _numberToJson(value, mode, indentLevel);
            break;
        case 'string':
            json = _stringToJson(value, mode, indentLevel);
            break;
        case 'boolean':
            json = _booleanToJson(value, mode, indentLevel);
            break;
        case 'object':
            json = _objectToJson(value, mode, indentLevel);
            break;
        case 'undefined':
            json = _undefinedToJson(value, mode, indentLevel);
            break;
        default:
            json = _unknownToJson(value, mode, indentLevel);
        }

        return json;
    };

    $.toJson = function (value, options) {
        var _defaultOptions = {
            mode: 'pretty'
        };

        var _options = typeof options  === 'undefined' ? _defaultOptions : options;

        return _toJson(value, _modes[_options.mode], 0);
    };

}(jQuery));