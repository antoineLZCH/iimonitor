const httpStatus = require('httpStatus');

/**
 * @extends Error
 */

class ExtendableError extends Error {
  constructor({
    message,
    errors,
    status,
    isPublic,
    stack
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;

    this.isOperational = true;
    this.stack = stack;
  }
}

class ApiError extends ExtendableError {
  /**
   * Create api error
   * @param {string} message - Error message;
   * @param {number} status - HTTP Status Code;
   * @param {boolean} isPublic - Visible by user or not;
   */

  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  }) {
    super({
      errors,
      isPublic,
      message,
      stack,
      status
    });
  }
}

/**
 * @function Api success response;
 * @param {string} typeOrMessage - Can be "FETCH", "UPDATE", "DELETE" or any custom message;
 * @param {any} data - Any data type;
 */
function success(typeOrMessage, data = null) {
  let message = '';

  switch (typeOrMessage) {
    case 'FETCH':
      message: 'Data fetched successfully.';
      break;
    case 'UDPATE':
      message: 'Data updated successfully.';
      break;
    case 'DELETE':
      message: 'Data deleted successfully.';
      break;
    default:
      message: typeOrMessage;
      break;
  }

  return {
    data,
    message
  };
}

module.exports = {
  Error: APiError,
  success
}