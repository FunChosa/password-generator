# password-generator

This React application, built with Vite, lets users generate strong, customizable passwords by selecting character types and specifying the desired length.

## Project Setup

1. **Clone the repository:** `git clone https://github.com/FunChosa/qr-code-generator.git`
2. **Navigate to the project directory:** `cd password-generator`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm run dev`

## Features

* **Character Type Selection:** Checkboxes allow users to select uppercase letters, lowercase letters, numbers, and symbols.
* **Password Length:** A slider controls the password length (8-40 characters).
* **Password Generation:**  Clicking "Generate Password" or changing the password length generates a new password.
* **Password Display:** The generated password is displayed in a text field.
* **Copy to Clipboard:** A button copies the generated password to the clipboard.


## Technology Stack

* React: ^18.3.1
* Vite: ^5.4.10
* react-toastify: ^10.0.6
* CSS


## State Management

The application's state (character type selections, password length, generated password) is managed using the `useState` hook.


## Password Generation Algorithm

The password generator ensures a minimum length of 8 and a maximum of 40 characters.  It first adds at least one character from each selected category. The remaining characters are then randomly distributed among the selected categories. This guarantees at least one character of each selected type.

## Deployment

Deployed on Netlify: https://funchosa-password-generator.netlify.app


## Future Enhancements

* Improve the visual design and user interface.
* Add a password strength indicator.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

