export type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string; 
  idcompany: string | null;
  avatarurl: string | null;
  status: string;
  phone: string;
  bio: string;
}