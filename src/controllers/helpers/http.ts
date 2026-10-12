import { ZodError } from "zod";
import { DefaultError } from "@/errors";

interface HttpResponseFormat<T = unknown> {
  statusCode: number;
  body: T;
}

export function httpCreateResponse<T = unknown>(
  statusCode: number,
  body: T,
): HttpResponseFormat<T> {
  return {
    statusCode,
    body,
  };
}

export function okResponse<T = unknown>(body: T) {
  return httpCreateResponse(200, body);
}

export function createdResponse<T = unknown>(body: T) {
  return httpCreateResponse(201, body);
}

export function httpErrorResponse(error: unknown): HttpResponseFormat {
  if (error instanceof ZodError) {
    return httpCreateResponse(400, {
      message: error.issues[0].message,
    });
  }

  if (error instanceof DefaultError) {
    return httpCreateResponse(error.statusCode, {
      message: error.message,
    });
  }

  return httpCreateResponse(500, { message: "Internal server error" });
}
