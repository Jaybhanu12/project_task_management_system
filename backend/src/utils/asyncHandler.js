const AsyncHandler = (requestHandler) => async (req, res, next) => {
    try {
      // Await the promise resolution and call the next middleware
      await requestHandler(req, res, next);
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  };
  
  export { AsyncHandler };
  