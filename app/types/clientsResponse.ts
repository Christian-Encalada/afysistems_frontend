export interface ClientsResponse {
  ClientsPaginated: ClientsPaginated;
  total: number;
}

export interface ClientsPaginated {
  data: Datum[];
  filteredTotal: number;
  clientsPerPage: number;
  totalPages: number;
}

export interface Datum {
  id: number;
  username: string;
  email: null | string;
  tenant: Tenant;
  country: Canton | null;
  province: Canton | null;
  canton: Canton | null;
  parish: Canton | null;
  document: null | string;
  phone: null | string;
  direction: null | string;
  createdAt: Date;
  updateAt: Date;
}

export interface Canton {
  name: string;
}

export interface Tenant {
  id: number;
  name: string;
}
