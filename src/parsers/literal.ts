import { InputOptions, getInput } from '@actions/core';
import type { OptionalInput, RequiredInput } from '../common';

export interface GetLiteralOptions<T> extends InputOptions {
  requiredValue: T;
}

export function getLiteralInput<T>(
  name: string,
  options: RequiredInput & GetLiteralOptions<T>,
): T;
export function getLiteralInput<T>(
  name: string,
  options: OptionalInput & GetLiteralOptions<T>,
): undefined | T;
export function getLiteralInput<T>(
  name: string,
  options: GetLiteralOptions<T>,
): undefined | T {
  const { requiredValue, ...otherOptions } = options;

  const value = getInput(name, otherOptions) as T;

  if (!value) {
    return undefined;
  }

  if (value === requiredValue) {
    return value as T;
  }

  throw new Error(
    `Input was not correct for ${name}. Must be ${requiredValue}`,
  );
}
