export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export function getFriendlyErrorMessage(status: number, fallback = "Something went wrong.") {
  switch (status) {
    case 400:
      return "The request could not be processed. Please check your input and try again.";
    case 401:
      return "Your session expired. Please log in again.";
    case 403:
      return "You do not have access to this action.";
    case 404:
      return "The requested item was not found.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "The server is having trouble. Please try again shortly.";
    default:
      return fallback;
  }
}
