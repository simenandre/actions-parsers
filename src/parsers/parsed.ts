import * as core from '@actions/core';
import type { OptionalInput, RequiredInput } from '../common';

export interface GetParsedInputOptions<T> extends core.InputOptions {
  parser: (value: unknown) => T;
}

export function getParsedInput<T>(
  name: string,
  options?: RequiredInput & GetParsedInputOptions<T>,
): T;
export function getParsedInput<T>(
  name: string,
  options?: OptionalInput & GetParsedInputOptions<T>,
): undefined | T;
export function getParsedInput<T>(
  name: string,
  options?: GetParsedInputOptions<T>,
): T | undefined {
  const { parser, ...otherOptions } = options || {};
  const input = core.getInput(name, otherOptions);

  if (!input) {
    return undefined;
  }

  if (parser) {
    return parser(input);
  }

  return input as T;
}
