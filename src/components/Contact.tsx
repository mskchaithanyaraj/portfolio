import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

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

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          Contact Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div className="mb-4">
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
                      className="text-foreground"
                    />
                  </div>
                  <div className="mb-4">
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
                    />
                  </div>
                  <div className="mb-6">
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
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Connect with me
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/msk-chaithanya-raj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary-focus"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/krishna-chaithanya-masimukku/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary-focus"
                >
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/SriKris84075274"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary-focus"
                >
                  <FaTwitter className="mr-2" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
