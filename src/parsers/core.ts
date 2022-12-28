import * as core from '@actions/core';
import type { OptionalInput, RequiredInput } from '../common';

export function getInput(
  name: string,
  options?: RequiredInput & core.InputOptions,
): string;
export function getInput(
  name: string,
  options?: OptionalInput & core.InputOptions,
): undefined | string;
export function getInput(
  name: string,
  options?: core.InputOptions,
): string | undefined {
  return core.getInput(name, options);
}

export function getMultilineInput(
  name: string,
  options?: RequiredInput & core.InputOptions,
): string[];
export function getMultilineInput(
  name: string,
  options?: OptionalInput & core.InputOptions,
): undefined | string[];
export function getMultilineInput(
  name: string,
  options?: core.InputOptions,
): undefined | string[] {
  return core.getMultilineInput(name, options);
}

export function getBooleanInput(
  name: string,
  options?: RequiredInput & core.InputOptions,
): boolean;
export function getBooleanInput(
  name: string,
  options?: OptionalInput & core.InputOptions,
): undefined | boolean;
export function getBooleanInput(
  name: string,
  options?: core.InputOptions,
): undefined | boolean {
  return core.getBooleanInput(name, options);
}
