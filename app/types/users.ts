export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  tenantId: {
    id: number;
    name: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuth: Boolean;
  isLoading: boolean;
  setAuthContext: (user: User) => void;
  removeAuthContext: () => void;
}
