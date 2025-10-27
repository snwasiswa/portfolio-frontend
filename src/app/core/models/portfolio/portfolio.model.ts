import { ProjectImage } from '../projectimage/projectimage';

export interface Portfolio {
  id: number;
  name: string;
  image?: string;
  is_active: boolean;
  slug?: string;
  description?: string;
  body?: string;
  date?: string;
  is_side_project?: boolean;
  for_resume?: boolean;
  url?: string;
  year?: string;
  technology?: string[];
  get_logo_url: string;
  images?: ProjectImage[];
  currentSlide?: number;
}
