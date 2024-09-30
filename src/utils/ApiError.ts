class ApiError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
  
      // This ensures that the stack trace is preserved.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ApiError;
  