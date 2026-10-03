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
    period: "April 2025 - October 2025 (6 months)",
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
  {
    id: 2,
    role: "SDET Intern",
    company: "Cognizant Technology Solutions",
    logo: "assets/logos/cognizant-logo.png",
    website: "https://www.cognizant.com/",
    location: "Coimbatore",
    period: "Mar 2026 - July 2026",
    description:
      "Training as an SDET intern with a focus on automation testing, SQL validation, and full-stack testing workflows.",
    responsibilities: [
      " Built UI automation frameworks using Java, Selenium WebDriver, TestNG, and Cucumber (BDD).",
      "Automated and validated REST APIs using Rest Assured for functional and regression testing.",
      " Worked with Spring Boot and Angular applications to implement end-to-end test automation.",
    ],
    skills: [
      "Automation Testing",
      "SQL Validation",
      "Full-Stack Testing",
      "Test Design",
      "Debugging",
      "Database Validation",
    ],
  },
  {
    id: 3,
    role: "Program Analyst",
    company: "Cognizant Technology Solutions",
    logo: "assets/logos/cognizant-logo.png",
    website: "https://www.cognizant.com/",
    location: "Kolkata",
    period: "Aug 2026 - Present",
    description:
      "Working as a Program Analyst with a focus on automation testing and Agentic AI testing.",
    responsibilities: [
      " Built UI automation frameworks using Java, Selenium WebDriver, TestNG, and Cucumber (BDD).",
      "Automated and validated REST APIs using Rest Assured for functional and regression testing.",
      " Worked with Spring Boot and Angular applications to implement end-to-end test automation.",
    ],
    skills: [
      "Automation Testing",
      "Full-Stack Testing",
      "Test Design",
      "Debugging",
      "Agentic AI Testing",
      "Mannual Testing",
    ],
  },
];
