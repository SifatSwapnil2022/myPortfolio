import { useState, useEffect, ReactNode } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Database,
  Globe,
  FileText,
  ArrowRight,
  CheckCircle2,
  Play,
  X,
  Menu,
  Download,
  GraduationCap,
  Star,
  BookOpen,
  User,
  Briefcase,
  HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  venueType: 'journal' | 'conference';
  link: string;
  highlight: string;
}

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  metric: string;
  github: string;
  website?: string;
  paperLink?: string;
  image: string;
  icon: ReactNode;
  videoSrc?: string;
}

interface NewsItem {
  id: string;
  date: string;
  content: string;
  link?: string;
  linkText?: string;
}

// --- Data ---

const PUBLICATIONS: Publication[] = [
  {
    id: "01",
    title: "AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures",
    authors: "Md. Sifatullah Sheikh et al.",
    venue: "IEEE International Conference on Big Data Analytics and Practices (IBDAP 2025)",
    venueType: "conference",
    link: "https://ieeexplore.ieee.org/abstract/document/11145852",
    highlight:
      "Evaluated three CNN architectures and a Vision Transformer for deepfake detection. MobileNetV3-based VFDNET achieved strong performance through efficient feature extraction and data augmentation techniques."
  },
  {
    id: "02",
    title: "DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection",
    authors: "Md. Sifatullah Sheikh et al.",
    venue: "IEEE Access (Q1 Journal)",
    venueType: "journal",
    // FIX #3: Corrected paper link to match PUBLICATIONS data (was 10534246, correct is 11303744)
    link: "https://ieeexplore.ieee.org/document/11303744",
    highlight:
      "Proposed DeFaX, a cross-attention fusion framework integrating Swin Transformer and EfficientNet. Achieved 99.8% accuracy and AUC 1.000 on the 140K real–fake face dataset with Grad-CAM and LIME for explainable AI."
  }
];

