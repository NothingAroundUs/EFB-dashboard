export interface UserList {
  users: UserEntry[];
}

export interface UserEntry {
  name: string;
  email: string;
  id: string;
  contCategory: string;
}
