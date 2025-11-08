import { LucideIcon, Coffee, Database, Briefcase } from "lucide-react";

export interface Material {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: LucideIcon;
  lastUpdated?: string;
  tags?: string[];
}

export const materials: Material[] = [
  {
    id: "java-material",
    title: "Java Material",
    description:
      "Comprehensive Java programming guide covering core concepts, OOP principles, collections, and advanced topics.",
    url: "https://docs.google.com/document/d/1dMBs7xkW6a0BM2Nh5llNdwaE4Sq_6e5wgJheDO4mADA/edit?usp=drive_link",
    category: "Programming Languages",
    icon: Coffee,
    tags: ["Java", "OOP", "Programming", "Backend"],
  },
  {
    id: "sql-material",
    title: "SQL Material",
    description:
      "Database fundamentals, SQL queries, joins, stored procedures, and database optimization techniques.",
    url: "https://docs.google.com/document/d/11K4-RsK2qJXIbYPKGn0wQljKtFKocl9NEZvchyPk-hA/edit?usp=drive_link",
    category: "Database",
    icon: Database,
    tags: ["SQL", "Database", "Queries", "Data"],
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    description:
      "Complete interview preparation guide with coding problems, system design, behavioral questions, and tips.",
    url: "https://docs.google.com/document/d/1EfxS4zD2NZv5_6Z6y1h8e9SBiiJ-H33yS0RAoAhI9G4/edit?usp=drive_link",
    category: "Career",
    icon: Briefcase,
    tags: ["Interview", "Coding", "Career", "Preparation"],
  },
];

export const materialCategories = [
  "All",
  "Programming Languages",
  "Database",
  "Career",
];
