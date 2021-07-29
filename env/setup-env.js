/* eslint-disable no-console */
/* eslint-disable no-process-env */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */

const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { execSync } = require('child_process');

const getFullPath = file => `${__dirname}/${file}`;

const envFile = process.env.ENVFILE || '.env.development.local';

const envFileExists = fs.existsSync(getFullPath(envFile));
console.log(envFileExists ? `INFO: 使用 ${envFile} 作为环境变量的配置文件。` : `INFO: ${envFile} 文件未找到。`);

const envFileFallback = /\.local$/.test(envFile) && envFile.replace(/\.local$/, '');

const envFileFallbackExists = !!envFileFallback && fs.existsSync(getFullPath(envFileFallback));

if (envFileFallbackExists) {
  console.log(`INFO: 未在 ${envFile} 中定义的环境变量将使用 ${envFileFallback} 中对应的变量代替。`);
}

if (!envFileExists && !envFileFallbackExists) {
  console.log(
    envFileFallback
      ? `ERROR: 既不存在文件 ${envFile}，也不存在文件 ${envFileFallback}。`
      : `ERROR: 文件 ${envFile} 未找到。`,
  );

  process.exit(1);
}

const envFileChain = [];
if (envFileExists) envFileChain.push(getFullPath(envFile));
if (envFileFallbackExists) envFileChain.push(getFullPath(envFileFallback));
const envMap = envFileChain.reduce((envs, path) => {
  return Object.assign(envs, dotenvExpand(dotenv.config({ path })).parsed);
}, {});

const args = process.argv.slice(2);

if (args.length) {
  execSync(args.join(' '), {
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      ...Object.entries(envMap).reduce((env, [key, value]) => {
        env[`BETA_${key}`] = value;
        return env;
      }, {}),
    },
  });
}
