import { HttpException } from './http.eception';

export class NotFoundException extends HttpException {
  constructor() {
    super(404, 'Page Not Found');
  }
}
