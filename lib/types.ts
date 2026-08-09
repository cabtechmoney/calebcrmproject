export type Project = {
  id: string;
  title: string;
  description?: string | null;
  status?: string | null;
  budget?: number | null;
  deadline?: string | null;
  clientId?: string | null;
  client?: {
    id: string;
    name?: string | null;
  };
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type Client = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  projects?: Array<{
    id: string;
    title: string;
    status?: string | null;
    budget?: number | null;
    deadline?: string | null;
  }>;
};

export type Payment = {
  id: string;
  amount?: number | null;
  status?: string | null;
  method?: string | null;
  paidAt?: string | null;
  clientId?: string | null;
  projectId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};
