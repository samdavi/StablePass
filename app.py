# Dependencies
from flask import Flask, jsonify, render_template, request, jsonify
from search_that_hash import api
import secrets
import string
import hashlib

# initialize: To Tell Python this is a Flask Application.
app = Flask(__name__)

# Password strength function: To determine the password strength of a given Password. - You must pass a (password) to this function.
def passwordstrength(password):

    Uppercase = 0
    Lowercase = 0
    Symbol = 0
    Number = 0

    for c in password:

        if c in string.ascii_lowercase:  # Count lowercase
            Lowercase = 1

        if c in string.ascii_uppercase:  # Count uppercase
            Uppercase = 1

        if c in string.punctuation:  # Count Symbols
            Symbol = 1

        if c in string.digits:  # Count Numbers
            Number = 1

    # Uppercase, Lowercase, Symbol, Number and Password is or over 15 length
    if Lowercase == 1 and Uppercase == 1 and Symbol == 1 and Number == 1 and len(password) >= 15:
        return("Strong Password")

    # Uppercase, Lowercase, Number or symbol and password is or over 8 length
    elif Lowercase == 1 and Uppercase == 1 and (Symbol == 1 or Number == 1) and len(password) >= 8:
        return("Medium Password")

    # Uppercase or Lowercase, Number or symbol, and password over 8 length
    elif (Lowercase == 1 or Uppercase == 1) and (Symbol == 1 or Number == 1) and len(password) >= 8:
        return("Bad Password")

    else:
        return("Very Bad Password")  # All other combinations


# Search Hash Function: Searching online rainbow tables from given hashes. - You must pass a (List of hashes) to this function.
def SearchthatHash(hashing_hashedvalues):

    SearchthatHash_Results = []
    Hashes = []

    for i in hashing_hashedvalues:
        Hashes.append(i)

    STHResponce = api.return_as_fast_json(Hashes)
    for item in STHResponce:
        for v in item.values():
            SearchthatHash_Results.append(v)

    if len(SearchthatHash_Results) == SearchthatHash_Results.count("Could not crack hash"):
        result = "Uncrackable"
    else:
        result = "crackable"

    return (result)


# Hashing Function: Create Hash values from given password - You must pass a (Password) to this function.
def hashing(password):

    hashing_hashedvalues = []

    # SHA256 Password [0] in list
    hashing_hashedvalues.append(hashlib.sha256(
        password.encode('utf-8')).hexdigest())

    # MD5 Password [1] in list
    hashing_hashedvalues.append(hashlib.md5(
        password.encode('utf-8')).hexdigest())

    # SHA1 Password [2] in list
    hashing_hashedvalues.append(hashlib.sha1(
        password.encode('utf-8')).hexdigest())

    # SHA224 Password [3] in list
    hashing_hashedvalues.append(hashlib.sha224(
        password.encode('utf-8')).hexdigest())

    # SHA384 Password [4] in list
    hashing_hashedvalues.append(hashlib.sha384(
        password.encode('utf-8')).hexdigest())

    # SHA512 Password [5] in list
    hashing_hashedvalues.append(hashlib.sha512(
        password.encode('utf-8')).hexdigest())

    # BLAKE2B Password [6] in list
    hashing_hashedvalues.append(hashlib.blake2b(
        password.encode('utf-8')).hexdigest())

    # blake2s Password [7] in list
    hashing_hashedvalues.append(hashlib.blake2s(
        password.encode('utf-8')).hexdigest())

    # SHA3_224 Password [8] in list
    hashing_hashedvalues.append(hashlib.sha3_224(
        password.encode('utf-8')).hexdigest())

    # SHA3_256 Password [9] in list
    hashing_hashedvalues.append(hashlib.sha256(
        password.encode('utf-8')).hexdigest())

    # SHA3_384 Password [10] in list
    hashing_hashedvalues.append(hashlib.sha384(
        password.encode('utf-8')).hexdigest())

    # SHA3_512 Password [11] in list
    hashing_hashedvalues.append(hashlib.sha3_512(
        password.encode('utf-8')).hexdigest())

    return (hashing_hashedvalues)


