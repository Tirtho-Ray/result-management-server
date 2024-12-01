import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericError } from "./interface/err";

export const handleZodError = (err: ZodError): TGenericError => {
  const statusCode = 400;

  // Map Zod issues to TErrorSource
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1]?.toString() || '',
    message: issue.message,
  }));

  // Construct TGenericError object
  const genericError: TGenericError = {
    statusCode,
    message: 'Validation error',
    errorSources,
  };

  return genericError;
};
