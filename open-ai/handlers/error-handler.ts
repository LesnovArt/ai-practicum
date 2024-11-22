export const errorHandler = (
  error: unknown,
  cb?: (msg: string) => string | void
) => {
  if (error instanceof Error) {
    console.error('Error creating completion:', error.message);
    cb?.(error.message);
  } else {
    console.error('An unexpected error occurred:', error);

    cb?.(new Error('An unexpected error occurred').message);
  }
};
