import { InputOptions, getInput } from '@actions/core';
import type { OptionalInput, RequiredInput } from '../common';

export interface GetUnionOptions<T> extends InputOptions {
  alternatives: readonly T[];
}

export function getUnionInput<T>(
  name: string,
  options: RequiredInput & GetUnionOptions<T>,
): T;
export function getUnionInput<T>(
  name: string,
  options: OptionalInput & GetUnionOptions<T>,
): undefined | T;
export function getUnionInput<T>(
  name: string,
  options: GetUnionOptions<T>,
): undefined | T {
  const { alternatives, ...otherOptions } = options;

  const value = getInput(name, otherOptions) as T;

  if (!value) {
    return undefined;
  }

  if (alternatives.includes(value)) {
    return value as T;
  }

  throw new Error(
    `Input was not correct for ${name}. Valid alternatives are: ${alternatives.join(
      ', ',
    )}`,
  );
}
