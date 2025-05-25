import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './portfolio.css';

const tabs = ['About', 'Contact Me', 'Portfolio'];
const skillCategories = {
  Containerization: [
    `${process.env.PUBLIC_URL}/icons/docker.svg`,
    `${process.env.PUBLIC_URL}/icons/kubernetes.svg`,
    `${process.env.PUBLIC_URL}/icons/helm.svg`,
    `${process.env.PUBLIC_URL}/icons/keda.svg`
  ],
  Cloud: [
    `${process.env.PUBLIC_URL}/icons/gcp.svg`,
    `${process.env.PUBLIC_URL}/icons/azure.svg`,
    `${process.env.PUBLIC_URL}/icons/aws.svg`
  ],
  Observability: [
    `${process.env.PUBLIC_URL}/icons/prometheus.svg`,
    `${process.env.PUBLIC_URL}/icons/grafana.svg`,
    `${process.env.PUBLIC_URL}/icons/thanos.svg`,
    `${process.env.PUBLIC_URL}/icons/cloudwatch.svg`
  ],
  "CI/CD": [
    `${process.env.PUBLIC_URL}/icons/githubactions.svg`,
    `${process.env.PUBLIC_URL}/icons/azuredevops.svg`,
    `${process.env.PUBLIC_URL}/icons/bash.svg`
  ],
  Programming: [
    `${process.env.PUBLIC_URL}/icons/cpp.svg`,
    `${process.env.PUBLIC_URL}/icons/python.svg`,
    `${process.env.PUBLIC_URL}/icons/c.svg`
  ]
};

const certifications = [
  {
    name: "Google Certified Professional Cloud Architect",
    icon: `${process.env.PUBLIC_URL}/icons/gcp.svg`,
    certificateImage: `${process.env.PUBLIC_URL}/certificates/gcp-pca.png`,
    keySkills: "Cloud Architecture, Cloud Computing, Cloud Security, Cloud Storage, Databases, GKE, Google Cloud Platform (GCP), Identity And Access Management (IAM), Networking, Scalability, Workload Migration"
  },
  {
    name: "Google Certified Associate Cloud Engineer",
    icon: `${process.env.PUBLIC_URL}/icons/gcp.svg`,
    certificateImage: `${process.env.PUBLIC_URL}/certificates/gcp-ace.png`,
    keySkills: "Cloud Architecture, Cloud Computing, Cloud Security, Cloud Storage, Compute Engine, GKE, Google Cloud Platform (GCP), Identity And Access Management (IAM), Infrastructure as Code (IaC), Networking, Pub/sub, SQL"
  }
];

const workExperience = [
  {
    role: "Software Engineer",
    company: "Motorola Solutions",
    duration: "June 2024 - Present",
    content: (
      <ul className="list-disc ml-6">
        <li>Driving FIPS compliance for Prometheus by integrating FIPS-compliant cryptographic functions, ensuring secure TLS protocols
          within the Federal region, and achieving cost savings of approximately $50,000 for these images.</li>
        <li>Remodeled legacy system to increase stability and achieved availability of 99.90% </li>
        <li>Ensuring system visibility across 30 plus cluster in a multi-cloud environment.</li>
        <li>Contributing to the implementation of Prometheus-as-a-Service using a multi-cloud approach, enhancing flexibility and
          scalability.</li>
      </ul>
    ),
    skills: [
      { name: "Prometheus", category: "monitoring" },
      { name: "FIPS", category: "security" },
      { name: "Multi-Cloud", category: "cloud" },
      { name: "TLS", category: "security" },
      { name: "System Design", category: "architecture" },
      { name: "Kubernetes", category: "containerization" }
    ]
  },
  {
    role: "Software Engineer Intern",
    company: "Motorola Solutions",
    duration: "May 2023 - May 2024",
    content: (
      <ul className="list-disc ml-6">
        <li>Enhancing microservices performance and availability by implementing a custom, event-driven KEDA auto-scaler</li>
        <li>Streamlining local and production testing by developing Cypress-based test suites and integrating alerting through Runscope</li>
        <li>Addressed a CAdvisor metrics issue that had persisted for over 1.5 years, allowing the removal of a secondary exporter
          previously added as a workaround. This resolution led to notable improvements in performance and cost efficiency.
        </li>
        <li>Played a key role in rearchitecting the metrics collection and visualization system to support 20M+ unique time series with a 2-
          year retention period.</li>
      </ul>
    ),
    skills: [
      { name: "KEDA", category: "automation" },
      { name: "Cypress", category: "testing" },
      { name: "Microservices", category: "architecture" },
      { name: "CAdvisor", category: "monitoring" },
      { name: "Time Series", category: "data" },
      { name: "Auto-scaling", category: "cloud" }
    ]
  }
];

