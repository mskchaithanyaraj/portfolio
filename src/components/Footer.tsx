import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Sri Krishna Chaithanya Raj
              Masimukku. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-4">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-foreground"
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="text-muted-foreground hover:text-foreground"
            >
              Certifications
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </nav>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a
              href="https://github.com/msk-chaithanya-raj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary-focus"
            >
              <FaGithub className="mr-2" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-chaithanya-masimukku/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary-focus"
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </a>
            <a
              href="https://x.com/SriKris84075274"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary-focus"
            >
              <FaTwitter className="mr-2" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
