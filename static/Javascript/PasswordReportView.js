$(document).ready(function() {

    showAdvancedSettings = "No";

    $('#Showadvanceddetails').click(function() {

        $(".AdvancedOptionsDiv").toggle();

        showAdvancedSettingsButton = document.getElementById("Showadvanceddetails");

        if (showAdvancedSettings == "No") {
            showAdvancedSettings = "Yes";
            showAdvancedSettingsButton.innerText = "Click Here to Hide Password Report ⯅";
        } else {
            showAdvancedSettings = "No";
            showAdvancedSettingsButton.innerText = "Click Here to View Password Report ⯆";
        }

    });

});