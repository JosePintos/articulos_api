import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class BadRequestDomainException extends DomainException {
  constructor(property: string, context?: string) {
    super(
      `Campo '${property}' no proporcionado o inválido.`,
      context,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'BadRequestDomainException';
  }
}
