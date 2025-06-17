import { HttpStatus } from '@nestjs/common';

import { DomainException } from './domain.exception';

export class ConflictDomainException extends DomainException {
  constructor(message: string, context?: string) {
    super(message, context, HttpStatus.CONFLICT);
    this.name = 'ConflictDomainException';
  }
}
