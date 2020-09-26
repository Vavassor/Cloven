export const logError = (message: string, error?: any, attributes?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error(message);
  } else {
    const body = {
      message,
      source_error: error,
    };
    const messageJson = JSON.stringify(body);
    console.error(messageJson);
  }
};
