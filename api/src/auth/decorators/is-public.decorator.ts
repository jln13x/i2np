import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../constants';

export const IsPublic = () => SetMetadata(DECORATORS.IS_PUBLIC.key, true);
