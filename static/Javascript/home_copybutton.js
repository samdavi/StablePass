// Let user copy password to clipboard from 'copy' button
function copyFunction() {
    var copy = document.getElementById("PasswordInput");
    copy.select();
    copy.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copy.value);
}