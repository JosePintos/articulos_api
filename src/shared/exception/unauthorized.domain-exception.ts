import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class UnauthorizedDomainException extends DomainException {
  constructor(context?: string) {
    super(
      'Debe loguearse para poder acceder al recurso solicitado.',
      context,
      HttpStatus.UNAUTHORIZED,
    );
    this.name = 'UnauthorizedDomainException';
  }
}
