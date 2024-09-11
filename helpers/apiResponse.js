class ApiResponse {
    constructor(success, message, data = null) {
      this.success = success;
      this.message = message;
      this.data = data;
    }
  
    // Static methods for success responses
    static success(message = 'Operation successful', data = null) {
      return new ApiResponse(true, message, data);
    }
  
    static created(message = 'Resource created successfully', data = null) {
      return new ApiResponse(true, message, data);
    }
  
    // Static methods for error responses
    static badRequest(message = 'Bad request') {
      return new ApiResponse(false, message);
    }
  
    static unauthorized(message = 'Unauthorized access') {
      return new ApiResponse(false, message);
    }
  
    static forbidden(message = 'Access forbidden') {
      return new ApiResponse(false, message);
    }
  
    static notFound(message = 'Resource not found') {
      return new ApiResponse(false, message);
    }
  
    static conflict(message = 'Conflict detected') {
      return new ApiResponse(false, message);
    }
  
    static internalError(message = 'Internal server error') {
      return new ApiResponse(false, message);
    }
  }
  
export default ApiResponse;

  