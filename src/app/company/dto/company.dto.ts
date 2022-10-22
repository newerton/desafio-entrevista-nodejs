export type CompanyInput = {
  id: string;
  social_name: string;
  fantasy_name: string;
  email: string;
  document: string;
  phone: string;
  password: string;
  password_confirm: string;
  is_active: boolean;
};

export type CompanyOutput = {
  id: string;
  social_name: string;
  fantasy_name: string;
  email: string;
  document: string;
  phone: string;
  is_active: boolean;
  created_at: Date;
};
