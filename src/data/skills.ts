export interface Skill {
  id: number;
  name: string;
  logo: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "JavaScript",
    logo: "/assets/logos/JavaScript-logo.png",
    level: "Advanced",
  },
  {
    id: 2,
    name: "React.js",
    logo: "/assets/logos/react-logo.png",
    level: "Advanced",
  },
  {
    id: 3,
    name: "Node.js",
    logo: "/assets/logos/nodejs-logo.svg",
    level: "Advanced",
  },
  {
    id: 4,
    name: "MongoDB",
    logo: "/assets/logos/mongodb.svg",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Express.js",
    logo: "/assets/logos/express-js.png",
    level: "Advanced",
  },
  {
    id: 6,
    name: "Sqlite",
    logo: "/assets/logos/sqlite.png",
    level: "Advanced",
  },
  {
    id: 7,
    name: "DSA",
    logo: "/assets/logos/dsa_logo.webp",
    level: "Intermediate",
  },
  {
    id: 8,
    name: "C++",
    logo: "/assets/logos/c++.png",
    level: "Intermediate",
  },
  {
    id: 9,
    name: "Next.js",
    logo: "/assets/logos/nextjs.png",
    level: "Beginner",
  },
  {
    id: 10,
    name: "TypeScript",
    logo: "/assets/logos/typescript.png",
    level: "Beginner",
  },
  // Add more skills
];
