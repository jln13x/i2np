import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';
import { ACCESS_TOKEN_ENCRYPTION } from './constants';

@Injectable()
export class AccessTokenEncryptionService {
  private getKey = async (salt: string) => {
    const scryptPromisified = promisify(scrypt);
    const key = await scryptPromisified(
      ACCESS_TOKEN_ENCRYPTION.password,
      salt,
      32,
    );
    return key as Buffer;
  };

  private getIV(): Buffer {
    return randomBytes(16);
  }

  public async encrypt(accessToken: string, salt: string): Promise<string> {
    const key = await this.getKey(salt);
    const iv = await this.getIV();
    const cipher = createCipheriv(ACCESS_TOKEN_ENCRYPTION.algorithm, key, iv);

    const encryptedToken = Buffer.concat([
      cipher.update(accessToken),
      cipher.final(),
    ]);

    const string = encryptedToken.toString('hex');

    return `${iv.toString('hex')}${string}`;
  }

  public async decrypt(accessToken: string, salt: string): Promise<string> {
    const key = await this.getKey(salt);
    const tokenBuffer = Buffer.from(accessToken, 'hex');

    const iv = tokenBuffer.subarray(0, 16);
    const encryptedToken = tokenBuffer.subarray(16);

    const decipher = createDecipheriv(
      ACCESS_TOKEN_ENCRYPTION.algorithm,
      key,
      iv,
    );

    const decryptedToken = Buffer.concat([
      decipher.update(encryptedToken),
      decipher.final(),
    ]);

    return decryptedToken.toString();
  }
}
