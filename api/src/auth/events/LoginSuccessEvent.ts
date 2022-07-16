import { User } from '@prisma/client';

export class LoginSuccessEvent {
  constructor(public user: User) {}
}
