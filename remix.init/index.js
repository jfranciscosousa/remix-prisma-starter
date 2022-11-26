/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const inquirer = require("inquirer");

function generateSecretKeyBase() {
  return crypto.randomBytes(64).toString("hex");
}

function buildDatabaseUrl({
  user = "",
  password = "",
  host = "",
  port = "",
  name = "",
}) {
  return `postgresql://${user || ""}:${password || ""}@${host || ""}:${
    port || ""
  }/${name || ""}`;
}

async function main({ rootDirectory }) {
  const answers = await inquirer.prompt([
    { name: "user", message: "What's your database user?" },
    {
      name: "password",
      message: "What's your database password? (Press enter to skip)",
    },
    {
      name: "host",
      message: "What's your database host?",
      default: "localhost",
    },
    {
      name: "port",
      message: "What's your database port?",
      default: "5432",
    },
    { name: "name", message: "What's your database name?" },
    { name: "nameTest", message: "What's your TEST database name?" },
  ]);

  fs.writeFileSync(
    path.join(rootDirectory, ".env"),
    `
export DATABASE_URL=${buildDatabaseUrl(answers)}
export SECRET_KEY_BASE=${generateSecretKeyBase()}
  `
  );

  fs.writeFileSync(
    path.join(rootDirectory, ".env.test"),
    `
export DATABASE_URL=${buildDatabaseUrl({ ...answers, name: answers.nameTest })}
export SECRET_KEY_BASE=${generateSecretKeyBase()}
export PORT=3001
  `
  );
}

module.exports = main;
