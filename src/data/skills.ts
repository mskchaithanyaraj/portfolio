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
    logo: "/assests/logos/react-logo.png",
    level: "Advanced",
  },
  {
    id: 3,
    name: "Node.js",
    logo: "/assests/logos/nodejs-logo.svg",
    level: "Advanced",
  },
  {
    id: 4,
    name: "MongoDB",
    logo: "/assests/logos/mongodb.svg",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Express.js",
    logo: "/assests/logos/express-js.png",
    level: "Advanced",
  },
  {
    id: 6,
    name: "Sqlite",
    logo: "/assests/logos/sqlite.png",
    level: "Advanced",
  },
  {
    id: 7,
    name: "DSA",
    logo: "/assests/logos/dsa_logo.webp",
    level: "Intermediate",
  },
  {
    id: 8,
    name: "C++",
    logo: "/assests/logos/c++.png",
    level: "Intermediate",
  },
  {
    id: 9,
    name: "Next.js",
    logo: "/assests/logos/nextjs.png",
    level: "Beginner",
  },
  {
    id: 10,
    name: "TypeScript",
    logo: "/assests/logos/typescript.png",
    level: "Beginner",
  },
  // Add more skills
];
