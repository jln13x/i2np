import { Injectable, Scope } from '@nestjs/common';
import { AccountService } from 'account/account.service';
import { AccessTokenEncryptionService } from './access-token-encryption.service';

@Injectable({ scope: Scope.REQUEST })
export class AccessTokenProviderService {
  private accessToken?: string;

  constructor(
    private accessTokenEncryptionService: AccessTokenEncryptionService,
    private accountService: AccountService,
  ) {}

  async getAccessToken() {
    if (this.accessToken) return this.accessToken;

    const account = await this.accountService.getAccount();

    const accessToken = await this.accessTokenEncryptionService.decrypt(
      account.accessToken,
      account.email,
    );

    this.accessToken = accessToken;

    return accessToken;
  }
}
