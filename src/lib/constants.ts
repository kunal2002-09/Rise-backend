import { getEnv } from './env';

export const ENVIRONMENT = getEnv('NODE_ENV') || 'development';