# Dependencies
from flask import Flask, jsonify, render_template, request
from search_that_hash import api
import secrets
import string
import hashlib

# Initialize Flask application
app = Flask(__name__)

# Determine the strength of a given password
def assess_password_strength(password):
    criteria = {
        'has_lowercase': any(c.islower() for c in password),
        'has_uppercase': any(c.isupper() for c in password),
        'has_symbol': any(c in string.punctuation for c in password),
        'has_number': any(c.isdigit() for c in password),
        'sufficient_length': len(password) >= 15
    }

    if all(criteria.values()):
        return "Strong Password"
    elif criteria['has_lowercase'] and criteria['has_uppercase'] and (criteria['has_symbol'] or criteria['has_number']) and len(password) >= 8:
        return "Medium Password"
    elif (criteria['has_lowercase'] or criteria['has_uppercase']) and (criteria['has_symbol'] or criteria['has_number']) and len(password) >= 8:
        return "Weak Password"
    else:
        return "Very Weak Password"

# Search online rainbow tables for given hashes
def search_hash_availability(hashing_hashed_values):
    response = api.return_as_fast_json(hashing_hashed_values)
    results = [value for item in response for value in item.values()]

    return "Uncrackable" if results.count("Could not crack hash") == len(results) else "Crackable"

# Generate hashes for a given password using various algorithms
def generate_hashes(password):
    hashing_algorithms = [
        hashlib.sha256, hashlib.md5, hashlib.sha1, hashlib.sha224, hashlib.sha384, hashlib.sha512,
        hashlib.blake2b, hashlib.blake2s, hashlib.sha3_224, hashlib.sha3_256, hashlib.sha3_384, hashlib.sha3_512
    ]

    return [algorithm(password.encode('utf-8')).hexdigest() for algorithm in hashing_algorithms]

# Count character types in a password
def count_characters(password):
    character_details = []
    
    for c in password:
        if c.islower():
            character_details.append(f"('{c}') Lowercase")
        elif c.isupper():
            character_details.append(f"('{c}') Uppercase")
        elif c.isdigit():
            character_details.append(f"('{c}') Number")
        elif c in string.punctuation:
            character_details.append(f"('{c}') Symbol")
        else:
            character_details.append(f"('{c}') Unknown")  # Handle any unexpected characters
    
    return {
        'lowercase_count': sum(c.islower() for c in password),
        'uppercase_count': sum(c.isupper() for c in password),
        'symbol_count': sum(c in string.punctuation for c in password),
        'number_count': sum(c.isdigit() for c in password),
        'character_details': character_details  # New entry for character details
    }

# Home page route
@app.route("/")
def home_page():
    return render_template('Home.html')

# Generate a secure password based on user specifications
@app.route('/process', methods=['POST'])
def process_password_generation_api():
    password_length = int(request.form['passwordLength'])
    preferences = request.form.getlist("passwordPreferences[]")
    char_amounts = request.form.getlist("passwordCharactersAmount[]")

    if password_length >= 8 and preferences:
        selected_chars = ''.join({
            'Lowercase': string.ascii_lowercase,
            'Uppercase': string.ascii_uppercase,
            'Symbols': string.punctuation,
            'Numbers': string.digits
        }[pref] for pref in preferences)

        is_secure_password = False
        while not is_secure_password:
            generated_password = ''.join(secrets.choice(selected_chars) for _ in range(password_length))
            character_counts = count_characters(generated_password)

            meets_requirements = all(
                character_counts[count_name] >= int(char_amounts[i])
                for i, count_name in enumerate(['lowercase_count', 'uppercase_count', 'symbol_count', 'number_count'])
                if i < len(char_amounts)
            )

            if meets_requirements and search_hash_availability(generate_hashes(generated_password)) == "Uncrackable":
                is_secure_password = True

        return jsonify({
            'password': generated_password,
            **{name: generate_hashes(generated_password)[i] for i, name in enumerate([
                'SHA256', 'MD5', 'SHA1', 'SHA224', 'SHA384', 'SHA512', 'BLAKE2B', 'BLAKE2S',
                'SHA3_224', 'SHA3_256', 'SHA3_384', 'SHA3_512'
            ])},
            **count_characters(generated_password),
            'password_strength': assess_password_strength(generated_password)
        })
    else:
        return jsonify({'error': 'Invalid Input'})

# Password checker page route
@app.route("/check")
def password_checker_page():
    return render_template('PasswordCheck.html')

# Process password check request
@app.route('/processchecker', methods=['POST'])
def check_password_api():
    password = request.form.get('passwordCheckInput', '').strip()

    if not password:
        return jsonify({'error': 'NoPasswordEntered'})

    hashed_passwords = generate_hashes(password)
    character_counts = count_characters(password)

    return jsonify({
        'password_strength': assess_password_strength(password),
        **{name: hashed_passwords[i] for i, name in enumerate([
            'SHA256', 'MD5', 'SHA1', 'SHA224', 'SHA384', 'SHA512', 'BLAKE2B', 'BLAKE2S',
            'SHA3_224', 'SHA3_256', 'SHA3_384', 'SHA3_512'
        ])},
        **character_counts,
        'password_status': 'NotCracked' if search_hash_availability(hashed_passwords) == "Uncrackable" else 'Cracked'
    })

# About page route
@app.route("/about")
def about_page():
    return render_template('About.html')

# Contact page route
@app.route("/contact")
def contact_page():
    return render_template('Contact.html')

# 404 error handler
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

# Run the application
if __name__ == "__main__":
    app.run(debug=True)