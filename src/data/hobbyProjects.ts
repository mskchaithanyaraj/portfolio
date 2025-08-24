import { v4 as uuidv4 } from "uuid";

export const hobbyProjects = [
  {
    id: uuidv4(),
    name: "Stride",
    description:
      "A modern, minimalistic to-do tracker with smart progress tracking, subtask management, and celebration animations. Features grayscale-only UI, light/dark themes, and seamless inline editing for smooth workflow.",
    date: { month: "Aug", year: 2025 },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/assets/banners/stride-banner.png",
    githubLink: "https://github.com/mskchaithanyaraj/stride.git",
    demoLink: "https://stride365.vercel.app/",
  },
  {
    id: uuidv4(),
    name: "Interview Prep Checklist",
    description:
      "An interactive, comprehensive checklist for software engineering interview prep. Covers 150+ topics across DSA, OOP, OS, CN, DBMS, and System Design with progress tracking, dark mode, and local storage.",
    date: { month: "Jun", year: 2025 },
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/assets/banners/interview-prep-banner.png",
    githubLink:
      "https://github.com/mskchaithanyaraj/interview-prep-checklist.git",
    demoLink: "https://interviewprep-pi.vercel.app/",
  },
  {
    id: uuidv4(),
    name: "Test for Automation",
    description:
      "Comprehensive testing environment for UI automation scenarios. Includes tricky elements like fake inputs, contentEditable DIVs, dynamic attributes, morphing elements, custom dropdowns, hidden/shadow elements, and deeply nested structures — perfect for pushing automation tools to their limits.",
    date: { month: "Jun", year: 2025 },
    techStack: ["React.js", "JavaScript", "Tailwind CSS"],
    imageUrl: "/assets/banners/test-for-automation-banner.png",
    githubLink: "https://github.com/mskchaithanyaraj/test-for-automation",
    demoLink: "https://test-for-automation.vercel.app/",
  },
];
