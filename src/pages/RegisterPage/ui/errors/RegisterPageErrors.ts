export enum Error {
    emptyEmailInput = "Email address is required.",
    wrongEmail = "This is not valid email format.",
    alreadyRegistered = "The email is already registered.",
    emailNotRegistered = "Email address is not registered",
    emptyPasswordInput = "Password is required.",
    shortPassword = "Password must be at least 6 characters long."
}

export const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;