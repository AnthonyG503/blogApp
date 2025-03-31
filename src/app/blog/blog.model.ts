
export interface Blog {
  id?: number;
  username: string;
  blogpost: string;
  email: string;
  terms: boolean;
  createdAt?: string;
  category?: string;
  comments?: string[];
}
