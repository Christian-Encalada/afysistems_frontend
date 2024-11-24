export interface UsersResponse {
    UsersPaginated: UsersPaginated;
    total: number;
  }
  
  export interface UsersPaginated {
    data: UserDatum[];
    filteredTotal: number;
    usersPerPage: number;
    totalPages: number;
  }
  
  export interface UserDatum { 
    id: number;
    username: string;
    email: null | string;
    tenant: Tenant;
    country: Canton | null;
    province: Canton | null;
    canton: Canton | null;
    parish: Canton | null;
    document: string | null;
    phone: string | null;
    direction: string | null;
    status: boolean;
    role: string;
    createdAt: Date;
    updateAt: Date;
  }
  
export interface Canton {
  id: number;
  name: string;
}

export interface Tenant {
  id: number;
  name: string;
}

  