import { getNumberInput } from '../number';

describe('number', () => {
  it('should parse a number', () => {
    process.env['INPUT_NUMBER'] = '123';

    const value = getNumberInput('number', {});

    expect(value).toBe(123);
  });
});
