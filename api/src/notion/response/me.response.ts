import { WorkspaceResponse } from './workspace.response';

export class MeResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  workspace: WorkspaceResponse;

  constructor(
    id: string,
    name: string,
    email: string,
    avatarUrl: string | null,
    workspace: WorkspaceResponse,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.workspace = workspace;
  }
}
