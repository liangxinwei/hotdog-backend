/**
 * 合法环境变量列表
 */
const envList = [
  'ENV',
  'PORT',
  // 邮箱配置验证
  'MAIL_HOST',
  'MAIL_PORT',
  'MAIL_USER',
  'MAIL_PASSWORD',
  // redis 配置验证
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
  'REDIS_DB',
] as const;

/**
 * 合法的环境变量 union
 */
export type EnvVar = typeof envList[number];

// init env vars with process.env
const envMap: { [key: string]: string } = {
  // eslint-disable-next-line no-process-env
  ...(process.env as { [key: string]: string }),
};

const getRealKey = (key: string) => `BETA_${key}`;

// 检查变量名合法性
const validateEnvVar = (key: string) => {
  if (!envList.includes(key as EnvVar)) {
    throw new Error(`${key} 不是一个合法的环境变量`);
  }
};

// 检查变量值存在性
const validateEnvVarExistence = (key: EnvVar) => {
  if (!envMap[getRealKey(key)]) {
    throw new Error(`${key} 未在 envfile 中定义，也未通过 setEnv 设置`);
  }
};

/**
 * 更新环境变量 (可同时更新多个)
 *
 * @param map - 要更新的环境变量 key value object
 */
export function setEnv(map: { [key in EnvVar]?: string | undefined }) {
  Object.entries(map).forEach(([key, value]) => {
    validateEnvVar(key);

    envMap[getRealKey(key)] = value || '';
  });
}

/**
 * 读取环境变量
 *
 * @param key - 环境变量的 key
 * @returns 环境变量的值
 */
export function env(key: EnvVar): string {
  validateEnvVar(key);
  validateEnvVarExistence(key);

  return envMap[getRealKey(key)] as string;
}

/**
 * 是否是 production 环境
 *
 * @returns 是否
 */
export function isProduction() {
  return env('ENV') === 'production';
}

/**
 * 是否是 staging 环境
 *
 * @returns 是否
 */
export function isStaging() {
  return env('ENV') === 'staging';
}

/**
 * 是否是 development 环境
 *
 * @returns 是否
 */
export function isDevelopment() {
  return env('ENV') === 'development';
}

/**
 * 是否是测试环境
 *
 * @returns 是否
 */
export function isTest() {
  // eslint-disable-next-line no-process-env
  return !!process.env.JEST;
}
