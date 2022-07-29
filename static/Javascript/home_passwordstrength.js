function passwordstrength() {

    $("#PasswordStrengthGenerate").removeClass();
    $("#PasswordStrengthGenerate").addClass("inlineblock");

    var slidervalue = document.getElementById("slider").value;

    var lowercase = $('#CheckboxButtonLowercase').is(':checked');
    var uppercase = $('#CheckboxButtonUppercase').is(':checked');
    var symbols = $('#CheckboxButtonSymbols').is(':checked');
    var numbers = $('#CheckboxButtonNumbers').is(':checked');

    if (lowercase == true && uppercase == true && symbols == true && numbers == true && slidervalue >= 15) {
        $('#PasswordStrengthGenerate').text("Strong Password");
        $('#PasswordStrengthGenerate').addClass('password_strong');
    } else if (lowercase == true && uppercase == true && (symbols == true || numbers == true) && slidervalue >= 8) {
        $('#PasswordStrengthGenerate').text("Medium Password");
        $('#PasswordStrengthGenerate').addClass('password_medium');
    } else if ((lowercase == true || uppercase == true) && (symbols == true || numbers == true) && slidervalue >= 8) {
        $('#PasswordStrengthGenerate').text("Bad Password");
        $('#PasswordStrengthGenerate').addClass('password_badpassword');
    } else {
        $('#PasswordStrengthGenerate').text("Very Bad Password");
        $('#PasswordStrengthGenerate').addClass('password_verybadpassword');
    }

}