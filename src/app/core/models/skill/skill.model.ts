export interface Skill {
  id: number;
  name: string;
  image?: string;
  rating: number;
  is_key_skill: boolean;
  is_hard_skill: boolean;
  is_soft_skill: boolean;
  is_active: boolean;
  category?: string;
  get_logo_url: string;
}
