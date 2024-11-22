export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Error ocurred:', error.message);
  } else {
    console.error('An unexpected error occurred:', error);
  }
};
