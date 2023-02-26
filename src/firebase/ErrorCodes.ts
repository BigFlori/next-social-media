const errorMessages: Record<string, string> = {
  ["auth/user-not-found"]: "User not found with given email address.",
  ["auth/invalid-email"]: "Email address is invalid.",
  ["auth/internal-error"]: "Internal server error",
  ["auth/email-already-exists"]:
    "An account with this email address already exists.",
  ["auth/invalid-password"]: "Password is invalid.",
};

export function getErrorMessage(errorCode: string): string {
  return errorMessages[errorCode];
}
