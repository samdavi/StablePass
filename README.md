# StablePass
StablePass is a powerful tool which lets you generates secure and random passwords designed to withstand common cyberattacks. Each password generated by StablePass is specifically checked against popular online rainbow tables, ensuring that it cannot be easily reversed to plaintext through common, fast-cracking methods. 

You may also check your own password to ensure that it cannot reversed quickly using popular online rainbow table.

## How StablePass Protects you

When using StablePass, users receive only passwords that have successfully passed rainbow table security checks. This process works as follows:

- **Password Generation**: Users customize the password properties, such as length and character mix.

- **Hashing and Rainbow Table Comparison**: The password is hashed (MD5 and SHA-256) and checked against a network of 20 online rainbow tables to confirm it has not been cracked before.

- **Secure Delivery**: Only passwords that **cannot be cracked** by popular rainbow tables are delivered to the user, significantly increasing protection against automated attacks.

This approach makes StablePass-generated passwords far less vulnerable to quick, precomputed attacks based on known password hashes, giving users confidence that their passwords are both unique and secure.

## Features

- **Rainbow Table Resistance**: Ensures generated passwords are not vulnerable to rainbow table attacks.

- **Strong Passwords Generation**: Ensure the recommended password following OWASP standards 

- **Simple and Advanced Options**: Create passwords with basic or advanced settings tailored to specific security needs.

- **User Anonymity**: No personal data collection, logging, or processing of any user information.

- **Free and Open Access**: Completely free to use with no subscription fees.

## Requirements
- Any modern web browser with HTML5 support.

## Acknowledgments
- StablePass is built on **S-T-H (Search That Hash)**, an open-source project for secure hash searching and rainbow table resistance.

- Inspired by various cybersecurity experts’ best practices for password generation and storage.

## Contributing
We welcome contributions! Feel free to fork this repository, submit pull requests, or open issues.

