export interface Skill {
  id: number;
  name: string;
  logo: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  featured?: boolean;
}

export const skills: Skill[] = [
  {
    id: 12,
    name: "Python",
    logo: "assets/logos/python.png",
    level: "Advanced",
  },
  {
    id: 13,
    name: "FastAPI",
    logo: "assets/logos/fastapi.png",
    level: "Intermediate",
  },
  {
    id: 14,
    name: "Tailwind CSS",
    logo: "assets/logos/tailwindcss.png",
    level: "Advanced",
  },
  {
    id: 15,
    name: "Redux",
    logo: "assets/logos/redux.png",
    level: "Intermediate",
  },
  {
    id: 16,
    name: "Postman",
    logo: "assets/logos/postman.png",
    level: "Intermediate",
  },
  {
    id: 17,
    name: "REST APIs",
    logo: "assets/logos/rest-api.png",
    level: "Advanced",
  },
  {
    id: 18,
    name: "JWT",
    logo: "assets/logos/jwt.png",
    level: "Intermediate",
  },
  {
    id: 19,
    name: "LangChain",
    logo: "assets/logos/langchain.png",
    level: "Advanced",
    featured: true,
  },
  {
    id: 20,
    name: "LangGraph",
    logo: "assets/logos/langgraph.png",
    level: "Intermediate",
    featured: true,
  },
  {
    id: 21,
    name: "LangSmith",
    logo: "assets/logos/langsmith.png",
    level: "Beginner",
    featured: true,
  },
  {
    id: 22,
    name: "MCP",
    logo: "assets/logos/mcp.png",
    level: "Beginner",
    featured: true,
  },
  {
    id: 23,
    name: "RAG Pipelines",
    logo: "assets/logos/rag.png",
    level: "Intermediate",
    featured: true,
  },
  {
    id: 24,
    name: "Embeddings",
    logo: "assets/logos/embeddings.png",
    level: "Intermediate",
    featured: true,
  },
  {
    id: 25,
    name: "Streamlit",
    logo: "assets/logos/streamlit.png",
    level: "Intermediate",
  },
  {
    id: 26,
    name: "FAISS",
    logo: "assets/logos/faiss.png",
    level: "Intermediate",
    featured: true,
  },
  {
    id: 27,
    name: "ChromaDB",
    logo: "assets/logos/chromadb.png",
    level: "Intermediate",
    featured: true,
  },
  {
    id: 28,
    name: "Docker",
    logo: "assets/logos/docker.png",
    level: "Intermediate",
  },
  {
    id: 29,
    name: "AWS",
    logo: "assets/logos/aws.png",
    level: "Intermediate",
  },
  {
    id: 30,
    name: "MySQL",
    logo: "assets/logos/mysql.png",
    level: "Intermediate",
  },
  {
    id: 31,
    name: "Pandas",
    logo: "assets/logos/pandas.png",
    level: "Intermediate",
  },
  {
    id: 32,
    name: "NumPy",
    logo: "assets/logos/numpy.png",
    level: "Intermediate",
  },
  {
    id: 33,
    name: "Scikit-learn",
    logo: "assets/logos/scikit-learn.png",
    level: "Beginner",
  },
  {
    id: 34,
    name: "TensorFlow",
    logo: "assets/logos/tensorflow.png",
    level: "Beginner",
    featured: true,
  },
  {
    id: 1,
    name: "JavaScript",
    logo: "assets/logos/JavaScript-logo.png",
    level: "Advanced",
  },
  {
    id: 2,
    name: "React.js",
    logo: "assets/logos/react-logo.png",
    level: "Advanced",
  },
  {
    id: 3,
    name: "Node.js",
    logo: "assets/logos/nodejs-logo.svg",
    level: "Advanced",
  },
  {
    id: 4,
    name: "MongoDB",
    logo: "assets/logos/mongodb.svg",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Express.js",
    logo: "assets/logos/express-js.png",
    level: "Advanced",
  },
  {
    id: 6,
    name: "Sqlite",
    logo: "assets/logos/sqlite.png",
    level: "Advanced",
  },
  {
    id: 7,
    name: "DSA",
    logo: "assets/logos/dsa_logo.webp",
    level: "Intermediate",
  },
  {
    id: 11,
    name: "Java",
    logo: "assets/logos/java.png",
    level: "Intermediate",
  },
  {
    id: 8,
    name: "C++",
    logo: "assets/logos/c++.png",
    level: "Intermediate",
  },
  {
    id: 9,
    name: "Next.js",
    logo: "assets/logos/nextjs.png",
    level: "Intermediate",
  },
  {
    id: 10,
    name: "TypeScript",
    logo: "assets/logos/typescript.png",
    level: "Intermediate",
  },
  // Add more skills
];
