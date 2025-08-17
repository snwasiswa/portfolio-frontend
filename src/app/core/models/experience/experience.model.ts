export interface Experience {
  id: number;
  job_title: string;
  company_name: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  active: boolean;
  description?: string | null;
  profiles: number[];
}
