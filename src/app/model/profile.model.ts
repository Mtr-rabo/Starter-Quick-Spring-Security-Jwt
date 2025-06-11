import { Role } from './role.model';

export interface Profile {
  id?: number;
  name?: string;
  roles?: Role[];
}
