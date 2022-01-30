export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category_id: string;
}

export type ORDER_BY_TYPE = 'ASC' | 'DESC' | 'asc' | 'desc';
