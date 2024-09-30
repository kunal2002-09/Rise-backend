// types.ts

export interface Payload {
    sub: string;          // User ID
    iat: number;          // Issued at time
    exp: number;          // Expiry time
    type: string;         // Token type, e.g., "ACCESS"
  }
  