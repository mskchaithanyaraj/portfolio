import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";
import { Send, Loader2, Mail } from "lucide-react";
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
    <section id="contact" className="py-20 bg-surface-0 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-primary-0 mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">Contact Me</span>
          <span className="h-px flex-grow bg-surface-30" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="overflow-hidden border border-surface-30 rounded-lg bg-surface-0 h-full">
              <div className="p-6 md:p-8">
                <motion.h3
                  className="text-xl font-semibold mb-6 text-primary-0"
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
                      className="block text-sm font-medium text-primary-0 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      placeholder="Your Name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-surface-0 border border-surface-30 rounded-md text-primary-0 focus:border-primary-0 focus:outline-none transition-all duration-normal"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="reply_to"
                      className="block text-sm font-medium text-primary-0 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="reply_to"
                      placeholder="Your Email"
                      value={formData.reply_to}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-surface-0 border border-surface-30 rounded-md text-primary-0 focus:border-primary-0 focus:outline-none transition-all duration-normal"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary-0 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[120px] px-4 py-2 bg-surface-0 border border-surface-30 rounded-md text-primary-0 focus:border-primary-0 focus:outline-none transition-all duration-normal resize-none"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-primary-0 hover:bg-primary-20 text-surface-0 rounded-md transition-all duration-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    </button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="overflow-hidden border border-surface-30 rounded-lg bg-surface-0 h-full">
              <div className="p-6 md:p-8">
                <motion.h3
                  className="text-xl font-semibold mb-6 text-primary-0"
                  variants={itemVariants}
                >
                  Connect with Me
                </motion.h3>

                <motion.div className="space-y-6" variants={itemVariants}>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="mailto:mskchaithanyaraj@gmail.com"
                        className="flex items-center text-primary-0 hover:text-primary-20 transition-all duration-normal group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-30 mr-3 group-hover:border-primary-0 transition-all duration-normal">
                          <Mail className="w-5 h-5 text-primary-0" />
                        </div>
                        <div>
                          <span className="block font-medium">Gmail</span>
                          <span className="text-sm text-primary-30">
                            mskchaithanyaraj@gmail.com
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/mskchaithanyaraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-0 hover:text-primary-20 transition-all duration-normal group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-30 mr-3 group-hover:border-primary-0 transition-all duration-normal">
                          <FaGithub className="w-5 h-5 text-primary-0" />
                        </div>
                        <div>
                          <span className="block font-medium">GitHub</span>
                          <span className="text-sm text-primary-30">
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
                        className="flex items-center text-primary-0 hover:text-primary-20 transition-all duration-normal group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-30 mr-3 group-hover:border-primary-0 transition-all duration-normal">
                          <FaLinkedin className="w-5 h-5 text-primary-0" />
                        </div>
                        <div>
                          <span className="block font-medium">LinkedIn</span>
                          <span className="text-sm text-primary-30">
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
                        className="flex items-center text-primary-0 hover:text-primary-20 transition-all duration-normal group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-30 mr-3 group-hover:border-primary-0 transition-all duration-normal">
                          <FaCode className="w-5 h-5 text-primary-0" />
                        </div>
                        <div>
                          <span className="block font-medium">LeetCode</span>
                          <span className="text-sm text-primary-30">
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
                        className="flex items-center text-primary-0 hover:text-primary-20 transition-all duration-normal group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-30 mr-3 group-hover:border-primary-0 transition-all duration-normal">
                          <FaTwitter className="w-5 h-5 text-primary-0" />
                        </div>
                        <div>
                          <span className="block font-medium">Twitter</span>
                          <span className="text-sm text-primary-30">
                            @mskchaithanya
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
