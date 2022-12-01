import { ApplicationError } from "@/protocols";

export function forbiddenError(): ApplicationError {
  return {
    name: "forbiddenError",
    message: "server understands the request but refuses to authorize it",
  };
}
