export default class CustomError extends Error {
  public statuscode;
  
  constructor(message: string, statuscode = 400) {
    super(message);
    this.name = 'CustomError';
    this.statuscode = statuscode;
  }
}