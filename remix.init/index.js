/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const inquirer = require("inquirer");

function generateSecretKeyBase() {
  return crypto.randomBytes(64).toString("hex");
}

async function main({ rootDirectory }) {
  const answers = await inquirer.prompt([
    { name: "databaseUrl", message: "What's your planetscale database url?" },
    { name: "testDatabaseUrl", message: "What's your test database url?" },
  ]);

  fs.writeFileSync(
    path.join(rootDirectory, ".env"),
    `
export DATABASE_URL=${answers.databaseUrl}
export SECRET_KEY_BASE=${generateSecretKeyBase()}
  `
  );

  fs.writeFileSync(
    path.join(rootDirectory, ".env.test"),
    `
export DATABASE_URL=${answers.testDatabaseUrl}
export SECRET_KEY_BASE=${generateSecretKeyBase()}
export PORT=3001
  `
  );
}

module.exports = main;
