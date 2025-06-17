import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class InternalServerErrorDomainException extends DomainException {
  constructor(context?: string) {
    super(
      'Ha ocurrido un error. Intente nuevamente.',
      context,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = 'InternalServerErrorDomainException';
  }
}
