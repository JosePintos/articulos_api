import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class ForbiddenDomainException extends DomainException {
  constructor(context?: string) {
    super(
      'No posee permisos para acceder al recurso solicitado.',
      context,
      HttpStatus.FORBIDDEN,
    );
    this.name = 'ForbiddenDomainException';
  }
}
