export const errorCodeToMsg = errorCode => {
  switch (errorCode) {
    case "EMAIL_EXISTS":
      return "The email address is already in use by another account.";
    case "OPERATION_NOT_ALLOWED":
      return "Password sign-in is disabled.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "We have blocked all requests from this device due to unusual activity. Try again later.";
    case "EMAIL_NOT_FOUND":
      return "There is no user record corresponding to this email.";
    case "INVALID_PASSWORD":
      return "The password is invalid.";
    case "INVALID_EMAIL":
      return "The email you entered is invalid.";
    case "MISSING_PASSWORD":
      return "Enter a password.";
    case "WEAK_PASSWORD : Password should be at least 6 characters":
      return "Password should be at least 6 characters";
    case "USER_DISABLED":
      return "The user account has been disabled. Contact us for more information.";
    default:
      return errorCode;
  }
};
