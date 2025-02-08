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
    imageUrl: "src/assets/certifications/codeit.png",
    category: "Intercollege Competitions",
    issuer: "SRGEC",
    date: "September 2023",
  },
  {
    id: uuidv4(),
    name: "Introduction to IOT",
    imageUrl: "src/assets/certifications/iot_nptel.png",
    category: "NPTEL",
    issuer: "NPTEL",
    date: "November 2024",
  },
  {
    id: uuidv4(),
    name: "Programming Foundations with Python",
    imageUrl: "src/assets/certifications/python.png",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "June 14, 2023",
  },
  {
    id: uuidv4(),
    name: "Build Your Own Responsive Website",
    imageUrl: "src/assets/certifications/Responsive.png",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "April 05, 2023",
  },
  {
    id: uuidv4(),
    name: "Build Your Own Static Website",
    imageUrl: "src/assets/certifications/Static.png",
    category: "Course Completions",
    issuer: "NxtWave",
    date: "November 03, 2022",
  },
  {
    id: uuidv4(),
    name: "How to become Data Scientist",
    imageUrl: "src/assets/certifications/podcasts/data_scientist.jpg",
    category: "Podcasts",
    issuer: "NxtWave",
  },
];
