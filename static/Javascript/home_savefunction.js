// Bring up Modal
function savemodal(e) {
    $('#checkboxHashingInformation').prop('checked', false);
    $("#savemodal").modal('show');
    gobal_referal_save = e.target.id;
}

//Check if user wants to print or save to txt
function Printortxt() {

    var site = document.getElementById('sitegeneratedfor').value;
    $('#sitegeneratedfor').val("");

    if (site == null || site == undefined || site == "") {
        site = "Undefined";
    }

    if (gobal_referal_save == "saveprintbutton") {

        $("#PrintWindowSite").text(site);
        $("#PrintWindowPassword").text(Global_password);
        $("#PrintWindowPasswordStrength").text(Global_passwordstrength);

        if ($('#checkboxHashingInformation').is(":checked")) {

            AddHashingInformation = []

            for (let i = 0; i < 16; i++) {

                if (i == "0") {
                    AddHashingInformation.push("<br><p><b> -- Hashes -- </b></p>")
                }

                if (i == "12") {
                    AddHashingInformation.push("<br><br><p><b> -- Password Characters -- </b></p>")
                }

                AddHashingInformation.push("<p><b>" + PrintArray[i][0] + "</b><a>" + PrintArray[i][1]) + "</a></p>"
            }

            AddHashingInformation.push("<br><br><p><b> -- Password Layout -- </b></p>")

            for (let i = 0; i < passwordcharactersorderprint.length; i++) {
                AddHashingInformation.push("<p>" + (i + 1) + "." + passwordcharactersorderprint[i] + "</p>")
            }

            $("#Printwindowhashinginformation").html(AddHashingInformation.join(''));
        }

        var Printing = window.open("");
        Printing.document.write(document.getElementById("Printwindow").innerHTML);
        Printing.stop();
        Printing.print();
        Printing.close();
        document.getElementById('Printwindowhashinginformation').innerHTML = "";

    }

    if (gobal_referal_save == "savetxtbutton") {

        filename = site + "_GeneratedPassword.txt";
        filetext = "Label: " + site + "\r\n" + "Password: " + Global_password + "\r\n" + "Password Strength: " + Global_passwordstrength

        if ($('#checkboxHashingInformation').is(":checked")) {
            for (let i = 0; i < 16; i++) {

                if (i == "0") {
                    filetext += "\r\n" + "\r\n" + "-- Hashes --"
                }

                if (i == "12") {
                    filetext += "\r\n" + "\r\n" + "-- Password Characters --"
                }

                filetext += "\r\n" + PrintArray[i][0] + PrintArray[i][1];
            }

            filetext += "\r\n" + "\r\n" + "-- Password Layout --"

            for (let i = 0; i < passwordcharactersorderprint.length; i++) {
                filetext += "\r\n" + (i + 1) + ". " + passwordcharactersorderprint[i];
            }
        }

        var downloadfile = document.createElement('a');
        downloadfile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filetext));
        downloadfile.setAttribute('download', filename);

        downloadfile.style.display = 'none';
        document.body.appendChild(downloadfile);

        downloadfile.click();

        document.body.removeChild(downloadfile);


    }
}