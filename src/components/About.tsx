import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";
import "../styles/globals.css";

const About = () => {
  const { theme } = useTheme();
  return (
    <motion.section
      id="about"
      className="py-20 bg-muted"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          About Me
        </h2>
        <Card>
          <CardContent className="p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="flex justify-center relative">
                {/* Gradient Dotted Circle for Dark Theme */}
                {theme === "dark" && (
                  <div
                    className="absolute top-[-8px] h-52 w-52 rounded-full animate-spin-slow"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #1e3a8a, #3b82f6, #2563eb, #1e3a8a)",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent 80%, black 100%)",
                      mask: "radial-gradient(closest-side, transparent 80%, black 100%)",
                    }}
                  ></div>
                )}

                {/* Ocean Blue Gradient Dotted Circle for Light Theme */}
                {theme === "light" && (
                  <div
                    className="absolute top-[-8px] h-52 w-52 rounded-full animate-spin-slow"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #00bfff, #87cefa, #1e90ff, #00bfff)",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent 80%, black 100%)",
                      mask: "radial-gradient(closest-side, transparent 80%, black 100%)",
                    }}
                  ></div>
                )}
                {/* Profile Image */}
                <img
                  src="/assets/profile.jpg"
                  alt="Developer"
                  className="rounded-full shadow-lg h-48 w-48 object-cover z-10"
                />
              </div>

              <div className="text-center space-y-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  <Typewriter
                    words={["Hi, I'm Sri Krishna Chaithanya Raj Masimukku"]}
                    cursor
                    cursorStyle="❤"
                    typeSpeed={90} // Smooth typing
                  />
                </h1>

                <p className="text-lg bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                  My journey began in{" "}
                  <span className="text-2xl font-semibold ">2022</span>, and I
                  continue learning to stay at the forefront of web development
                  trends.
                </p>

                <a
                  href="#projects"
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-2xl hover:scale-105 transition-transform shadow-md inline-block"
                >
                  See My Work
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default About;
