// Hidden checkbox to sync with buttons.
function buttonoptions(e) {

    try {

        var elementid = e.target.id;
        var element = document.getElementById(elementid);
        var CustomValueBox = elementid + "Value";

        if (element.classList.contains("UnpressedButton")) {
            document.getElementById("Checkbox" + elementid).checked = true;
            element.classList.remove("UnpressedButton");
            element.classList.add("Pressedbutton");
            document.getElementById(CustomValueBox).disabled = false;
            $('#' + CustomValueBox).val(1);

        } else {
            document.getElementById("Checkbox" + elementid).checked = false;
            element.classList.remove("Pressedbutton");
            element.classList.add("UnpressedButton");
            document.getElementById(CustomValueBox).disabled = true;
            $('#' + CustomValueBox).val(0);
        }

        passwordstrength();
    } catch (err) {};

}