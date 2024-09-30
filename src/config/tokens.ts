export const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword',
  } as const;
  
  export type TokenType = keyof typeof tokenTypes;
  