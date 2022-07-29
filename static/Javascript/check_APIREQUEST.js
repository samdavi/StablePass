$(document).ready(function() {
    $("form").on("submit", function(event) {

        $("#PasswordStrengthtextValue").removeClass();
        $('#PasswordCheckerStatus').removeClass();
        $('#PasswordCheckerStatus').text('');
        $('#placeholderforgenerator').show();

        $("#passwordorderedlist").empty();
        $('#PasswordPlaintextValue').text("-");
        $('#LowecaseCharacters').text("-");
        $('#UppercaseCharacters').text("-");
        $('#SymbolCharacters').text("-");
        $('#NumberCharacters').text("-");
        $('#SHA256HashValue').text("-");
        $('#MD5HashValue').text("-");
        $('#SHA1HashValue').text('-');
        $('#SHA224HashValue').text('-');
        $('#SHA384HashValue').text('-');
        $('#SHA512HashValue').text('-');
        $('#BLAKE2BHashValue').text('-');
        $('#BLAKE2SHashValue').text('-');
        $('#SHA3_224HashValue').text('-');
        $('#SHA3_256HashValue').text('-');
        $('#SHA3_384HashValue').text('-');
        $('#SHA3_512HashValue').text('-');
        $('#PasswordStrengthtextValue').text('-');


        GeneratePasswordPrompt = document.getElementById("CheckPasswords");

        GeneratePasswordPrompt.classList.add("hidden");
        $("#HolderforAlert_checking").slideDown();

        // PasswordCheckingInput
        var _password = document.getElementById('PasswordInput_checking').value;

        // HTML to Server
        $.ajax({
                data: {
                    passwordcheckerinput: _password
                },
                type: 'POST',
                url: '/processchecker'
            })

            // Server to HTML
            .done(function(data) {

                if (data.error) {
                    $("#HolderforAlert_checking").hide();
                    $("#modalCenter").modal('show');
                } else {

                    $("#HolderforAlert_checking").slideUp();

                    $('#placeholderforgenerator').hide();

                    $('#PasswordPlaintextValue').text(_password);
                    $('#SHA256HashValue').text(data.SHA256Hash);
                    $('#MD5HashValue').text(data.MD5Hash);
                    $('#SHA1HashValue').text(data.SHA1Hash);
                    $('#SHA224HashValue').text(data.SHA224Hash);
                    $('#SHA384HashValue').text(data.SHA384Hash);
                    $('#SHA512HashValue').text(data.SHA512Hash);
                    $('#BLAKE2BHashValue').text(data.BLAKE2BHash);
                    $('#BLAKE2SHashValue').text(data.BLAKE2SHash);
                    $('#SHA3_224HashValue').text(data.SHA3_224Hash);
                    $('#SHA3_256HashValue').text(data.SHA3_256Hash);
                    $('#SHA3_384HashValue').text(data.SHA3_384Hash);
                    $('#SHA3_512HashValue').text(data.SHA3_512Hash);
                    $('#LowecaseCharacters').text(data.LowercaseCount);
                    $('#UppercaseCharacters').text(data.UppercaseCount);
                    $('#SymbolCharacters').text(data.SymbolCount);
                    $('#NumberCharacters').text(data.NumbersCount);
                    $('#PasswordStrengthtextValue').text(data.passwordstrength);

                    AdvancedOptionsPasswordStrengthChange();

                    passwordcharactersorderlocal = [];
                    passwordcharactersorderprint = data.passwordcharactersorder

                    data.passwordcharactersorder.forEach(function(element) {
                        passwordcharactersorderlocal.push("<li>" + element + "</li>");
                    });

                    $("#passwordorderedlist").html(passwordcharactersorderlocal.join(''));

                    if (data.passwordstatus == "Cracked") {

                        $("#PasswordCheckerStatus").addClass("badpassword");
                        $("#PasswordCheckerStatus").text("' " + _password + " '" + " has been leaked online and is not safe to use.");
                        GeneratePasswordPrompt.classList.remove("hidden");
                    } else {
                        $("#PasswordCheckerStatus").addClass("goodpassword");
                        $("#PasswordCheckerStatus").text("'" + _password + "'" + " has not been leaked online and is safe to use.");
                    }
                }
            });
        event.preventDefault()
    });
});