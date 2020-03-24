
/* eslint-disable func-names, no-void, max-len */
import * as util from 'util';
import * as fs from 'fs-extra';
import glob from 'glob';
import * as childProcess from 'child_process';
import eslintrc from '../.eslintrc.json';

const exec = util.promisify(childProcess.exec);

void (async function () {
  // Apollo codegen of all gql objects
  await exec('./node_modules/.bin/apollo client:download-schema --endpoint=http://localhost:4000/graphql && ./node_modules/.bin/apollo codegen:generate --excludes=\'**/{ApolloClient/index,*.test,*.stories}.{ts,tsx}\' --includes=\'src/**/*.{tsx,ts}\' --localSchemaFile=schema.json --target typescript __generated__');

  // Gets schema
  await exec('yarn graphql get-schema generic.api.name --output ./__generated__/schema.graphql');

  // Create typedefs of from the schema
  const schema = await fs.readFile('./__generated__/schema.graphql', 'utf-8');
  await fs.writeFile('./__generated__/typeDefs.ts', `
    export default \`
      ${schema.replace(/`/g, '\\`')}
    \`
  `);

  glob('src/**/__generated__/*', null, (err, files) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(0);
    }

    const camelCases = (files as string[]).reduce((acc, file) => {
      // Read file
      const content = fs.readFileSync(file, 'utf8');
      // Find all 'export interface VARIABLE {' and get the variable names
      const matches = content.match(/export interface (.*?) {/g).map((c) => c.replace(/export interface | {/g, ''));
      return acc.concat(matches);
    }, []);

    // Replace the camelcase allow rule with the new camelCases
    (eslintrc.rules.camelcase[1] as any).allow = camelCases;

    // Write .eslintrc.json back
    fs.writeFileSync('.eslintrc.json', JSON.stringify(eslintrc, null, 2));

    process.exit(0);
  });
}());
