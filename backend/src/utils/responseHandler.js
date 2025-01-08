export const handleSuccessResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  export const handleErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  