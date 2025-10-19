import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code,
  Volume2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { skills, type Skill } from "../data/skills";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioRef = useRef<{ play: () => void } | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element with a subtle click sound
    // Using Web Audio API to generate a simple beep
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const audioContext = new AudioContextClass();

    const createClickSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    // Store the function in the ref
    audioRef.current = { play: createClickSound };
  }, []);

  const playScrollSound = () => {
    if (audioRef.current?.play) {
      try {
        audioRef.current.play();
        setIsPlayingSound(true);
        setTimeout(() => setIsPlayingSound(false), 150);
      } catch {
        // Silently handle if audio play fails
      }
    }
  };

  return (
    <section id="about" className="py-4 md:py-8 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main About Section - Now with Skills on Right for Large Devices */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Side - Profile Image + Text (70% on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Simple border */}
                <div className="relative rounded-full border border-surface-30 p-1 transition-all duration-normal group-hover:border-primary-0">
                  <img
                    src="assets/profile.jpg"
                    alt="Sri Krishna Chaithanya Raj"
                    className="rounded-full h-48 w-48 md:h-64 md:w-64 object-cover"
                  />
                </div>

                {/* Social media links that appear on hover */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-normal bg-surface-0/90">
                  <a
                    href="https://github.com/mskchaithanyaraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-0 text-surface-0 p-3 rounded-full hover:scale-110 transition-transform duration-fast"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mskchaithanyaraj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-info-0 text-surface-0 p-3 rounded-full hover:scale-110 transition-transform duration-fast"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://leetcode.com/u/mskchaithanyaraj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-warning-0 text-surface-0 p-3 rounded-full hover:scale-110 transition-transform duration-fast"
                    title="LeetCode Profile"
                  >
                    <Code size={20} />
                  </a>
                  <a
                    href="https://x.com/mskchaithanya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-0 text-surface-0 p-3 rounded-full hover:scale-110 transition-transform duration-fast"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-primary-0 leading-tight">
                <Typewriter
                  words={["Hi, I'm Chaithu :)"]}
                  cursor
                  cursorStyle="❤"
                  typeSpeed={90}
                />
              </h1>

              <p className="text-primary-30 leading-relaxed text-base md:text-lg">
                I build{" "}
                <span className="font-semibold text-primary-0">cool stuff</span>{" "}
                on the web that people actually want to use.{" "}
                <span className="font-medium">I am a</span> developer who loves
                turning{" "}
                <span className="font-semibold italic text-primary-0">
                  ideas into reality
                </span>{" "}
                (and fixing{" "}
                <span className="font-mono text-sm border border-surface-30 px-2 py-1 rounded">
                  bugs at 2 AM
                </span>
                ).
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="#projects"
                  className="px-5 py-2.5 bg-primary-0 text-surface-0 rounded-md hover:bg-primary-20 transition-all duration-normal font-medium"
                >
                  See My Work
                </a>

                <a
                  href="assets/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-surface-30 text-primary-0 rounded-md hover:border-primary-0 transition-all duration-normal font-medium inline-flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  View Resume
                </a>

                <a
                  href="assets/resume.pdf"
                  download="Sri_Krishna_Resume.pdf"
                  className="px-5 py-2.5 border border-success-0 text-success-0 rounded-md hover:border-success-10 transition-all duration-normal font-medium inline-flex items-center gap-2"
                >
                  <Download size={18} />
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Apple-Style Skills Carousel (30% on large screens) */}
          <div className="lg:col-span-5">
            <AppleStyleSkillsCarousel
              skills={skills}
              activeIndex={activeSkillIndex}
              setActiveIndex={setActiveSkillIndex}
              onScroll={playScrollSound}
              setIsModalOpen={setIsModalOpen}
              isPlayingSound={isPlayingSound}
            />

            {/* Additional Info for MD/LG screens only */}
            <div className="hidden md:block mt-6 space-y-4">
              <div className="border border-surface-30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-primary-0 mb-2">
                  Quick Stats
                </h3>
                <div className="space-y-2 text-xs text-primary-30">
                  <div className="flex justify-between items-center">
                    <span>Total Skills</span>
                    <span className="font-medium text-primary-0">
                      {skills.length}+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Advanced Level</span>
                    <span className="font-medium text-primary-0">
                      {skills.filter((s) => s.level === "Advanced").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Intermediate Level</span>
                    <span className="font-medium text-primary-0">
                      {skills.filter((s) => s.level === "Intermediate").length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-surface-30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-primary-0 mb-2">
                  Currently Learning
                </h3>
                <p className="text-xs text-primary-30">
                  Always exploring new technologies and frameworks to stay ahead
                  in the ever-evolving tech landscape.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-surface-0/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-surface-0 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-surface-30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-surface-20">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary-0">
                  All My Skills
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-primary-30 hover:text-primary-0 transition-colors duration-fast p-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              className="p-6 overflow-y-auto scrollbar-minimal"
              style={{ maxHeight: "60vh" }}
            >
              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-3 p-3 rounded-md border border-surface-30"
                  >
                    <img
                      src={skill.logo || "placeholder.png"}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "placeholder.png";
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-sm text-primary-0">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-primary-40">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Proof of Work Section */}
              <div className="border border-surface-30 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-primary-0 mb-2">
                  Need proof of work?
                </h4>
                <p className="text-sm text-primary-30 mb-3">
                  Well, I do have{" "}
                  <a
                    href="#certifications"
                    onClick={() => setIsModalOpen(false)}
                    className="text-primary-0 hover:opacity-80 underline decoration-dotted underline-offset-4 font-medium transition-opacity duration-fast"
                  >
                    certifications
                  </a>{" "}
                  (because who doesn't love a good certificate, right?), but
                  more than that, I have actual projects that you can check out!
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#experience"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center px-3 py-1.5 border border-surface-30 text-primary-0 rounded-md hover:border-primary-0 transition-all duration-normal text-xs font-medium"
                  >
                    Work Experience
                  </a>
                  <a
                    href="#projects"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center px-3 py-1.5 border border-surface-30 text-primary-0 rounded-md hover:border-primary-0 transition-all duration-normal text-xs font-medium"
                  >
                    All Projects
                  </a>
                </div>
              </div>

              {/* Contact Message */}
              <div className="border border-surface-30 rounded-lg p-4">
                <h4 className="font-semibold text-primary-0 mb-2">
                  Looking for a specific skill?
                </h4>
                <p className="text-sm text-primary-30 mb-3">
                  Don't see what you're looking for? I'm always happy to learn
                  new technologies and skills! As a quick learner, I can adapt
                  to new tools and frameworks based on project requirements.
                </p>
                <a
                  href="#contact"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center text-sm text-primary-0 hover:opacity-80 font-medium transition-opacity duration-fast"
                >
                  Get in touch →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

// Apple-Style Skills Carousel Component
const AppleStyleSkillsCarousel = ({
  skills,
  activeIndex,
  setActiveIndex,
  onScroll,
  setIsModalOpen,
  isPlayingSound,
}: {
  skills: Skill[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onScroll: () => void;
  setIsModalOpen: (open: boolean) => void;
  isPlayingSound: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 120; // Width of each skill card + gap
    const centerOffset = container.offsetWidth / 2;

    // Calculate which skill is in the center
    const newIndex = Math.round(
      (scrollLeft + centerOffset - itemWidth / 2) / itemWidth
    );
    const clampedIndex = Math.max(0, Math.min(skills.length - 1, newIndex));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);

      // Play sound only if scroll distance is significant (prevents spam)
      const scrollDelta = Math.abs(scrollLeft - lastScrollRef.current);
      if (scrollDelta > 20) {
        onScroll();
        lastScrollRef.current = scrollLeft;
      }
    }
  };

  // Smooth scroll to center active skill
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemWidth = 120;
    const centerOffset = container.offsetWidth / 2;
    const targetScroll = index * itemWidth - centerOffset + itemWidth / 2;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-primary-0">Skills</h2>
          {isPlayingSound && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Volume2 className="h-4 w-4 text-primary-30" />
            </motion.div>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-primary-30 hover:text-primary-0 underline decoration-dotted underline-offset-4 transition-colors duration-normal"
        >
          View All
        </button>
      </div>

      {/* Scrollable Skills Container */}
      <div className="relative flex-1 min-h-[250px] md:min-h-[250px] flex items-center">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface-0 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface-0 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="overflow-x-scroll scrollbar-hide w-full py-8 px-12"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            className="flex gap-6 items-center"
            style={{ width: "max-content" }}
          >
            {skills.map((skill, index) => {
              const distance = Math.abs(index - activeIndex);
              const isActive = index === activeIndex;

              // Calculate scale and opacity based on distance from center
              const scale = isActive ? 1.2 : Math.max(0.7, 1 - distance * 0.15);
              const opacity = isActive ? 1 : Math.max(0.4, 1 - distance * 0.2);

              return (
                <motion.div
                  key={skill.id}
                  onClick={() => setActiveIndex(index)}
                  className="flex-shrink-0"
                  style={{
                    scrollSnapAlign: "center",
                  }}
                  animate={{
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div
                    className={`w-24 p-4 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "border-primary-0 bg-surface-0 shadow-lg"
                        : "border-surface-30 bg-surface-0"
                    }`}
                  >
                    {/* Logo */}
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img
                          src={skill.logo || "placeholder.png"}
                          alt={skill.name}
                          className="w-10 h-10 object-contain transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "placeholder.png";
                          }}
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      className={`text-xs font-medium text-center mb-2 leading-tight transition-colors duration-300 ${
                        isActive ? "text-primary-0" : "text-primary-30"
                      }`}
                    >
                      {skill.name}
                    </h3>

                    {/* Level tag */}
                    <div className="flex justify-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                          isActive
                            ? "border-primary-0 text-primary-0"
                            : "border-surface-30 text-primary-40"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicators (Dots) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pb-2">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary-0 w-4"
                  : "bg-surface-30 hover:bg-surface-40"
              }`}
              aria-label={`Go to skill ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Active Skill Name Display */}
      <div className="text-center mt-4">
        <p className="text-sm text-primary-30">
          Scroll to explore •{" "}
          <span className="font-medium text-primary-0">
            {skills[activeIndex]?.name}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default About;
