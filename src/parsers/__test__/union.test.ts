import { getUnionInput } from '../union';

describe('union', () => {
  it('should return the union value when applied', () => {
    process.env['INPUT_UNION'] = 'the-value';

    const value = getUnionInput('union', {
      alternatives: ['the-value'] as const,
    });

    expect(value).toBe('the-value');
  });

  it('should throw if the union value is not in the alternatives', () => {
    process.env['INPUT_NAME'] = 'the-value';

    expect(() =>
      getUnionInput('name', {
        alternatives: ['another-value'] as const,
      }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"Input was not correct for name. Valid alternatives are: another-value"',
    );
  });

  it('should return undefined when empty, and not required', () => {
    process.env['INPUT_NAME'] = '';

    const value = getUnionInput('name', {
      alternatives: ['the-value'] as const,
      required: false,
    });

    expect(value).toBe(undefined);
  });
});
