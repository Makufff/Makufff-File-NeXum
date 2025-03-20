export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4813',
  port: process.env.PORT || '4812',
  nodeEnv: process.env.NODE_ENV || 'development',
  enableUpload: process.env.NEXT_PUBLIC_ENABLE_UPLOAD === 'true',
  maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760', 10), // 10MB default
} as const;

// Type-safe environment variables
export type Env = typeof env; 