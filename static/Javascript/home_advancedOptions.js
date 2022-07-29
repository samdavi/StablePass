// Show Advanced Options
$(document).ready(function() {

    ShowAdvancedSettingsOptions = "No";

    $('#showdavancedoptions').click(function() {

        ShowAdvancedSettingsOptionsButton = document.getElementById("showdavancedoptions");

        const inputfields = ['#ButtonLowercaseValue', '#ButtonUppercaseValue', '#ButtonSymbolsValue', '#ButtonNumbersValue']

        if (ShowAdvancedSettingsOptions == "No") {
            ShowAdvancedSettingsOptions = "Yes";
            ShowAdvancedSettingsOptionsButton.innerText = "Click here to Specify minimum character per type (Hide)";

            for (var i = 0; i < inputfields.length; i++) {
                $(inputfields[i]).show();
            }
        } else {
            ShowAdvancedSettingsOptions = "No";
            ShowAdvancedSettingsOptionsButton.innerText = "Click here to Specify minimum character per type (Show)";

            for (var i = 0; i < inputfields.length; i++) {
                $(inputfields[i]).hide();
            }

            for (var i = 0; i < inputfields.length; i++) {

                if ($(inputfields[i]).is(":not(:disabled)")) {
                    $(inputfields[i]).val(1);
                }
            }

        };

    });
});

// Check that Amount specifed in all checkboxes doesn't exceed the password length 
$(function Numbersum() {
    const inputfields = ['#ButtonLowercaseValue', '#ButtonUppercaseValue', '#ButtonSymbolsValue', '#ButtonNumbersValue']

    $(':input[type="number"]').on('change', function() {

        var suminputnumber = 0

        for (var i = 0; i < inputfields.length; i++) {
            suminputnumber = Number(suminputnumber) + Number($(inputfields[i]).val());
        }

        // If exact amount of length - Don't let user go any higher. 
        if (suminputnumber == $('#result').text()) {

            var max = 0

            for (var i = 0; i < inputfields.length; i++) {
                max = $(inputfields[i]).val();
                $(inputfields[i]).attr({
                    "max": max
                });
            }

        } else if (suminputnumber < $('#result').text()) {
            for (var i = 0; i < inputfields.length; i++) {
                $(inputfields[i]).removeAttr("max");
            }
        } else if (suminputnumber > $('#result').text()) {
            for (var i = 0; i < inputfields.length; i++) {

                if ($(inputfields[i]).is(":not(:disabled)")) {
                    $(inputfields[i]).val(1);
                }
            }
        }

    });
});