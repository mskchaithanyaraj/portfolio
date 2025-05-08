export interface Experience {
  id: number;
  role: string;
  company: string;
  logo: string;
  website: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "SDE Intern",
    company: "TaskLabs",
    logo: "assets/logos/tasklabs-logo.png",
    website: "https://www.tasklabs.app/",
    location: "Remote",
    period: "April 2025 - Present (5 months)",
    description:
      "Working as a Software Development Engineer Intern at TaskLabs, developing Chrome Extensions and improving web applications with a focus on user experience and performance optimization.",
    responsibilities: [
      "Developed Chrome Extensions using React.js and Vite, enhancing drag-and-drop and item reordering capabilities",
      "Integrated Redux for state management, streamlining search functionalities and optimizing dashboard modules",
      "Improved dynamic UI updates and resolved bugs to ensure seamless component interactions",
      "Contributed to Selenium test automation, enhancing QA processes and product reliability",
      "Optimized internal dashboards and feedback pages with Next.js, significantly improving performance and SEO",
    ],
    skills: [
      "React.js",
      "Redux",
      "Chrome Extensions",
      "Vite",
      "Next.js",
      "Selenium",
      "Git",
    ],
  },
  // You can add more experiences as needed
];
