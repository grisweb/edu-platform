import { roles } from 'constants/user';
import { WithPaginationRequest, WithPaginationResponse } from './base';

interface User {
  id: number;
  name: string;
  email: string;
  role: (typeof roles)[number];
}

interface MsUser {
  id: string;
  displayName: string;
  mail: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface UsersRequest extends WithPaginationRequest {
  search: string;
  role: User['role'];
}

interface UsersResponse extends WithPaginationResponse {
  users: User[];
}

export type { User, AuthState, MsUser, UsersRequest, UsersResponse };
