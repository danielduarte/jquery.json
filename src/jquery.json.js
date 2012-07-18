/*!
 * jQuery JSON Plugin
 * Plugin to convert any JavaScript value to JSON format.
 *
 * @version: 1.0.0
 * @author Daniel David Duarte <danielddu@hotmail.com>
 */

/*globals jQuery*/

/*
 * @todo Treat Infinity value.
 */
(function ($) {
    'use strict';

    var _defaultOptions = {
        'compact': {
            preset: 'compact',
            indent: "",
            keyValueSeparator: false,
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true
        },
        'spaced': {
            preset: 'spaced',
            indent: "",
            keyValueSeparator: true,
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true
        },
        'pretty': {
            preset: 'pretty',
            indent: 4,
            keyValueSeparator: true,
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true
        }
    };

    var _modes = {
        'compact': {
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true,
            array: {
                separator: ",",
                indent: "",
                open: "[",
                afterOpen: "",
                close: "]",
                afterLast: ""
            },
            object: {
                separator: ",",
                indent: "",
                open: "{",
                afterOpen: "",
                close: "}",
                afterLast: "",
                keyValueSeparator: ":"
            }
        },
        'spaced': {
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true,
            array: {
                separator: ", ",
                indent: "",
                open: "[",
                afterOpen: "",
                close: "]",
                afterLast: ""
            },
            object: {
                separator: ", ",
                indent: "",
                open: "{",
                afterOpen: "",
                close: "}",
                afterLast: "",
                keyValueSeparator: ": "
            }
        },
        'pretty': {
            undefinedReplace: null,
            functionReplace: null,
            compactEmptyArrays: true,
            compactEmptyObjects: true,
            compactOneElemArrays: true,
            array: {
                separator: ",\n",
                indent: "    ",
                open: "[",
                afterOpen: "\n",
                close: "]",
                afterLast: "\n"
            },
            object: {
                separator: ",\n",
                indent: "    ",
                open: "{",
                afterOpen: "\n",
                close: "}",
                afterLast: "\n",
                keyValueSeparator: ":·"
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

    var _arrayToJson = function (value, mode, indentLevel) {
        var json = "";
        var elemCount = 0, currentIndent;

        var compactOne = mode.compactOneElemArrays && value.length === 1;
        var elemsStr = [];
        for (var i = 0; i < value.length; i++) {
            elemsStr.push(_toJson(value[i], mode, indentLevel + (compactOne?0:1)));
            elemCount++;
        }
        var isEmpty = elemCount === 0;

        currentIndent = _indent(indentLevel + (compactOne?0:1), mode.array.indent);
        json += elemsStr.join(mode.array.separator + currentIndent);
        json += isEmpty||compactOne ? "" : mode.array.afterLast;
        json = mode.array.open + (isEmpty||compactOne && mode.compactEmptyArrays ? "" : mode.array.afterOpen)
            + (isEmpty||compactOne ? "" : currentIndent)
            + json
            + (isEmpty||compactOne && mode.compactEmptyArrays ? "" : _indent(indentLevel, mode.array.indent))
            + mode.array.close;

        return json;
    };

    var _objectToJson = function (value, mode, indentLevel) {
        var json, property, isEmpty;

        if (value === null) {
            json = "null";
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
            json = _arrayToJson(value, mode, indentLevel);
        } else {
            json = "";
            isEmpty = true;
            for (property in value) {
                if (value.hasOwnProperty(property)) {
                    isEmpty = false;
                    if (json.length > 0) {
                        json += mode.object.separator;
                    }
                    json += _indent(indentLevel + 1, mode.object.indent)
                         + _stringToJson(property, mode, indentLevel + 1)
                         + mode.object.keyValueSeparator
                         + _toJson(value[property], mode, indentLevel + 1);
                }
            }

            json += isEmpty ? "" : mode.object.afterLast;

            json = mode.object.open + (isEmpty && mode.compactEmptyObjects ? "" : mode.object.afterOpen)
                + json
                + (isEmpty && mode.compactEmptyObjects ? "" : _indent(indentLevel, mode.array.indent))
                + mode.object.close;
        }

        return json;
    };

    var _undefinedToJson = function (value, mode, indentLevel) {
        return _toJson(mode.undefinedReplace, mode, indentLevel);
    };

    var _functionToJson = function (value, mode, indentLevel) {
        return _toJson(mode.functionReplace, mode, indentLevel);
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
        case 'function':
            json = _functionToJson(value, mode, indentLevel);
            break;
        default:
            json = _unknownToJson(value, mode, indentLevel);
        }

        return json;
    };

    var _createModeFromOptions = function (options) {
        var mode, preset, indent, keyValueSeparator, undefinedReplace, functionReplace;

        // Prepare base preset mode (defaults to 'pretty')
        if (typeof options === 'object' && typeof options.preset === 'string' && _modes.hasOwnProperty(options.preset)) {
            preset = options.preset;
        } else {
            preset = 'pretty';
        }

        // Prepare default options for the selected preset
        var op = $.extend(true, {}, _defaultOptions[preset], options);

        // Prepare base mode with selected preset
        mode = $.extend(true, {}, _modes[preset]);

        // Indentation string
        if (typeof op.indent === 'number') {
            indent = Math.floor(op.indent);
            indent = new Array(op.indent + 1).join(" ");
            mode.array.indent = indent;
            mode.object.indent = indent;
        } else if (typeof op.indent === 'string') {
            indent = op.indent;
            mode.array.indent = indent;
            mode.object.indent = indent;
        }

        // Key-Value separator
        if (typeof op.keyValueSeparator === 'boolean') {
            keyValueSeparator = ":" + (op.keyValueSeparator ? " " : "");
            mode.object.keyValueSeparator = keyValueSeparator;
        } else if (typeof op.keyValueSeparator === 'string') {
            keyValueSeparator = ":" + op.keyValueSeparator;
            mode.object.keyValueSeparator = keyValueSeparator;
        }

        // Undefined values replacement
        if (typeof op.undefinedReplace === 'undefined' || typeof op.undefinedReplace === 'function' || op.undefinedReplace === null) {
            undefinedReplace = null;
        } else if (typeof op.undefinedReplace === 'string' || typeof op.undefinedReplace === 'number' || typeof op.undefinedReplace === 'boolean') {
            undefinedReplace = op.undefinedReplace;
        } else {
            undefinedReplace = op.undefinedReplace;
        }
        mode.undefinedReplace = undefinedReplace;

        // Undefined values replacement
        if (typeof op.functionReplace === 'undefined' || typeof op.functionReplace === 'function' || op.functionReplace === null) {
            functionReplace = null;
        } else if (typeof op.functionReplace === 'string' || typeof op.functionReplace === 'number' || typeof op.functionReplace === 'boolean') {
            functionReplace = op.functionReplace;
        } else {
            functionReplace = op.functionReplace;
        }
        mode.functionReplace = functionReplace;

        // Compact empty arrays option
        if (typeof op.compactEmptyArrays === 'boolean') {
            mode.compactEmptyArrays = op.compactEmptyArrays;
        }

        // Compact empty arrays option
        if (typeof op.compactEmptyObjects === 'boolean') {
            mode.compactEmptyObjects = op.compactEmptyObjects;
        }

        // Compact one element arrays option
        if (typeof op.compactOneElemArrays === 'boolean') {
            mode.compactOneElemArrays = op.compactOneElemArrays;
        }

        return mode;
    };

    $.toJSON = function (value, options) {
        var preset = null, mode;

        if (typeof options === 'undefined') {
            preset = 'pretty';
        }
        if (typeof options === 'string') {
            if (_modes.hasOwnProperty(options)) {
                preset = options;
            } else {
                preset = 'pretty';
            }
        }

        if (preset !== null) {
            mode = _modes[preset];
        } else {
            mode = _createModeFromOptions(options);
        }

        return _toJson(value, mode, 0);
    };

}(jQuery));