const projects = [
  {
    title: "Modern Portfolio Website",
    description: "A responsive portfolio website built with React and Framer Motion, featuring modern UI/UX design and smooth animations.",
    details: [
      "Built with React and modern UI components",
      "Implemented smooth animations using Framer Motion",
      "Created responsive design with glassmorphism effects",
      "Used AI-assisted development for efficient iteration"
    ],
    skills: [
      { name: "React", category: "frontend" },
      { name: "Framer Motion", category: "animation" },
      { name: "CSS3", category: "styling" },
      { name: "Responsive Design", category: "ui" },
      { name: "Prompt Engineering", category: "ai" }
    ]
  },
  {
    title: "Microscopic Fungi Image Classification",
    description: "Developed a CNN model using the Resnet Model as base for classification of fungal infection caused by yeast, mould. Using the pretrained Resnet model and adding new dense layer I was able to classify them into 5 different classes.",
    details: [
      "Processed and augmented 5000 images for training",
      "Implemented transfer learning with ResNet architecture",
      "Achieved classification into 5 distinct categories",
      "Optimized model performance for medical image analysis"
    ],
    skills: [
      { name: "CNN", category: "ml" },
      { name: "ResNet", category: "ml" },
      { name: "Transfer Learning", category: "ml" },
      { name: "Image Processing", category: "data" },
      { name: "Python", category: "programming" }
    ]
  },
  {
    title: "Diabetes Detection using SVM",
    description: "Developed an SVM model with a 75.5% accuracy rate to determine whether a person has diabetes, using the Pima Indians Diabetes Database from Kaggle.",
    details: [
      "Implemented SVM classification algorithm",
      "Created user interface using Tkinter",
      "Achieved 75.5% prediction accuracy",
      "Processed and analyzed medical data"
    ],
    skills: [
      { name: "SVM", category: "ml" },
      { name: "Tkinter", category: "ui" },
      { name: "Data Analysis", category: "data" },
      { name: "Python", category: "programming" },
      { name: "Scikit-learn", category: "ml" }
    ]
  }
];

const education = [
  {
    degree: "B.Tech Computer Science Engineering",
    institution: "CHARUSAT University",
    duration: "2020 - 2024",
    score: "9.51 CGPA",
    highlights: [
      "Top 10% in the department",
      "Ranked 5th in University level coding competition"
    ],
    skills: [
      { name: "Data Structures", category: "cs" },
      { name: "Algorithms", category: "cs" },
      { name: "Machine Learning", category: "ml" },
      { name: "Cloud Computing", category: "cloud" }
    ]
  },
  {
    degree: "XII Science",
    institution: "St. Xavier High School",
    duration: "2019 - 2020",
    score: "75.4%",
    highlights: [
      "Physics, Chemistry and Mathematics major",
      "Scored 99.85 percentile in State level entrance exam",
      "Socred 96 percentile in Joint Entrance Exam"
    ],
    skills: [
      { name: "Physics", category: "science" },
      { name: "Mathematics", category: "science" },
      { name: "Problem Solving", category: "soft" }
    ]
  }
];

const aboutHighlights = [
  {
    title: "Professional Experience",
    description: "Software Engineer at Motorola Solutions with expertise in cloud infrastructure and observability",
    icon: "💼"
  },
  {
    title: "Cloud Expertise",
    description: "Google Certified Professional Cloud Architect with hands-on experience in GCP, Azure, and multi-cloud environments",
    icon: "☁️"
  },
  {
    title: "Technical Focus",
    description: "Specialized in cloud-native technologies, Kubernetes, and building scalable monitoring solutions",
    icon: "🚀"
  },
  {
    title: "Achievement",
    description: "Improved system stability to achieve 99.90% availability and optimized costs across cloud platforms",
    icon: "🎯"
  }
];

