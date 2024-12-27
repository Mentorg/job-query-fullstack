export type Notification = {
  id: number;
  icon: string;
  type: string;
  subject: string;
  content: string;
  created_at: string;
  is_read: boolean;
  user_id: number;
  sender_id?: number;
};