# Character Count Function: Counts Characters in Password - You must pass a (Password) to this function.
def CharacterCount(password):

    passwordcharactersorder = []
    passwordcharacters = []
    Password_lowercaseCount = 0
    Password_uppercaseCount = 0
    Password_punctuationCount = 0
    Password_digitsCount = 0

    for c in password:

        if c in string.ascii_lowercase:
            Password_lowercaseCount += 1
            passwordcharactersorder.append("Lowercase")

        if c in string.ascii_uppercase:
            Password_uppercaseCount += 1
            passwordcharactersorder.append("Uppercase")

        if c in string.punctuation:
            Password_punctuationCount += 1
            passwordcharactersorder.append("Symbol")

        if c in string.digits:
            Password_digitsCount += 1
            passwordcharactersorder.append("Number")

    passwordcharacters.append(passwordcharactersorder)
    passwordcharacters.append(Password_lowercaseCount)
    passwordcharacters.append(Password_uppercaseCount)
    passwordcharacters.append(Password_punctuationCount)
    passwordcharacters.append(Password_digitsCount)

    return(passwordcharacters)


# (/) Password Generator: This is the homepage for the application where users can generate passwords.
@app.route("/")
def home():
    return render_template('Home.html')


# (/Process) Password Generator Process: This is used to obtain the inputs from the user and generate a secure password from ((/) Password Generator) page.
@app.route('/process', methods=['POST'])
def process():
    # Get Password Length from webpage
    PasswordLength = int(request.form['PasswordLength'])
    # Get password preferences from webpage
    preferences = request.form.getlist("Passwordpreferences[]")
    PasswordCharactersAmount = request.form.getlist(
        "PasswordCharactersAmount[]")

    # Validation to check if user has submitted variables.
    if PasswordLength >= 8 and preferences:

        passwordCharacters = []  # Initialse Array for Password Characters
        PasswordRequirementScore = 4  # Used to check that password requirements have been met

        # Get User preferences from array

        if 'Lowercase' in preferences:
            passwordCharacters += string.ascii_lowercase

        if 'Uppercase' in preferences:
            passwordCharacters += string.ascii_uppercase

        if 'Symbols' in preferences:
            passwordCharacters += string.punctuation

        if 'Numbers' in preferences:
            passwordCharacters += string.digits

        # Loop for generating password, hash and checking password. Loops if hash can be reversed.
        PasswordUncrackable = False
        while PasswordUncrackable == False:

            # Loop for generating password
            PasswordRequirementsMet = False
            while PasswordRequirementsMet == False:

                passwordGenerated = ''.join(secrets.choice(
                    passwordCharacters) for i in range(PasswordLength))  # Generate Password
                # counting characters in password generated
                CharacterCount(passwordGenerated)

                # Check if password generated contains type of each of those selected by user
                PasswordRequirementCompareScore = 0

                counterforgeneratedloop = 0
                while counterforgeneratedloop < 4:

                    # If the Characters from password generated match the characters select from user
                    if CharacterCount(passwordGenerated)[counterforgeneratedloop+1] >= int(PasswordCharactersAmount[counterforgeneratedloop]):
                        PasswordRequirementCompareScore += 1  # Add one to compare score

                    counterforgeneratedloop += 1

                if PasswordRequirementCompareScore == PasswordRequirementScore:
                    PasswordRequirementsMet = True

            # Hash Lookup Algorithm
            if SearchthatHash(hashing(passwordGenerated)) == "Uncrackable":
                PasswordUncrackable = True

        return jsonify({'password': passwordGenerated,
                        'SHA256Hash': hashing(passwordGenerated)[0],
                        'MD5Hash': hashing(passwordGenerated)[1],
                        'SHA1Hash': hashing(passwordGenerated)[2],
                        'SHA224Hash': hashing(passwordGenerated)[3],
                        'SHA384Hash': hashing(passwordGenerated)[4],
                        'SHA512Hash': hashing(passwordGenerated)[5],
                        'BLAKE2BHash': hashing(passwordGenerated)[6],
                        'BLAKE2SHash': hashing(passwordGenerated)[7],
                        'SHA3_224Hash': hashing(passwordGenerated)[8],
                        'SHA3_256Hash': hashing(passwordGenerated)[9],
                        'SHA3_384Hash': hashing(passwordGenerated)[10],
                        'SHA3_512Hash': hashing(passwordGenerated)[11],
                        'LowercaseCount': CharacterCount(passwordGenerated)[1],
                        'UppercaseCount': CharacterCount(passwordGenerated)[2],
                        'SymbolCount': CharacterCount(passwordGenerated)[3],
                        'NumbersCount': CharacterCount(passwordGenerated)[4],
                        'passwordcharactersorder': CharacterCount(passwordGenerated)[0],
                        'passwordstrength': passwordstrength(passwordGenerated)
                        })
    else:
        return jsonify({'error': 'Nothing Selected'})


