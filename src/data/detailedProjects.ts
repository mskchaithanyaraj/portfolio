export interface DetailedProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: {
    month: string;
    year: number;
  };
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  techStack: string[];
  githubLink: string;
  demoLink?: string;
}

export const detailedProjects: DetailedProject[] = [
  {
    id: "1",
    name: "COVID-19 Page",
    description:
      "A responsive informational page about COVID-19, marking the beginning of my development journey, featuring layout development with symptoms and prevention sections.",
    imageUrl: "/assets/banners/covid19-page.png",
    date: {
      month: "November",
      year: 2022,
    },
    challenges: [
      "Creating a responsive layout for all devices",
      "Integrating Bootstrap with custom CSS",
      "Ensuring clear presentation of information",
    ],
    solutions: [
      "Utilized Bootstrap grid system and Flexbox for responsiveness",
      "Combined Bootstrap classes with custom CSS for styling",
      "Structured content with cards and intuitive design",
    ],
    outcomes: [
      "Successfully built my first web page",
      "Achieved mobile-friendly design",
      "Gained foundational skills in front-end development",
    ],
    techStack: ["HTML", "CSS", "Bootstrap", "Flexbox"],
    githubLink:
      "https://github.com/msk-chaithanya-raj/projects/tree/main/covid-19-dashboard",
    demoLink: "",
  },
  {
    id: "2",
    name: "Flats Page",
    description:
      "A real estate listing page showcasing 3BHK flats with detailed descriptions and booking functionality.",
    imageUrl: "/assets/banners/flats-page.png",
    date: {
      month: "December",
      year: 2022,
    },
    challenges: [
      "Designing an appealing UI for property listings",
      "Implementing navigation between sections",
      "Ensuring consistent styling across pages",
    ],
    solutions: [
      "Used Bootstrap for responsive design and card layouts",
      "Implemented JavaScript for section switching",
      "Applied consistent typography and colors with custom CSS",
    ],
    outcomes: [
      "Created an intuitive user experience",
      "Improved navigation flow",
      "Enhanced visual appeal of listings",
    ],
    techStack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    githubLink:
      "https://github.com/msk-chaithanya-raj/projects/tree/main/flats-page",
    demoLink: "",
  },
  {
    id: "3",
    name: "Navbar & Banner Section",
    description:
      "A responsive navbar and banner section designed for both desktop and mobile views using Bootstrap.",
    imageUrl: "/assets/banners/navbar-banner.png",
    date: {
      month: "February",
      year: 2023,
    },
    challenges: [
      "Ensuring navbar responsiveness across devices",
      "Creating an engaging banner design",
      "Maintaining consistency in styling",
    ],
    solutions: [
      "Leveraged Bootstrap’s responsive navbar component",
      "Used Flexbox for banner alignment",
      "Applied media queries for fine-tuned adjustments",
    ],
    outcomes: [
      "Achieved seamless responsiveness",
      "Improved user navigation experience",
      "Built a visually appealing banner",
    ],
    techStack: ["HTML", "CSS", "Bootstrap", "Responsive Design"],
    githubLink:
      "https://github.com/msk-chaithanya-raj/projects/tree/main/navbar-banner-section",
    demoLink: "",
  },
  {
    id: "4",
    name: "Todos Application",
    description:
      "A persistent todo application with CRUD operations to manage tasks, styled with Bootstrap and enhanced with local storage.",
    imageUrl: "/assets/banners/todolist.png",
    date: {
      month: "October",
      year: 2023,
    },
    challenges: [
      "Implementing persistent state across page reloads",
      "Dynamically updating UI with CRUD operations",
      "Styling a user-friendly todo list",
    ],
    solutions: [
      "Used local storage to persist todos",
      "Applied JavaScript DOM operations and event listeners",
      "Integrated Bootstrap for consistent styling",
    ],
    outcomes: [
      "Built a functional task management tool",
      "Ensured data persistence",
      "Received positive feedback on usability",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    githubLink: "",
    demoLink: "https://kctodolist.ccbp.tech",
  },
  {
    id: "5",
    name: "Add User Forms",
    description:
      "A form application with validation for adding users, including email format checks and API integration.",
    imageUrl: "/assets/banners/forms-project.png",
    date: {
      month: "June",
      year: 2023,
    },
    challenges: [
      "Validating form inputs effectively",
      "Handling API errors gracefully",
      "Updating UI based on validation",
    ],
    solutions: [
      "Implemented regex for email validation",
      "Used fetch() with error handling for API calls",
      "Added event listeners for real-time updates",
    ],
    outcomes: [
      "Reduced invalid submissions",
      "Improved user feedback on errors",
      "Enhanced form reliability",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    githubLink:
      "https://github.com/msk-chaithanya-raj/projects/tree/main/forms-javascript",
    demoLink: "",
  },
  {
    id: "6",
    name: "Github Popular Repos",
    description:
      "A web app displaying popular GitHub repositories with language filtering, built with React components.",
    imageUrl: "/assets/banners/popularrepo.png",
    date: {
      month: "September",
      year: 2023,
    },
    challenges: [
      "Fetching and displaying API data",
      "Implementing language filtering",
      "Structuring React components",
    ],
    solutions: [
      "Used fetch() to retrieve data from GitHub API",
      "Built filter logic with React state",
      "Organized code with modular components",
    ],
    outcomes: [
      "Successfully displayed repo data",
      "Enabled dynamic filtering",
      "Improved React proficiency",
    ],
    techStack: ["React", "JavaScript", "CSS", "REST API"],
    githubLink: "",
    demoLink: "https://kcgithubrepo.ccbp.tech",
  },
  {
    id: "7",
    name: "CoWIN Dashboard",
    description:
      "A dashboard visualizing COVID-19 vaccination data with charts, using Recharts for data representation.",
    imageUrl: "/assets/banners/cowin.png",
    date: {
      month: "January",
      year: 2024,
    },
    challenges: [
      "Integrating and processing API data",
      "Creating interactive charts",
      "Handling API failure states",
    ],
    solutions: [
      "Fetched data with HTTP GET and displayed loader",
      "Used Recharts for Bar and Pie charts",
      "Implemented failure view for error handling",
    ],
    outcomes: [
      "Visualized vaccination trends effectively",
      "Improved data presentation skills",
      "Ensured robust error handling",
    ],
    techStack: ["React", "JavaScript", "Recharts", "CSS"],
    githubLink: "",
    demoLink: "https://cowinbychaithu.ccbp.tech",
  },
  {
    id: "8",
    name: "Chatty: Real-Time Messaging App",
    description:
      "A real-time messaging app with secure authentication and instant messaging capabilities.",
    imageUrl: "/assets/chatty.png",
    date: {
      month: "January",
      year: 2025,
    },
    challenges: [
      "Implementing real-time communication",
      "Securing user sessions",
      "Designing a responsive UI",
    ],
    solutions: [
      "Integrated Socket.io for real-time messaging",
      "Used JWT for authentication",
      "Applied TailwindCSS and Daisy UI for styling",
    ],
    outcomes: [
      "Achieved instant message delivery",
      "Ensured secure user access",
      "Built a modern, responsive interface",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Socket.io",
      "JWT",
      "TailwindCSS",
      "Daisy UI",
    ],
    githubLink: "https://github.com/msk-chaithanya-raj/fullstack-chat-app.git",
    demoLink: "https://fullstack-chat-app-axa7.onrender.com",
  },
  {
    id: "9",
    name: "HealU: Personalized Nutrition & Meal Planning Platform",
    description:
      "A web app for meal planning and BMI calculation with an integrated chatbot for diet recommendations.",
    imageUrl: "/assets/healu.png",
    date: {
      month: "October",
      year: 2024,
    },
    challenges: [
      "Integrating a chatbot for diet planning",
      "Managing full-stack deployment",
      "Enhancing UI/UX for user engagement",
    ],
    solutions: [
      "Built chatbot logic with Node.js backend",
      "Deployed on Netlify with MongoDB integration",
      "Optimized UI with React components",
    ],
    outcomes: [
      "Provided personalized meal plans",
      "Successfully deployed full-stack app",
      "Improved user interaction with chatbot",
    ],
    techStack: ["Node.js", "React.js", "Express.js", "MongoDB"],
    githubLink: "https://github.com/msk-chaithanya-raj/HealU.git",
    demoLink: "https://healuonline.netlify.app",
  },
  {
    id: "10",
    name: "Nxt Trendz (E-Commerce Clone)",
    description:
      "An e-commerce platform clone with secure authentication, product listings, and detailed views.",
    imageUrl: "/assets/nxttrendz.png",
    date: {
      month: "April",
      year: 2024,
    },
    challenges: [
      "Implementing secure login functionality",
      "Managing state across pages",
      "Integrating REST API calls",
    ],
    solutions: [
      "Used JWT and local storage for authentication",
      "Leveraged React Router for navigation",
      "Fetched product data with REST API",
    ],
    outcomes: [
      "Built a functional e-commerce flow",
      "Enhanced state management skills",
      "Achieved secure user sessions",
    ],
    techStack: [
      "React.js",
      "JavaScript",
      "CSS",
      "Bootstrap",
      "Routing",
      "REST API",
      "Local Storage",
      "JWT",
    ],
    githubLink: "https://github.com/msk-chaithanya-raj/nxt-trendz.git",
    demoLink: "https://kcnxttrendz.ccbp.tech",
  },
];
