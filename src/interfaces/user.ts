import { roles } from 'constants/user';
import { Pagination } from './base';

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

interface UsersRequest {
  page: number;
  perPage: number;
  search: string;
  role: User['role'];
}

interface UsersResponse {
  users: User[];
  pagination: Pagination;
}

export type { User, AuthState, MsUser, UsersRequest, UsersResponse };
