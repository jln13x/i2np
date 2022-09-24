import { InternalServerErrorException } from '@nestjs/common';
import { ZodError } from 'zod';

export class InvalidNotionResponseException extends InternalServerErrorException {
  constructor(public readonly zodError?: ZodError) {
    super('Invalid Notion response');
  }
}
