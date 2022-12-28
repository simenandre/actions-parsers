import type { InputOptions } from '@actions/core';

export interface RequiredInput extends InputOptions {
  required?: true;
}

export interface OptionalInput extends InputOptions {
  required?: false;
}
