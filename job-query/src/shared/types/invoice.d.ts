export type Invoice = {
  id: number;
  reference: string;
  status: boolean;
  created_at: string;
  due_date: string;
  company_id: number;
  subscription_id?: number;
};
