# Github Action Parsers

This library tries to improve building actions for Github Actions using
Typescript. It might be a bit opinionated, but I feel it's important to make
sure inputs are validated and type-safe.

There are some ease-of-life added features here:

- Input functions that can easily be tied with Runtypes / Zod.
- Parser for union, number and literal inputs
- Parser for YAML

Another big thing is that this package re-exports all input-related functions in
`@actions/core` with improved types.

To learn more, check out this issue:
https://github.com/actions/toolkit/issues/1290

## Quickstart

```shell
yarn add actions-parsers @actions/core
```

## Example

```typescript
import * as parsers from 'actions-parsers';

export const config = {

  /**
   * Functions from `@actions/core`:
   **/

  simpleString: parsers.getInput('simple-string'),
  // 👆 Type is string or undefined

  simpleRequiredString: parsers.getInput('simple-required-string', { required: true }),
  // 👆 Type is string or undefined

  multilineString: parsers.getMultilineInput('multiline', { required: true }).
  // 👆 Type is string[]

  aNumericValue: parsers.getNumber('a-numeric-value'),
  // 👆 Type is number or undefined.

  type: parsers.getUnion('type', { alternatives: ['one', 'two'] as const }),
  // 👆 Type is "one" | "two" | undefined

  literal: parsers.getLiteral('literal', { requiredValue: 'hello-world' }),
  // 👆 Type is "hello-world" | undefined
}
```

If combined with Runtypes, Zod or any other runtime validation for static types
can get parsed type-safe YAML, for example like this:

```typescript
import { getYAMLInput } from 'actions-parsers';
import * as rt from 'runtypes';

const inputFieldRt = rt.Record({
  firstKey: rt.String,
  literal: rt.Literal('hello-world'),
  anArrayOfObject: rt.Array(
    rt.Record({
      key: rt.String,
      value: rt.String,
    }),
  ),
});

export const yamlValue = getYAMLInput('input-field', {
  parser: value => inputFieldRt.check(value),
});
```

This is also possible to do the same with `getParsedInput`, like this:

```typescript
import { getParsedInput } from 'actions-parsers';
import { z } from 'zod';

const aDateFieldZod = z
  .date()
  .min(new Date('1900-01-01'), { message: 'Too old' })
  .max(new Date(), { message: 'Too young!' });

export const aDateField = getParsedInput('a-field', {
  parser: value => aDateFieldZod.parse(value),
});
```
