export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  keyLearnings: string[];
  githubLink: string;
  demoLink?: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Nxt Trendz ( ECommerce Clone - Amazon, Flipkart)",
    description:
      "A full-stack e-commerce platform with user authentication, product management, and order processing.",
    techStack: ["React JS", "CSS", "REST API Calls", "JWT Token"],
    keyLearnings: ["State management", "RESTful API design"],
    githubLink: "https://github.com/msk-chaithanya-raj/nxt-trendz.git",
    demoLink: "https://kcnxttrendz.ccbp.tech",
    image: "/assests/nxttrendz.png",
  },
  {
    id: 2,
    name: "Chatty: Real-Time Messaging App",
    description: "Developed a real-time messaging web application.",
    techStack: [
      "React JS",
      "Node JS",
      "Socket.io",
      "MongoDB",
      "Express JS",
      "TailwindCSS",
      "Daisy UI",
      "JWT",
    ],
    keyLearnings: [
      "Real-time communication with Socket.io",
      "User authentication and authorization",
      "Database schema design",
    ],
    githubLink: "https://github.com/msk-chaithanya-raj/fullstack-chat-app.git",
    demoLink: "https://fullstack-chat-app-axa7.onrender.com",
    image: "/assests/chatty.png",
  },
  // Add more projects as needed
];
