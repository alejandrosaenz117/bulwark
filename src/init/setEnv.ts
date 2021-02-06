const dotenv = require('dotenv').config();
const fs = require('fs');
import * as path from 'path';
const { writeFile } = require('fs');

if (process.env.SERVER_ADDRESS && process.env.PORT) {
  let targetPath: string;
  let isProduction: boolean;
  const apiUrl = `${process.env.SERVER_ADDRESS}:${process.env.PORT}/api`;

  if (process.env.NODE_ENV === 'production') {
    isProduction = true;
    targetPath = path.join(
      __dirname,
      '../../frontend/src/environments/environment.prod.ts'
    );
  } else {
    isProduction = false;
    targetPath = path.join(
      __dirname,
      '../../frontend/src/environments/environment.dev.ts'
    );
  }

  // we have access to our environment variables
  // in the process.env object thanks to dotenv
  const environmentFileContent = `
          export const environment = {
             production: ${isProduction},
             apiUrl: "${apiUrl}",
          };
          `;

  // write the content to the respective file
  writeFile(targetPath, environmentFileContent, (err) => {
    if (err) {
      console.error(err);
    }
    // tslint:disable-next-line: no-console
    console.info(
      `Angular environment has been updated to ${environmentFileContent} located at ${targetPath}`
    );
    return;
  });
} else {
  // tslint:disable-next-line: no-console
  console.info(
    'Environment variables do not exist.  Skipping `npm run confg` step!'
  );
}
