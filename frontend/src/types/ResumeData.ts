interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    personal_website?: string;
    other?: string;
  }
  
  interface WorkExperience {
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    bullet_points: string[];
  }
  
  interface Education {
    school: string;
    degree: string;
    start_date: string;
    end_date?: string;
  }
  
export interface ResumeData {
    full_name: string;
    contact_info: ContactInfo;
    work_experience: WorkExperience[];
    education: Education[];
    skills?: string[];
  }