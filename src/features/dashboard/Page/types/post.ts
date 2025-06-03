export interface PostType {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'educator' | 'youth' | 'digcomp' | 'other';
  bool?: boolean;
  eventDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}
