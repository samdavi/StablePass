$(document).ready(function() {
    $("form").on("submit", function(event) {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        $("#PasswordStrengthtextValue").removeClass();
        $('#PasswordInput').val("");
        $("#savetxtbutton").addClass("hidden");
        $("#saveprintbutton").addClass("hidden");
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

        $("#HolderforAlert").slideDown();

        // Initialize and put checkbox values into list
        var passwordPreferences = [];
        $.each($("input[name='preferences']:checked"), function() {
            passwordPreferences.push($(this).val());
        });

        // Slider Value into list
        var passwordLength = $('#slider').val();

        // Password Characters
        const inputfields = ['#ButtonLowercaseValue', '#ButtonUppercaseValue', '#ButtonSymbolsValue', '#ButtonNumbersValue'];
        passwordCharactersAmount = [];

        for (let i = 0; i < inputfields.length; i++) {
            passwordCharactersAmount.push($(inputfields[i]).val());
        }

        // HTML to Server
        $.ajax({
            data: {
                passwordPreferences: passwordPreferences,
                passwordLength: passwordLength,
                passwordCharactersAmount: passwordCharactersAmount
            },
            type: 'POST',
            url: '/process'
        })
        // Server to HTML
        .done(function(data) {

            if (data.error) {
                $("#HolderforAlert").hide();
                $("#error").modal('show');
            } else {

                $("#savetxtbutton").removeClass("hidden");
                $("#saveprintbutton").removeClass("hidden");

                Global_password = data.password; 
                Global_passwordstrength = data.password_strength; 

                $("#HolderforAlert").slideUp();
                $('#placeholderforgenerator').hide();

                PrintArray = [
                    ["SHA256 Hash: ", data.SHA256],
                    ["MD5 Hash: ", data.MD5],
                    ["SHA1 Hash: ", data.SHA1],
                    ["SHA224 Hash: ", data.SHA224],
                    ["SHA384 Hash: ", data.SHA384],
                    ["SHA512 Hash: ", data.SHA512],
                    ["BLAKE2S Hash: ", data.BLAKE2S],
                    ["BLAKE2B Hash: ", data.BLAKE2B],
                    ["SHA3_224 Hash: ", data.SHA3_224],
                    ["SHA3_256 Hash: ", data.SHA3_256],
                    ["SHA3_384 Hash: ", data.SHA3_384],
                    ["SHA3_512 Hash: ", data.SHA3_512],
                    ["Lowercase Characters: ", data.lowercase_count],
                    ["Uppercase Characters: ", data.uppercase_count],
                    ["Symbol Characters: ", data.symbol_count],
                    ["Number Characters: ", data.number_count]
                ];

                $('#PasswordInput').val(data.password);
                $('#SHA256HashValue').text(data.SHA256); 
                $('#PasswordPlaintextValue').text(data.password);
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
                passwordcharactersorderprint = data.character_details; 

                passwordcharactersorderprint.forEach(function(element) {
                    passwordcharactersorderlocal.push("<li>" + element + "</li>");
                });

                $("#passwordorderedlist").html(passwordcharactersorderlocal.join(''));
            }
        });

        event.preventDefault();
    });
});
