import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
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
          <CardContent className="p-6">
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

              <div>
                <p className="text-lg text-muted-foreground mb-4">
                  Hi, I'm{" "}
                  <span className="font-semibold px-1">
                    Sri Krishna Chaithanya Raj Masimukku
                  </span>
                  , a MERN stack developer passionate about creating scalable
                  web applications. I have worked on diverse projects, honing my
                  skills in MongoDB, Express.js, React, and Node.js.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  My journey began in{" "}
                  <span className="font-semibold px-1">2022</span>, and I
                  continue learning to stay at the forefront of web development
                  trends.
                </p>
                <p className="text-lg text-muted-foreground">
                  Beyond coding, I enjoy watching anime and exploring new
                  technologies.{" "}
                  <span className="italic font-semibold">
                    I believe in using my skills to help others and make their
                    lives easier and more fulfilling.
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default About;
