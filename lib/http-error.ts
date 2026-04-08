import axios from "axios";

/**
 * Extracts a user-visible message from axios and other thrown values.
 */
export function getHttpErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === "object" && "message" in data) {
      const msg = (data as { message: unknown }).message;
      if (typeof msg === "string") {
        return msg;
      }
    }
    if (typeof data === "string" && data.length > 0) {
      return data;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
}
