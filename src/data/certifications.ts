import { v4 as uuidv4 } from "uuid";

export interface Certification {
  id: string;
  name: string;
  imageUrl: string;
  category:
    | "Intercollege Competitions"
    | "NPTEL"
    | "Course Completions"
    | "Podcasts";
  issuer?: string;
  date?: string;
}

export const certifications: Certification[] = [
  {
    id: uuidv4(),
    name: "CodeIT'23",
    imageUrl: "assets/certifications/codeit.png",
    category: "Intercollege Competitions",
    issuer: "SRGEC",
    date: "October 17, 2023",
  },
  {
    id: uuidv4(),
    name: " NxtCode 7 Under 7 Challenge",
    imageUrl: "assets/certifications/nxtcode.jpg",
    category: "Intercollege Competitions",
    issuer: "Nxtwave",
    date: "October 1, 2024",
  },
  {
    id: uuidv4(),
    name: "Introduction to IOT",
    imageUrl: "assets/certifications/iot_nptel.png",
    category: "NPTEL",
    issuer: "NPTEL",
    date: "November 2024",
  },
  {
    id: uuidv4(),
    name: "Programming Foundations with Python",
    imageUrl: "assets/certifications/python.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "June 14, 2023",
  },
  {
    id: uuidv4(),
    name: "Build Your Own Responsive Website",
    imageUrl: "assets/certifications/responsive.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "April 05, 2023",
  },
  {
    id: uuidv4(),
    name: "Build Your Own Static Website",
    imageUrl: "assets/certifications/static.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "November 03, 2022",
  },
  {
    id: uuidv4(),
    name: "XPM 4.0 Fundamentals",
    imageUrl: "assets/certifications/xpm.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "April 10, 2023",
  },
  {
    id: uuidv4(),
    name: "Build Your Own Dynamic Web Application",
    imageUrl: "assets/certifications/dynamic_web.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "September 30, 2023",
  },
  {
    id: uuidv4(),
    name: "Introduction to Databases",
    imageUrl: "assets/certifications/database.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "November 13, 2023",
  },
  {
    id: uuidv4(),
    name: "JavaScript Essentials",
    imageUrl: "assets/certifications/javascript.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "December 28, 2023",
  },
  {
    id: uuidv4(),
    name: "Responsive Web Design using Flexbox",
    imageUrl: "assets/certifications/flexbox.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "February 04, 2024",
  },
  {
    id: uuidv4(),
    name: "Developer Foundations - Git",
    imageUrl: "assets/certifications/git.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "March 03, 2024",
  },
  {
    id: uuidv4(),
    name: "Node.js",
    imageUrl: "assets/certifications/nodejs.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "June 06, 2024",
  },
  {
    id: uuidv4(),
    name: "React JS",
    imageUrl: "assets/certifications/reactjs.jpg",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "February 10, 2025",
  },
  {
    id: uuidv4(),
    name: "How to become Data Scientist",
    imageUrl: "assets/certifications/podcasts/howtobecomeds.jpg",
    category: "Podcasts",
    issuer: "NxtWave",
  },
  {
    id: uuidv4(),
    name: "Skills You Can't Ignore to get Exciting AI Jobs",
    imageUrl: "assets/certifications/podcasts/aijobs.jpg",
    category: "Podcasts",
    issuer: "NxtWave",
  },
];
