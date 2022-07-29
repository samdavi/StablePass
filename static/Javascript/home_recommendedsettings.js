// Recommended Settings button to set recommended password settings
function RecommendedSettings() {

    document.getElementById("slider").value = "15";
    document.getElementById("result").innerText = "15";

    const checkboxValues = [ButtonLowercase, ButtonUppercase, ButtonSymbols, ButtonNumbers]
    const inputfields = ['#ButtonLowercaseValue', '#ButtonUppercaseValue', '#ButtonSymbolsValue', '#ButtonNumbersValue']

    for (let i = 0; i < checkboxValues.length; i++) {

        var elementid = checkboxValues[i].id
        var element = document.getElementById(elementid);

        if (element.classList.contains("UnpressedButton")) {
            document.getElementById("Checkbox" + elementid).checked = true;
            element.classList.remove("UnpressedButton");
            element.classList.add("Pressedbutton");
        }

        $(inputfields[i]).val(1);
        $(inputfields[i]).prop("disabled", false);

    }

    passwordstrength();
}