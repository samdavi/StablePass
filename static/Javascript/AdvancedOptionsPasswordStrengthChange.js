function AdvancedOptionsPasswordStrengthChange() {

    var value = $('#PasswordStrengthtextValue').text();

    if (value == "Strong Password") {
        $('#PasswordStrengthtextValue').addClass('password_strong')
    } else if (value == "Medium Password") {
        $('#PasswordStrengthtextValue').addClass('password_medium')
    } else if (value == "Bad Password") {
        $('#PasswordStrengthtextValue').addClass('password_badpassword')
    } else {
        $('#PasswordStrengthtextValue').addClass('password_verybadpassword ')
    }

}