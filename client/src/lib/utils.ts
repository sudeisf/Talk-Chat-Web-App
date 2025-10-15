import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ParsedError = {
  global?: string[];
  fieldErrors?: Record<string, string[]>;
};

export function parseDjangoError(error: unknown): ParsedError {
  if (!error || typeof error !== 'object') return {};

  if (!('isAxiosError' in error)) return {};

  const axiosError = error as AxiosError<any>;
  const data = axiosError.response?.data;

  const parsed: ParsedError = {
    global: [],
    fieldErrors: {},
  };

  if (!data || typeof data !== 'object') return parsed;

  // Handle non_field_errors or detail
  if (Array.isArray(data.non_field_errors)) {
    parsed.global = data.non_field_errors;
  } else if (typeof data.detail === 'string') {
    parsed.global = [data.detail];
  }

  // Handle field-specific errors
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'non_field_errors' || key === 'detail') return;

    if (Array.isArray(value)) {
      parsed.fieldErrors![key] = value;
    }
  });

  return parsed;
}
