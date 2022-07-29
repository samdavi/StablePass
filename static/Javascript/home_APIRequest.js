$(document).ready(function() {
    $("form").on("submit", function(event) {

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

        // Initialse and Put Checkbox values into list
        var _Passwordpreferences = [];
        $.each($("input[name='preferences']:checked"), function() {
            _Passwordpreferences.push($(this).val());
        });
        // Slider Value into list
        var _PasswordLength = $('#slider').val();

        // Password Characters
        const inputfields = ['#ButtonLowercaseValue', '#ButtonUppercaseValue', '#ButtonSymbolsValue', '#ButtonNumbersValue']
        _passwordcharactersAmount = []

        for (let i = 0; i < inputfields.length; i++) {
            _passwordcharactersAmount.push($(inputfields[i]).val());
        }

        // HTML to Server
        $.ajax({
                data: {
                    Passwordpreferences: _Passwordpreferences,
                    PasswordLength: _PasswordLength,
                    PasswordCharactersAmount: _passwordcharactersAmount
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

                    Global_password = data.password
                    Global_passwordstrength = data.passwordstrength

                    PrintArray = [
                        ["SHA256 Hash: ", data.SHA256Hash],
                        ["MD5 Hash: ", data.MD5Hash],
                        ["SHA1 Hash: ", data.SHA1Hash],
                        ["SHA224 Hash: ", data.SHA224Hash],
                        ["SHA384 Hash: ", data.SHA384Hash],
                        ["SHA512 Hash: ", data.SHA512Hash],
                        ["BLAKE2S Hash: ", data.BLAKE2SHash],
                        ["BLAKE2B Hash: ", data.BLAKE2BHash],
                        ["SHA3_224 Hash: ", data.SHA3_224Hash],
                        ["SHA3_256 Hash: ", data.SHA3_256Hash],
                        ["SHA3_384 Hash: ", data.SHA3_384Hash],
                        ["SHA3_512 Hash: ", data.SHA3_512Hash],
                        ["Lowercase Characters: ", data.LowercaseCount],
                        ["Uppercase Characters: ", data.UppercaseCount],
                        ["Symbol Characters: ", data.SymbolCount],
                        ["Number Characters: ", data.NumbersCount]
                    ]

                    $("#HolderforAlert").slideUp();
                    $('#placeholderforgenerator').hide();

                    $('#PasswordInput').val(data.password);
                    $('#SHA256HashValue').text(data.SHA256Hash);
                    $('#PasswordPlaintextValue').text(data.password);
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

                }
            });

        event.preventDefault();

    });
});