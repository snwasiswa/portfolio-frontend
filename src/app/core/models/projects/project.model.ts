export interface Project {
  id: number;
  name: string;
  image?: string;
  is_active: boolean;
  slug?: string;
  description?: string;
  body?: string;
  date?: string;
  is_side_project?: boolean;
  url?: string;
  year?: string;
  technology?: string[];
  get_logo_url: string;
}