const PROJECTS: Project[] = [
  {
    id: "medileaf",
    title: "MediLeafNET",
    tag: "Computer Vision / Health",
    description: "A multimodal deep learning system for identifying 11 species (data collection of 3200 images) of medicinal plants with high precision.",
    longDescription: "MediLeafNET is a comprehensive research project aimed at digitizing traditional medicinal knowledge. It uses a custom-built dataset and a dual-stream CNN-Transformer architecture to identify plants from leaf images, even in cluttered backgrounds.",
    features: [
      "Multimodal feature extraction",
      "Real-time mobile inference",
      "Database of 11 medicinal species",
      "Explainable AI heatmaps"
    ],
    tech: ["PyTorch", "React Native", "Flask", "OpenCV"],
    metric: "96.22% Accuracy",
    github: "https://github.com/SifatSwapnil2022/MediLeafNET",
    image: "/image/Medileafnet_intro.png",
    icon: <Cpu className="w-6 h-6" />,
    videoSrc: "/videos/MediLeafNET.mp4"
  },
  {
    id: "defax",
    title: "DeFaX",
    tag: "AI Safety / Research",
    description: "State-of-the-art deepfake detection framework published in IEEE Access, focusing on explainability.",
    longDescription: "DeFaX addresses the 'black box' problem in deepfake detection. By integrating Vision Transformers with CNNs, the system not only detects manipulated images but also highlights the specific facial regions that triggered the detection.",
    features: [
      "Transformer + CNN Hybrid backbone",
      "Cross-attention fusion mechanism",
      "Explainable AI (XAI) integration",
      "Robust against compression artifacts",
      "Cross-dataset validation"
    ],
    tech: ["TensorFlow", "Python", "Grad-CAM", "ViT", "CNNs"],
    metric: "99.80% Accuracy",
    github: "https://github.com/SifatSwapnil2022/Journal_DefaX_codes",
    // FIX #3: Corrected paperLink to match the correct IEEE document number (was 10534246)
    paperLink: "https://ieeexplore.ieee.org/document/11303744",
    image: "/image/defax_intro.png",
    icon: <CheckCircle2 className="w-6 h-6" />,
    videoSrc: "/videos/Defax.mp4"
  },
  {
    id: "bazario",
    title: "Bazario",
    tag: "Full-Stack / E-Commerce",
    description: "A multi-tenant e-commerce marketplace with advanced vendor management and real-time analytics.",
    longDescription: "Bazario is a production-ready marketplace platform. It features a complex multi-vendor architecture, real-time inventory tracking, and a custom-built analytics dashboard for sellers.",
    features: [
      "Multi-vendor architecture",
      "Real-time inventory sync",
      "Advanced search & filtering",
      "Vendor analytics dashboard"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    metric: "50+ Active Users",
    github: "https://github.com/SifatSwapnil2022/bazario-A-multi-tenant-Ecommerce-Platform",
    website: "https://bazario.ltd/",
    image: "/image/bazario_intro.png",
    icon: <Layers className="w-6 h-6" />,
    videoSrc: "/videos/Bazario.mp4"
  },
  {
    id: "skincare-ai",
    title: "SkinCare AI",
    tag: "Healthcare AI / Computer Vision",
    description: "An end-to-end AI healthcare platform for skin disease detection using deep learning ensembles with LLM-powered medical recommendations.",
    longDescription: "SkinCare AI is an intelligent clinical support system that analyzes skin images, classifies diseases through a multi-model ensemble, and generates human-readable recommendations using Large Language Models. It combines Computer Vision, NLP, and cloud deployment into one modular healthcare solution.",
    features: [
      "10-class skin disease classification",
      "EfficientNetB0 + MobileNetV2 + ResNet50",
      "YOLOv8 lesion localization",
      "LLM-powered health recommendations",
      "PDF medical report generation",
      "Authentication, dashboard & history system"
    ],
    tech: [
      "Python",
      "FastAPI",
      "Streamlit",
      "TensorFlow",
      "PyTorch",
      "YOLOv8",
      "MongoDB",
      "Docker"
    ],
    metric: "High Accuracy Multi-Model System",
    github: "https://github.com/SifatSwapnil2022/SkinCareAI",
    // FIX #2: Removed incorrect "/public" prefix from image and video paths
    image: "/image/skincare_intro.png",
    icon: <HeartPulse className="w-6 h-6" />,
    videoSrc: "/videos/SkinCareAI.mp4"
  }
];

const NEWS: NewsItem[] = [
  {
    id: "1",
    date: "January 2026",
    content: "Graduated with a BSc in Computer Science & Engineering from East West University with a GPA of 3.70."
  },
  {
    id: "2",
    date: "December 2025",
    content: "Our research paper 'DeFaX' was published in IEEE Access, a prestigious Q1 journal.",
    link: "https://ieeexplore.ieee.org/document/11303744",
    linkText: "Read Paper"
  },
  {
    id: "3",
    date: "Oct 2024",
    content: "Awarded 3rd place in the IT Olympiad at National Robo-Fest 2024."
  }
];

// --- Components ---

const SectionHeader = ({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) => (
  <div className="mb-16">
    <div className="text-rust font-bold text-xs uppercase tracking-[0.2em] mb-4">{tag}</div>
    <h2 className="text-4xl md:text-5xl font-serif text-ink mb-6" dangerouslySetInnerHTML={{ __html: title }} />
    {subtitle && <p className="text-ink/50 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-warm-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 right-0 p-6 flex justify-end z-10 pointer-events-none">
          <button
            onClick={onClose}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full text-ink hover:bg-rust hover:text-white transition-all shadow-lg pointer-events-auto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative h-64 md:h-96">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent" />
        </div>

        <div className="p-8 md:p-12 -mt-20 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-rust">
              {project.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-ink/40">{project.tag}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-ink">{project.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rust" /> Overview
                </h3>
                <p className="text-ink/70 leading-relaxed text-lg">
                  {project.longDescription}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-rust" /> Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink/60 bg-cream/50 p-4 rounded-xl border border-sand/20">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rust shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-cream p-8 rounded-3xl border border-sand/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-rust" /> Project Demo
                </h3>
                {project.videoSrc ? (
                  <video
                    key={project.videoSrc}
                    controls
                    className="w-full rounded-2xl border border-sand/20 bg-ink/5"
                    preload="metadata"
                  >
                    <source
                      src={project.videoSrc}
                      type={
                        project.videoSrc.endsWith('.mp4') ? 'video/mp4' :
                        project.videoSrc.endsWith('.webm') ? 'video/webm' :
                        'video/mp4'
                      }
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="aspect-video bg-ink/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-sand">
                    <div className="text-center p-8">
                      <Play className="w-12 h-12 text-rust/40 mx-auto mb-4" />
                      <p className="text-ink/40 font-medium">Demo video placeholder</p>
                      <p className="text-xs text-ink/30 mt-2">Visit GitHub for full video demonstrations</p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[11px] font-bold bg-sand/10 px-3 py-1.5 rounded-full border border-sand/30 text-ink/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">Performance</h4>
                <div className="text-2xl font-serif text-rust">{project.metric}</div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-ink text-white py-4 rounded-xl font-bold hover:bg-rust transition-colors"
                >
                  <Github className="w-5 h-5" /> View on GitHub
                </a>
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white border border-ink/10 text-ink py-4 rounded-xl font-bold hover:bg-cream transition-colors"
                  >
                    <Globe className="w-5 h-5" /> Live Website
                  </a>
                )}
                {project.paperLink && (
                  <a
                    href={project.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white border border-ink/10 text-ink py-4 rounded-xl font-bold hover:bg-cream transition-colors"
                  >
                    <FileText className="w-5 h-5" /> Read Paper
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  // FIX #1: Added missing useState and useEffect imports at top of file (now properly imported)
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-rust/20 selection:text-rust">
      {/* --- Navigation --- */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 h-20 flex items-center justify-between",
        isScrolled ? "bg-cream/90 backdrop-blur-md border-b border-ink/5 h-16" : "bg-transparent"
      )}>
        <a href="#" className="font-serif text-2xl tracking-tight text-ink">
          Sifat<span className="text-rust">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["About", "Experience", "Research", "Projects", "News", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-semibold tracking-widest uppercase text-ink/50 hover:text-rust transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="/cv/CV_SIFATULLAH_SHEIKH.pdf"
            download
            className="bg-ink text-cream px-6 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase hover:bg-rust transition-all"
          >
            CV <Download className="inline-block w-3 h-3 ml-1" />
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {["About", "Experience", "Research", "Projects", "News", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-4xl text-ink"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-rust/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-sand/10 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-sand/20 border border-sand/40 px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-rust rounded-full animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-rust">Open to Opportunities</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl text-ink leading-[0.9] tracking-tighter mb-6">
              Md Sifatullah <br />
              <span className="italic text-rust">Sheikh</span>
            </h1>

            <p className="text-ink/50 font-medium tracking-wide mb-8 text-lg">
              CSE Graduate · Interested in AI/ML Research · Learner
            </p>

            <p className="text-ink/70 text-lg leading-relaxed max-w-lg mb-10">
              Hello! I am a CSE graduate passionate about Machine Learning,
              Artificial Intelligence, and intelligent systems.
              My work focuses on developing AI-driven solutions, including deep learning, computer vision, LLMs
              and natural language processing.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-ink text-cream px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-rust transition-all group">
                View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-sand text-ink px-8 py-4 rounded-full font-semibold hover:border-rust hover:text-rust transition-all">
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="aspect-[4/5] w-full max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-sand/20 rounded-[2rem] rotate-3 -z-10" />
              <div className="absolute inset-0 bg-ink/5 rounded-[2rem] -rotate-2 -z-10" />
              <div className="w-full h-full bg-sand/30 rounded-[2rem] overflow-hidden border-4 border-cream shadow-2xl">
                <img src="/image/myself.jpg" alt="Md Sifatullah Sheikh" className="w-full h-full object-cover object-top" />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-cream p-6 rounded-2xl shadow-xl border border-ink/5 max-w-[200px]">
                <div className="text-rust font-serif text-2xl mb-1">IEEE</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-ink/60 leading-tight">
                  Published Author
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 bg-warm-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="About Me"
            title="The person behind the <em>research</em>"
          />

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
              <p>
                My interest in computers began early, driven by curiosity about how complex systems work. This curiosity evolved into a strong commitment during my Bachelor's degree in Computer Science and Engineering at East West University, where I developed a passion for problem-solving, research, and system design.

                Through my academic and research journey, I have worked on projects involving deep learning, computer vision, and AI-driven applications. I enjoy exploring innovative ideas and building intelligent systems that bridge research with practical solutions.
              </p>
              <p>
                During my undergraduate years, I worked as a Research Assistant developing <strong>DeFaX</strong> — a deepfake detection framework that achieved near-perfect accuracy and was published in IEEE Access (Q1 Journal).
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { label: "Location", value: "Dhaka, BD" },
                  { label: "Degree", value: "BSc in CSE" },
                  { label: "Status", value: "Available", color: "text-green-600" },
                  { label: "Rating", value: "2-Star CodeChef" }
                ].map((item) => (
                  <div key={item.label} className="bg-cream border border-ink/5 p-4 rounded-xl">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-ink/40 mb-1">{item.label}</div>
                    <div className={cn("font-semibold text-ink", item.color)}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              {[
                { title: "AI / ML", skills: ["PyTorch", "TensorFlow", "ViT", "CNNs", "Hugging Face", "BERT", "OpenCV"] },
                { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "React Native", "Figma"] },
                { title: "Backend & Data", skills: ["Node.js", "Flask", "MongoDB", "PostgreSQL", "Python"] }
              ].map((group) => (
                <div key={group.title}>
                  <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-ink/40 mb-4 border-b border-ink/5 pb-2">
                    {group.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="bg-sand/10 border border-sand/30 px-3 py-1 rounded-full text-xs font-medium text-ink/70 hover:bg-rust hover:text-cream hover:border-rust transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Experience Section --- */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Experience"
            title="Where I've <em>worked</em>"
            subtitle="Research and professional experience building AI systems that matter."
          />

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cream border border-ink/5 rounded-[2rem] p-8 md:p-10 hover:shadow-2xl hover:shadow-ink/5 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8">

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-rust text-cream rounded-2xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-7 h-7" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">

                  {/* Title + Date */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-serif text-2xl text-ink group-hover:text-rust transition-colors">
                        Research Assistant
                      </h3>
                      <p className="text-ink/60 font-semibold mt-1">East West University</p>
                      <p className="text-ink/40 text-sm">Dhaka, Bangladesh</p>
                    </div>
                    <span className="inline-flex items-center bg-rust/10 text-rust px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap self-start">
                      Dec 2024 – Dec 2025
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-ink/5 my-6" />

                  {/* Bullet points */}
                  <ul className="space-y-4 mb-8">
                    {[
                      "Spearheaded research on AI-driven deepfake detection, engineering hybrid architectures utilising CNNs and Vision Transformers to identify synthetic media artifacts.",
                      "Co-authored and published two peer-reviewed papers at a prestigious IEEE conference and in an IEEE journal, validating the robustness of proposed deep learning frameworks."
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink/70 leading-relaxed">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Supervisor card */}
                  <div className="bg-warm-white border border-sand/30 rounded-2xl p-5">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink/40 mb-4">Supervisor</div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-ink">Al Imran</p>
                        <p className="text-ink/50 text-sm">Senior-Lecturer, Department of CSE, East West University</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href="mailto:al.imran@ewubd.edu"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink/60 bg-sand/10 border border-sand/30 px-3 py-1.5 rounded-full hover:border-rust hover:text-rust transition-all"
                        >
                          <Mail className="w-3 h-3" />
                          al.imran@ewubd.edu
                        </a>
                        <a
                          href="https://fse.ewubd.edu/computer-science-engineering/faculty-view/al.imran"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink/60 bg-sand/10 border border-sand/30 px-3 py-1.5 rounded-full hover:border-rust hover:text-rust transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Faculty Profile
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Research Section --- */}
      <section id="research" className="py-24 bg-warm-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Publications"
            title="Peer-reviewed <em>research</em>"
            subtitle="Published in Q1 journals and international IEEE conferences on AI safety and deepfake detection."
          />

          <div className="space-y-6">
            {PUBLICATIONS.map((pub) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-cream border border-ink/5 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:shadow-ink/5 transition-all"
              >
                <div className="font-serif text-5xl text-sand/40 leading-none">{pub.id}</div>
                <div className="flex-1">
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4",
                    pub.venueType === 'journal' ? "bg-rust text-cream" : "bg-green-600 text-cream"
                  )}>
                    {pub.venue}
                  </span>
                  <h3 className="font-serif text-2xl text-ink mb-3 leading-tight group-hover:text-rust transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-ink/50 text-sm mb-6">
                    {pub.authors.split('Md Sifatullah Sheikh').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <strong className="text-rust">Md Sifatullah Sheikh</strong>}
                      </span>
                    ))}
                  </p>
                  <div className="bg-sand/10 border-l-4 border-rust p-4 rounded-r-xl text-sm text-ink/70 mb-6 italic">
                    {pub.highlight}
                  </div>
                  {/* FIX #6: Added rel="noopener noreferrer" to external link */}
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-rust font-bold text-sm group/link">
                    View Publication <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Projects"
            title="Things I've <em>built</em>"
            subtitle="Research prototypes, production applications, and everything in between."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-cream border border-ink/5 p-8 rounded-3xl flex flex-col h-full hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-rust scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                <div className="w-12 h-12 bg-sand/20 rounded-xl flex items-center justify-center text-rust mb-6">
                  {project.icon}
                </div>

                <div className="text-[10px] font-bold tracking-widest uppercase text-ink/40 mb-2">{project.tag}</div>
                <h3 className="font-serif text-2xl text-ink mb-4">{project.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-bold bg-sand/10 px-2 py-1 rounded border border-sand/30 text-ink/60">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  {project.metric}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-2 bg-ink text-cream py-3 rounded-xl font-semibold text-sm hover:bg-rust transition-all group/btn"
                >
                  More details about the work
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Education Section --- */}
      <section id="education" className="py-24 bg-warm-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Education"
            title="Academic <em>background</em>"
          />

          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3">
              <div className="bg-cream border border-ink/5 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 bg-rust text-cream rounded-2xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-ink mb-2">BSc in Computer Science & Engineering</h3>
                  <p className="text-ink/50 mb-6">East West University, Dhaka, Bangladesh</p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <span className="bg-green-600/10 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                      <Star className="w-3 h-3" /> GPA 3.70 / 4.00
                    </span>
                    <span className="bg-sand/20 text-ink/60 px-4 py-1.5 rounded-full text-xs font-bold">
                      Jan 2022 – Jan 2026
                    </span>
                  </div>

                  <p className="text-ink/70 text-sm leading-relaxed">
                    <strong className="text-ink">Relevant Coursework:</strong> <br />
                    Data Structures & Algorithms, AI, Machine Learning, Data Mining, Computer Vision, Operating Systems, Database Design, IoT, Circuit Design.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h4 className="font-serif text-2xl text-ink mb-6">Languages</h4>
                <div className="bg-cream border border-ink/5 p-8 rounded-3xl space-y-6">
                  {[
                    { label: "English", level: "C1", width: "80%" },
                    { label: "Bengali", level: "Native", width: "100%" }
                  ].map(lang => (
                    <div key={lang.label}>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">
                        <span>{lang.label}</span>
                        <span>{lang.level}</span>
                      </div>
                      <div className="h-1.5 bg-sand/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: lang.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-rust rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-2xl text-ink mb-6">Awards</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🥉", title: "Robo-Fest", sub: "3rd Place IT Olympiad" },
                    { icon: "🏆", title: "Dean's List", sub: "Multiple Semesters" }
                  ].map(award => (
                    <div key={award.title} className="bg-cream border border-ink/5 p-4 rounded-2xl text-center">
                      <div className="text-2xl mb-2">{award.icon}</div>
                      <div className="text-xs font-bold text-ink mb-1">{award.title}</div>
                      <div className="text-[10px] text-ink/40 uppercase tracking-tighter">{award.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- News Section --- */}
      <section id="news" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Latest News"
            title="What's been <em>happening</em>"
          />

          <div className="max-w-3xl">
            {NEWS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="grid grid-cols-[100px_1fr] gap-8 py-8 border-b border-ink/10 last:border-0 group"
              >
                <div className="text-[10px] font-bold tracking-widest uppercase text-ink/40 pt-1">
                  {item.date}
                </div>
                <div>
                  <p className="text-ink/80 text-lg leading-relaxed mb-4">
                    {item.content}
                  </p>
                  {item.link && (
                    // FIX #6: Added rel="noopener noreferrer" to external link
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-rust text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      {item.linkText} <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-warm-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader
            tag="Get in Touch"
            title="Let's <em>connect</em>"
          />

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-3xl text-ink mb-4">Always happy to talk</h3>
                <p className="text-ink/60 text-lg">
                  Whether it is a research collaboration or just a conversation about technology — my inbox is open.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Mail />, label: "Email", value: "mdsifatullahsheikh@gmail.com", href: "mailto:mdsifatullahsheikh@gmail.com" },
                  { icon: <Linkedin />, label: "LinkedIn", value: "mdsifatullahsheikh", href: "https://www.linkedin.com/in/mdsifatullahsheikh" },
                  { icon: <Github />, label: "Github", value: "SifatSwapnil2022", href: "https://github.com/SifatSwapnil2022" },
                  { icon: <BookOpen />, label: "ResearchGate", value: "Sifatullah Sheikh", href: "https://www.researchgate.net/profile/Sifatullah-Sheikh" }
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 bg-cream border border-ink/5 rounded-2xl hover:border-rust hover:bg-rust/5 transition-all group"
                  >
                    <div className="text-rust group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-ink/40 mb-0.5">{link.label}</div>
                      <div className="text-ink font-medium">{link.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form — using div wrapper instead of <form> to avoid default submit behavior */}
            <div className="bg-cream border border-ink/5 p-8 md:p-12 rounded-[3rem]">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-ink/40 ml-2">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-warm-white border border-ink/10 rounded-2xl px-6 py-4 outline-none focus:border-rust transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-ink/40 ml-2">Email</label>
                    <input type="email" placeholder="Email Address" className="w-full bg-warm-white border border-ink/10 rounded-2xl px-6 py-4 outline-none focus:border-rust transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-ink/40 ml-2">Subject</label>
                  <input type="text" placeholder="What is this about?" className="w-full bg-warm-white border border-ink/10 rounded-2xl px-6 py-4 outline-none focus:border-rust transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-ink/40 ml-2">Message</label>
                  <textarea placeholder="Your Message..." rows={5} className="w-full bg-warm-white border border-ink/10 rounded-2xl px-6 py-4 outline-none focus:border-rust transition-colors resize-none" />
                </div>
                <button
                  type="button"
                  className="w-full bg-ink text-cream py-5 rounded-full font-bold text-lg hover:bg-rust transition-all flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      {/* FIX #5: Replaced placeholder href="#" with actual social URLs */}
      <footer className="bg-ink text-cream/40 py-12 px-6 md:px-12 border-t border-cream/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl text-cream mb-2">Sifat<span className="text-rust">.</span></div>
            <p className="text-sm">© 2025 Md Sifatullah Sheikh. All rights reserved.</p>
          </div>

          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/mdsifatullahsheikh" target="_blank" rel="noopener noreferrer" className="hover:text-rust transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/SifatSwapnil2022" target="_blank" rel="noopener noreferrer" className="hover:text-rust transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:mdsifatullahsheikh@gmail.com" className="hover:text-rust transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="text-sm">
            Built with care · Dhaka, BD
          </div>
        </div>
      </footer>

      {/* --- Project Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}