/*globals $*/

$(function () {
    'use strict';

    var onParamsChange = function () {
        var json = $('#input').val();
        var mode = $('#mode').val();

        try {
            if (json === "") {
                throw new SyntaxError("Empty input");
            }

            var object = $.parseJSON(json);
            var result = $.toJson(object, {mode: mode});

            $('#result').text(result);
        } catch (ex) {
            $('#result').html('<strong class="error">' + ex.toString() + '</strong>');
        }
    };

    $('#input').bind('change keyup', onParamsChange);
    $('#mode').bind('change', onParamsChange);

    $('.json-sample').click(function (event) {
        event.preventDefault();

        var sampleJson = '{"anIntArray":[1,32,5,2,346,34,6], "aMixedArray":[1,32,"hello", "5,2",346,null,null,"3\\n\\r4",6], "someSpecialChars":{"spaces":["\\n\\r","\\t"    ,"\\\\"],"utf":"你好","你好":"??"},"nestedArrays":["x",[],[[[3],4,[[]],[[],[]],[5]]],[],66],"":{"{}":[{},"{1,2,3}"]}}';
        $('#input').val(sampleJson).change();
    });
});