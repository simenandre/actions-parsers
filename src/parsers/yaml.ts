import { InputOptions, getInput } from '@actions/core';
import * as yaml from 'js-yaml';
import type { OptionalInput, RequiredInput } from '../common';

export interface GetYAMLInputOptions<T> extends InputOptions {
  parser: (value: unknown) => T;
}

export function getYAMLInput<T>(
  name: string,
  options?: RequiredInput & GetYAMLInputOptions<T>,
): T;
export function getYAMLInput<T>(
  name: string,
  options?: OptionalInput & GetYAMLInputOptions<T>,
): undefined | T;
export function getYAMLInput<T>(
  name: string,
  options?: GetYAMLInputOptions<T>,
): undefined | T {
  const { parser, ...otherOptions } = options || {};
  const value = getInput(name, otherOptions);

  if (!value) {
    return undefined;
  }

  const output = yaml.load(value);

  if (parser) {
    return parser(output);
  }

  return output as T;
}
