import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  readonly #context: string;

  constructor(message: string, context?: string, status?: number) {
    super(
      {
        statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
        message,
        context: context || 'Domain',
      },
      status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = 'DomainException';
    this.#context = context || 'Domain';
  }

  getStatus(): number {
    return super.getStatus();
  }

  getContext(): string {
    return this.#context;
  }
}
