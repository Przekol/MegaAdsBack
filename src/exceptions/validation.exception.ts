import { HttpException } from './http.eception';

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
