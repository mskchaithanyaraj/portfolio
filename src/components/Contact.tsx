import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";
import { Send, Loader2 } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current as HTMLFormElement,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      toast.success("Message sent successfully!");
      setFormData({ from_name: "", reply_to: "", message: "" });
    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error("Email failed to send:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-20 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-extrabold text-foreground mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">Contact Me</span>
          <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="overflow-hidden border-none shadow-xl bg-card/60 backdrop-blur-sm h-full">
              <CardContent className="p-6 md:p-8">
                <motion.h3
                  className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text"
                  variants={itemVariants}
                >
                  Send Me a Message
                </motion.h3>

                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="from_name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="from_name"
                      placeholder="Your Name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="reply_to"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="reply_to"
                      placeholder="Your Email"
                      value={formData.reply_to}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="overflow-hidden border-none shadow-xl bg-card/60 backdrop-blur-sm h-full">
              <CardContent className="p-6 md:p-8">
                <motion.h3
                  className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text"
                  variants={itemVariants}
                >
                  Connect with Me
                </motion.h3>

                <motion.div className="space-y-6" variants={itemVariants}>
                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 p-px">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 animate-gradient-x opacity-20" />
                    <div className="relative bg-background/80 backdrop-blur-sm p-5 rounded-lg">
                      <h4 className="text-lg font-medium mb-4 text-foreground">
                        Social Profiles
                      </h4>
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="https://github.com/mskchaithanyaraj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-foreground hover:text-primary transition-colors group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                              <FaGithub className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="block font-medium">GitHub</span>
                              <span className="text-sm text-muted-foreground">
                                @mskchaithanyaraj
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/in/mskchaithanyaraj/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-foreground hover:text-primary transition-colors group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                              <FaLinkedin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="block font-medium">
                                LinkedIn
                              </span>
                              <span className="text-sm text-muted-foreground">
                                @mskchaithanyaraj
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://leetcode.com/u/mskchaithanyaraj/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-foreground hover:text-primary transition-colors group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                              <FaCode className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="block font-medium">
                                LeetCode
                              </span>
                              <span className="text-sm text-muted-foreground">
                                @mskchaithanyaraj
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://x.com/mskchaithanya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-foreground hover:text-primary transition-colors group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                              <FaTwitter className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="block font-medium">Twitter</span>
                              <span className="text-sm text-muted-foreground">
                                @mskchaithanya
                              </span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
