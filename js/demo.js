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
            var result = $.toJson(object, { mode: mode });

            $('#result').text(result);
        } catch (ex) {
            $('#result').html('<strong class="error">' + ex.toString() + '</strong>');
        }
    };

    $('#input').bind('change keyup', onParamsChange);
    $('#mode').bind('change', onParamsChange);
});