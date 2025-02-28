export type Notification = {
  id: number;
  type: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  readAt: string | null;
  notifiable: {
    id: number;
  };
};
