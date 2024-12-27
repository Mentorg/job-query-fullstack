export type Message = {
  id: number;
  content: string;
  subject: string;
  created_at: string;
  is_read: boolean;
  sender_id: number;
  receiver_id: number;
};
