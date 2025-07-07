export type VoloAbpHttpRemoteServiceErrorInfo = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  data?: {} | null;
  validationErrors?: Array<VoloAbpHttpRemoteServiceValidationErrorInfo> | null;
};

export type VoloAbpHttpRemoteServiceErrorResponse = {
  error?: VoloAbpHttpRemoteServiceErrorInfo;
};

export type VoloAbpHttpRemoteServiceValidationErrorInfo = {
  message?: string | null;
  members?: Array<string> | null;
};

/**
 * Parses an error response from Volo ABP HTTP remote service
 * Prioritizes: details -> message -> validationErrors
 * @param error The error object to parse
 * @returns A formatted error message string
 */
export function parseVoloAbpError(
  e: VoloAbpHttpRemoteServiceErrorResponse
): string {
  // Check if details exists
  console.log(e);
  const error = e.error;
  if (
    error?.details &&
    typeof error.details === "string" &&
    error?.details.trim() !== ""
  ) {
    return error.details;
  }

  // Check if message exists
  if (
    error?.message &&
    typeof error.message === "string" &&
    error.message.trim() !== ""
  ) {
    return error.message;
  }

  // Check if validationErrors exists and has items
  if (
    error?.validationErrors &&
    Array.isArray(error.validationErrors) &&
    error.validationErrors.length > 0
  ) {
    // Format validation errors
    const validationMessages = error.validationErrors
      .filter((ve) => ve.message)
      .map((ve) => {
        const message = ve.message || "";
        const members =
          ve.members && ve.members.length > 0
            ? ` (${ve.members.join(", ")})`
            : "";
        return `${message}${members}`;
      });

    if (validationMessages.length > 0) {
      return validationMessages.join("\n");
    }
  }

  // If no meaningful error information found
  return "An unknown error occurred";
}
