import { InputOptions, getInput } from '@actions/core';
import type { OptionalInput, RequiredInput } from '../common';

export function getNumberInput(
  name: string,
  options?: RequiredInput & InputOptions,
): number;
export function getNumberInput(
  name: string,
  options?: OptionalInput & InputOptions,
): undefined | number;
export function getNumberInput(
  name: string,
  options?: InputOptions,
): undefined | number {
  const value = getInput(name, options);

  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error('Input was not a number');
  }

  return parsedValue;
}