const SkillTabs = () => {
  const [activeTab, setActiveTab] = useState("Containerization");
  const categories = Object.keys(skillCategories);
  const activeIndex = categories.indexOf(activeTab);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % categories.length;
    setActiveTab(categories[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + categories.length) % categories.length;
    setActiveTab(categories[prevIndex]);
  };

  return (
    <div className="skill-tabs">
      <div className="tab-carousel">
        <motion.button 
          className="carousel-control prev"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        <div className="carousel-container">
          {categories.map((category, index) => (
            <motion.div
            key={category}
              className={`carousel-item ${activeTab === category ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: activeTab === category ? 1 : 0,
                scale: activeTab === category ? 1 : 0.8,
                display: activeTab === category ? 'flex' : 'none'
              }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="icons-grid">
                {skillCategories[category].map((icon, i) => (
                  <motion.img
            key={i}
                    src={icon}
            alt={icon.replace(".svg", "")}
            className="skill-icon"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
          />
        ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button 
          className="carousel-control next"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate }) => (
  <div className="certificate-card">
    <div className="certificate-image">
      <img src={certificate.certificateImage} alt={certificate.name} />
    </div>
    <div className="certificate-info">
      <div className="certificate-header">
        <img src={certificate.icon} alt="" className="cert-icon" />
        <h3>{certificate.name}</h3>
      </div>
      <p className="key-skills">{certificate.keySkills}</p>
    </div>
  </div>
);

const SectionWrapper = ({ show, children }) => (<AnimatePresence> {show && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="section" > {children} </motion.div>)} </AnimatePresence>);

const SkillBadge = ({ skill }) => {
  const categoryColors = {
    monitoring: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
    security: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
    cloud: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    architecture: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
    containerization: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
    automation: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
    testing: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
    data: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
    ml: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    ui: { bg: "bg-fuchsia-100", text: "text-fuchsia-700", border: "border-fuchsia-200" },
    programming: { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-200" },
    cs: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" },
    science: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
    soft: { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-200" }
  };

  const colors = categoryColors[skill.category] || { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };

  return (
    <motion.span
      className={`skill-badge ${colors.bg} ${colors.text} ${colors.border}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {skill.name}
    </motion.span>
  );
};
const ExperienceCard = ({ job, index }) => (
  <motion.div 
    className="experience-timeline-card"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <div className="experience-content">
      <div className="experience-header">
        <div className="role-company">
          <h3 className="experience-role">{job.role}</h3>
          <div className="company-info">
            <span className="company-name">{job.company}</span>
            <span className="duration">{job.duration}</span>
          </div>
        </div>
      </div>
      <div className="experience-details">
        {job.content}
      </div>
      <div className="skills-container">
        <h4 className="skills-title">Technologies & Tools</h4>
        <div className="skills-grid">
          {job.skills.map((skill, idx) => (
            <SkillBadge key={idx} skill={skill} />
          ))}
        </div>
      </div>
    </div>
        </motion.div>
);

const ExperienceSection = () => (
  <section className="experience-section">
    <h2 className="section-title">Professional Experience</h2>
    <div className="experience-timeline">
      {workExperience.map((job, idx) => (
        <ExperienceCard key={idx} job={job} index={idx} />
      ))}
    </div>
  </section>
);

const SkillsSection = () => (
  <section className="skills-section">
    <h2 className="section-title">Tech Stack</h2>
    <SkillTabs />
  </section>
);

const CertificationsSection = () => (
  <section className="certifications-section">
    <h2 className="section-title">Certifications</h2>
    <div className="certificates-grid">
      {certifications.map((cert, idx) => (
        <CertificateCard key={idx} certificate={cert} />
      ))}
    </div>
  </section>
);

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="project-main-content">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      <div className="project-details">
        <ul className="project-list">
          {project.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="project-skills">
      <h4 className="skills-title">Technologies Used</h4>
      <div className="skills-grid">
        {project.skills.map((skill, idx) => (
          <SkillBadge key={idx} skill={skill} />
        ))}
      </div>
    </div>
  </div>
);

const ProjectsSection = () => (
  <section className="projects-section">
    <h2 className="section-title">Projects</h2>
    <div className="projects-grid">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </div>
  </section>
);

const EducationCard = ({ edu, index }) => (
          <motion.div
    className="education-card"
    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <div className="education-content">
      <div className="education-header">
        <h3 className="education-degree">{edu.degree}</h3>
        <span className="education-duration">{edu.duration}</span>
      </div>
      <div className="education-institution">
        <span className="institution-name">{edu.institution}</span>
        <span className="education-score">{edu.score}</span>
      </div>
      <div className="education-highlights">
        <ul>
          {edu.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
      </div>
      <div className="skills-container">
        <h4 className="skills-title">Key Learnings</h4>
        <div className="skills-grid">
          {edu.skills.map((skill, idx) => (
            <SkillBadge key={idx} skill={skill} />
          ))}
        </div>
      </div>
    </div>
          </motion.div>
);

const EducationSection = () => (
  <section className="education-section">
    <h2 className="section-title">Education</h2>
    <div className="education-timeline">
      {education.map((edu, idx) => (
        <EducationCard key={idx} edu={edu} index={idx} />
      ))}
    </div>
  </section>
);

const SocialIcon = ({ href, icon: Icon, label, className = "" }) => (
  <motion.div 
    className="contact-item"
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
  >
    <a href={href} className={`contact-link ${className}`} target="_blank" rel="noreferrer">
      <div className="icon-wrapper">
        <Icon />
      </div>
      <span>{label}</span>
    </a>
  </motion.div>
);

const ContactSection = () => (
  <div className="contact-list">
    <SocialIcon
      href="mailto:rajputakshay2710@gmail.com"
      icon={Mail}
      label="rajputakshay2710@gmail.com"
      className="gmail"
    />
    <SocialIcon
      href="tel:+918511607538"
      icon={Phone}
      label="(+91)8511607538"
      className="phone"
    />
    <motion.div className="contact-item" whileHover={{ y: -5 }}>
      <div className="contact-info location">
        <div className="icon-wrapper">
          <MapPin />
        </div>
        <span>Surat, Gujarat</span>
      </div>
    </motion.div>
    <SocialIcon
      href="http://github.com/RajputAkshay27"
      icon={Github}
      label="Github"
      className="github"
    />
    <SocialIcon
      href="http://www.linkedin.com/in/akshay-rajput-748208201"
      icon={Linkedin}
      label="LinkedIn"
      className="linkedin"
    />
  </div>
);

const AboutSection = () => (
  <div className="about-section">
    <div className="about-intro">
      <p className="about-text">
        Software Engineer with 2+ years of hands-on experience in Observability. Skilled in deploying and managing monitoring stacks,
        automating infrastructure, and maintaining high availability for cloud-native applications. Proficient with GCP, Azure, Kubernetes,
        Prometheus, Grafana, and CI/CD tools. Passionate about reducing toil, improving system visibility, and enhancing operational
        resilience.
      </p>
    </div>
    <div className="about-highlights">
      {aboutHighlights.map((highlight, index) => (
        <motion.div
          key={index}
          className="highlight-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="highlight-icon">{highlight.icon}</div>
          <div className="highlight-content">
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <div className="button-group">
          {tabs.map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className='profile'>
          <div className="profile-pic">
            <img src={`${process.env.PUBLIC_URL}/profilePic.jpg`} alt="Akshay" />
          </div>
          <div className="intro">
            <h1>Akshaykumarsingh Rajput</h1>
            <p><h2><b>Software Engineer @ Motorola Solutions</b></h2></p>
            <p><h2><b>GCP Professional Cloud Architect</b></h2></p>
          </div>
        </div>
      </header>

      <main className="portfolio-main">
        <SectionWrapper show={activeTab === 'About'}>
          <AboutSection />
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'Contact Me'}>
          <ContactSection />
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'Portfolio'}>
          <div className="portfolio-section">
            <ExperienceSection />
            <SkillsSection />
            <CertificationsSection />
            <ProjectsSection />
            <EducationSection />
          </div>
        </SectionWrapper>
      </main>
    </div>
  );
};

export default Portfolio;