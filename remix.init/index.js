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
    { name: "databaseUrl", message: "What's your postgres database url?" },
    { name: "testDatabaseUrl", message: "What's your test database url?" },
  ]);

  fs.writeFileSync(
    path.join(rootDirectory, ".env"),
    `
NODE_ENV=development
DATABASE_PRISMA_URL=${answers.databaseUrl}
DATABASE_URL_NON_POOLING=${answers.databaseUrl}
SECRET_KEY_BASE=${generateSecretKeyBase()}
SECURE_AUTH_COOKIE=false
  `,
  );

  fs.writeFileSync(
    path.join(rootDirectory, ".env.test"),
    `
NODE_ENV=production
DATABASE_PRISMA_URL=${answers.testDatabaseUrl}
DATABASE_URL_NON_POOLING=${answers.testDatabaseUrl}
SECRET_KEY_BASE=${generateSecretKeyBase()}
SECURE_AUTH_COOKIE=false
PORT=3001
  `,
  );
}

module.exports = main;
