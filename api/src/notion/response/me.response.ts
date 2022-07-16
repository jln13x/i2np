export class MeResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;

  constructor(
    id: string,
    name: string,
    email: string,
    avatarUrl: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }
}
