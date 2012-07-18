/*globals $*/

$(function () {
    'use strict';

    var onParamsChange = function () {
        // Options
        var preset = $('#preset').val();
        var presetValues = {
            "(default)" : undefined,
            "pretty"    : 'pretty',
            "spaced"    : 'spaced',
            "compact"   : 'compact'
        };
        preset = presetValues[preset];

        var indent = $('#indent').val();
        var indentValues = {
            "(default)"    : undefined,
            "4"            : 4,
            "2"            : 2,
            "\\t"          : "\t",
            "---"          : "---",
            "··"           : "··",
            "************" : "************",
            "X"            : "X"
        };
        indent = indentValues[indent];

        var keyValueSeparator = $('#key-value-separator').is(':checked') ? undefined : false;


        // Input
        var json = $('#input').val();

        try {
            if (json === "") {
                throw new SyntaxError("Empty input");
            }
            var object = $.parseJSON(json);

            var options = {
                preset: preset,
                indent: indent,
                keyValueSeparator: keyValueSeparator
            };

            // Remove options set to default
            var optsCount = 3;
            if (typeof options.preset === 'undefined') { delete options.preset; optsCount--; }
            if (typeof options.indent === 'undefined') { delete options.indent; optsCount--; }
            if (typeof options.keyValueSeparator === 'undefined') { delete options.keyValueSeparator; optsCount--; }
            if (optsCount === 1 && typeof options.preset !== 'undefined') { options = options.preset; }

            // Show call
            var optionsStr = $.toJSON(options, 'spaced');
            if (optionsStr === "{}") { optionsStr = ""; }
            $('#call-str').text("$.toJSON(myObject" + (optionsStr.length === 0 ? "" : ", " + optionsStr) + ");");

            var result = $.toJSON(object, options);

            $('#result').text(result);

        } catch (ex) {
            $('#result').html('<strong class="error">' + ex.toString() + '</strong>');
        }
    };

    // Event management
    $('#input').bind('change keyup', onParamsChange);
    $('#preset, #indent, #key-value-separator').bind('change', onParamsChange);
    $('.json-sample').click(function (event) {
        event.preventDefault();
        var sampleJson = '{"anIntArray":[1,32,5,2,346,34,6], "aMixedArray":[1,32,"hello", "5,2",346,null,null,"3\\n\\r4",6], "someSpecialChars":{"spaces":["\\n\\r","\\t"    ,"\\\\"],"utf":"你好","你好":"??"},"nestedArrays":["x",[],[[[3],4,[[]],[[],[]],[5]]],[],66],"":{"{}":[{},"{1,2,3}"]}}';
        $('#input').val(sampleJson).change();
    });
});