import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="min-h-screen py-20 relative overflow-hidden flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <motion.div
                className="flex justify-center relative order-2 md:order-1"
                variants={itemVariants}
              >
                {/* Animated profile image with rotating gradient border */}
                <div className="relative group scale-110">
                  {/* Rotating gradient border */}
                  <div
                    className={`absolute inset-0 rounded-full p-1 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                    } animate-spin-slow blur-sm opacity-80`}
                  />

                  {/* Profile image */}
                  <div className="relative rounded-full p-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-primary transition-all duration-500">
                    <div className="rounded-full p-1 bg-background">
                      <img
                        src="assets/profile.jpg"
                        alt="Sri Krishna Chaithanya Raj"
                        className="rounded-full h-64 w-64 object-cover"
                      />
                    </div>
                  </div>

                  {/* Social media links that appear on hover */}
                  <div className="absolute inset-0 rounded-full flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <a
                      href="https://github.com/mskchaithanyaraj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mskchaithanyaraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#0077b5] p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://leetcode.com/u/mskchaithanyaraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FFA116] p-3 rounded-full hover:scale-110 transition-transform"
                      title="LeetCode Profile"
                    >
                      <Code size={20} />
                    </a>
                    <a
                      href="https://x.com/mskchaithanya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-8 order-2 md:order-2"
                variants={itemVariants}
              >
                <h1
                  className="font-bold max-sm:text-center text-5xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight"
                  style={{ fontFamily: "Barriecito, cursive" }}
                >
                  <Typewriter
                    words={["Hi, I'm Chaithu  :)"]}
                    cursor
                    cursorStyle="❤"
                    typeSpeed={90}
                  />
                </h1>

                <p className="text-foreground/80 leading-relaxed text-lg">
                  I build <span className="font-semibold">cool stuff</span> on
                  the web that people actually want to use.{" "}
                  <span className="font-medium">I am a</span> developer who
                  loves turning{" "}
                  <span className="font-semibold italic">
                    ideas into reality
                  </span>{" "}
                  (and fixing{" "}
                  <span className="font-mono text-sm bg-foreground/5 px-2 py-1 rounded">
                    bugs at 2 AM
                  </span>
                  ).
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary/40 to-purple-600 hover:from-primary/90 hover:to-purple-600/50 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 dark:text-white dark:border-primary/40"
                  >
                    <a href="#projects">See My Work</a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10 group"
                  >
                    <a
                      href="assets/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink
                        size={20}
                        className="mr-2 group-hover:scale-110 transition-transform"
                      />
                      View Resume
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-green-500 text-green-500 hover:bg-green-500/10 group"
                  >
                    <a
                      href="assets/resume.pdf"
                      download="Sri_Krishna_Resume.pdf"
                    >
                      <Download
                        size={20}
                        className="mr-2 group-hover:scale-110 transition-transform"
                      />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default About;
