export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  profilePicture: string;
}

export interface UsersResponse {
  users: User[];
}

export interface DemoResponse {
  message: string;
}