# (/check) Check Password: This is the check page for the application where users can check their passwords.
@ app.route("/check")
def Checker():
    return render_template('PasswordCheck.html')


# (/processchecker) Check Password Process: This is used to obtain the inputs from the user and check their password is secure from (/check) page.
@app.route('/processchecker', methods=['POST'])
def processchecker():
    Password = str(request.form['passwordcheckerinput'])

    if Password:

        # Hash Lookup Algorithm
        if SearchthatHash(hashing(Password)) == "Uncrackable":
            return jsonify({'passwordstatus': 'NotCracked',
                            'SHA256Hash': hashing(Password)[0],
                            'MD5Hash': hashing(Password)[1],
                            'SHA1Hash': hashing(Password)[2],
                            'SHA224Hash': hashing(Password)[3],
                            'SHA384Hash': hashing(Password)[4],
                            'SHA512Hash': hashing(Password)[5],
                            'BLAKE2BHash': hashing(Password)[6],
                            'BLAKE2SHash': hashing(Password)[7],
                            'SHA3_224Hash': hashing(Password)[8],
                            'SHA3_256Hash': hashing(Password)[9],
                            'SHA3_384Hash': hashing(Password)[10],
                            'SHA3_512Hash': hashing(Password)[11],
                            'LowercaseCount': CharacterCount(Password)[1],
                            'UppercaseCount': CharacterCount(Password)[2],
                            'SymbolCount': CharacterCount(Password)[3],
                            'NumbersCount': CharacterCount(Password)[4],
                            'passwordcharactersorder': CharacterCount(Password)[0],
                            'passwordstrength': passwordstrength(Password)
                            })
        else:
            return jsonify({'passwordstatus': 'Cracked',
                            'SHA256Hash': hashing(Password)[0],
                            'MD5Hash': hashing(Password)[1],
                            'SHA1Hash': hashing(Password)[2],
                            'SHA224Hash': hashing(Password)[3],
                            'SHA384Hash': hashing(Password)[4],
                            'SHA512Hash': hashing(Password)[5],
                            'BLAKE2BHash': hashing(Password)[6],
                            'BLAKE2SHash': hashing(Password)[7],
                            'SHA3_224Hash': hashing(Password)[8],
                            'SHA3_256Hash': hashing(Password)[9],
                            'SHA3_384Hash': hashing(Password)[10],
                            'SHA3_512Hash': hashing(Password)[11],
                            'LowercaseCount': CharacterCount(Password)[1],
                            'UppercaseCount': CharacterCount(Password)[2],
                            'SymbolCount': CharacterCount(Password)[3],
                            'NumbersCount': CharacterCount(Password)[4],
                            'passwordcharactersorder': CharacterCount(Password)[0],
                            'passwordstrength': passwordstrength(Password)
                            })
    else:
        return jsonify({'error': 'NoPasswordEntered'})


# (/about) About: This is the about page for the application where users can view information about the tool.
@ app.route("/about")
def about():
    return render_template('About.html')


# (/Contact) Contact: This is the contact page for the application where users can view contact information for the tool.
@ app.route("/contact")
def contact():
    return render_template('Contact.html')


# (404) This is the page that users are presented when they follow a link within the site that does not match any route. (CODE 404)
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# Deployment: To tell Flask to run and how to run the application
if __name__ == "__main__":
    app.run()
