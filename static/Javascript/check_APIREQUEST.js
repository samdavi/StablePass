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
        var passwordCheckInput = document.getElementById('PasswordInput_checking').value;

        // HTML to Server
        $.ajax({
            data: {
                passwordCheckInput: passwordCheckInput
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

                $('#PasswordPlaintextValue').text(passwordCheckInput);
                $('#SHA256HashValue').text(data.SHA256);
                $('#MD5HashValue').text(data.MD5);
                $('#SHA1HashValue').text(data.SHA1);
                $('#SHA224HashValue').text(data.SHA224);
                $('#SHA384HashValue').text(data.SHA384);
                $('#SHA512HashValue').text(data.SHA512);
                $('#BLAKE2BHashValue').text(data.BLAKE2B);
                $('#BLAKE2SHashValue').text(data.BLAKE2S);
                $('#SHA3_224HashValue').text(data.SHA3_224);
                $('#SHA3_256HashValue').text(data.SHA3_256);
                $('#SHA3_384HashValue').text(data.SHA3_384);
                $('#SHA3_512HashValue').text(data.SHA3_512);
                $('#LowecaseCharacters').text(data.lowercase_count); 
                $('#UppercaseCharacters').text(data.uppercase_count); 
                $('#SymbolCharacters').text(data.symbol_count); 
                $('#NumberCharacters').text(data.number_count); 
                $('#PasswordStrengthtextValue').text(data.password_strength); 

                AdvancedOptionsPasswordStrengthChange();

                let passwordcharactersorderlocal = [];
                let passwordcharactersorderprint = data.character_order; 

                data.character_order.forEach(function(element) {
                    passwordcharactersorderlocal.push("<li>" + element + "</li>");
                });

                $("#passwordorderedlist").html(passwordcharactersorderlocal.join(''));

                if (data.password_status == "Cracked") { 
                    $("#PasswordCheckerStatus").addClass("badpassword");
                    $("#PasswordCheckerStatus").text("The hash of ' " + passwordCheckInput + " ' can be reversed to plaintext online and is not safe to use.");
                    GeneratePasswordPrompt.classList.remove("hidden");
                } else {
                    $("#PasswordCheckerStatus").addClass("goodpassword");
                    $("#PasswordCheckerStatus").text("The hash of ' " + passwordCheckInput + " ' cannot be reversed to plaintext online and is safe to use.");
                }
            }
        });
        event.preventDefault();
    });
});