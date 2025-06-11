import { Profile } from './profile.model';

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  enabled?: boolean;
  profileId?: number;
  profile?: Profile;
}
