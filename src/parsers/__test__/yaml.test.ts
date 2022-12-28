import dedent from 'dedent';
import * as rt from 'runtypes';
import { getYAMLInput } from '../yaml';

describe('getYAMLInput', () => {
  it('should get a YAML value', () => {
    process.env['INPUT_YAML'] = dedent`
    - key: first-key
      value: first-value
    - key: second-key
      value: second-value
    `;

    const value = getYAMLInput('yaml');
    expect(value).toMatchInlineSnapshot(`
      [
        {
          "key": "first-key",
          "value": "first-value",
        },
        {
          "key": "second-key",
          "value": "second-value",
        },
      ]
    `);
  });

  it('should parse a YAML value', () => {
    process.env['INPUT_YAML'] = dedent`
    firstKey: first-value
    literal: hello-world
    anArrayOfObject:
    - key: second-key
      value: second-value
    `;

    const yamlRt = rt.Record({
      firstKey: rt.String,
      literal: rt.Literal('hello-world'),
      anArrayOfObject: rt.Array(
        rt.Record({
          key: rt.String,
          value: rt.String,
        }),
      ),
    });

    const value = getYAMLInput('yaml', {
      parser: value => yamlRt.check(value),
    });
    expect(value).toMatchInlineSnapshot(`
      {
        "anArrayOfObject": [
          {
            "key": "second-key",
            "value": "second-value",
          },
        ],
        "firstKey": "first-value",
        "literal": "hello-world",
      }
    `);
  });

  it('should fail if the YAML value is not valid', () => {
    process.env['INPUT_YAML'] = dedent`
    firstKey: first-value
    literal: not-correct
    `;

    const yamlRt = rt.Record({
      firstKey: rt.String,
      literal: rt.Literal('hello-world'),
      anArrayOfObject: rt.Array(
        rt.Record({
          key: rt.String,
          value: rt.String,
        }),
      ),
    });

    expect(() =>
      getYAMLInput('yaml', {
        parser: value => yamlRt.check(value),
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Validation failed:
      {
        "literal": "Expected literal \`hello-world\`, but was \`not-correct\`",
        "anArrayOfObject": "Expected { key: string; value: string; }[], but was missing"
      }.
      Object should match { firstKey: string; literal: "hello-world"; anArrayOfObject: { key: string; value: string; }[]; }"
    `);
  });
});
