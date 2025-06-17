import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class NotFoundDomainException extends DomainException {
  constructor(entity: string, context?: string) {
    super(`${entity} no encontrado.`, context, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundDomainException';
  }
}
