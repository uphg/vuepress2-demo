export interface PostType {
  path: string;
  title: string;
  description?: string;
  date?: string | number;
  tags?: string[]
}