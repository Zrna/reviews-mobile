export interface AccountData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAccountProps {
  firstName: string;
  lastName: string;
}
