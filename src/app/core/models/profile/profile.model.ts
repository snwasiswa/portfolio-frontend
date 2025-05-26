// Define the interfaces for related models

import { Course } from "../course/course.model";
import { Education } from "../education/education.model";
import { Leadership } from "../leadership/leadership.model";
import { MyContact } from "../mycontact/mycontact.model";
import { Portfolio } from "../portfolio/portfolio.model";
import { Skill } from "../skill/skill.model";

export interface UserBasic {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
// The main Profile interface
export interface Profile {
  user: {
    first_name: string;
    last_name: string;
    email?: string;
  };
  title?: string | null; // Title of the profile (optional)
  biography?: string | null; // Biography text (optional)
  skills: Skill[]; // Many-to-many relationship with skills
  avatar?: string | null; // URL to the avatar image (optional)
  resume?: string | null; // URL to the resume file (optional)
  work?: string | null; // URL to the work sample (optional)
  courses: Course[]; // Many-to-many relationship with courses
  leaderships: Leadership[]; // Many-to-many relationship with leadership roles
  educations: Education[]; // Many-to-many relationship with education
  projects: Portfolio[]; // Many-to-many relationship with portfolio projects
  links: MyContact[]; // Many-to-many relationship with contact links
  get_avatar_url: string;
  get_resume_url: string;
  get_work_samples_url: string;
}
