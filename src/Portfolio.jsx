import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Sun, Moon, Code2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './portfolio.css';

const tabs = ['Home', 'About', 'Portfolio'];
const skillCategories = {
  "Cloud Platforms": [
    { name: "GCP", icon: `${process.env.PUBLIC_URL}/icons/gcp.svg` },
    { name: "Azure", icon: `${process.env.PUBLIC_URL}/icons/azure.svg` },
    { name: "AWS", icon: `${process.env.PUBLIC_URL}/icons/aws.svg` }
  ],
  "Containerization & Orchestration": [
    { name: "Docker", icon: `${process.env.PUBLIC_URL}/icons/docker.svg` },
    { name: "Kubernetes", icon: `${process.env.PUBLIC_URL}/icons/kubernetes.svg` },
    { name: "Helm", icon: `${process.env.PUBLIC_URL}/icons/helm.svg` },
    { name: "KEDA", icon: `${process.env.PUBLIC_URL}/icons/keda.svg` }
  ],
  "Observability": [
    { name: "Prometheus", icon: `${process.env.PUBLIC_URL}/icons/prometheus.svg` },
    { name: "Grafana", icon: `${process.env.PUBLIC_URL}/icons/grafana.svg` },
    { name: "Thanos", icon: `${process.env.PUBLIC_URL}/icons/thanos.svg` },
    { name: "CloudWatch", icon: `${process.env.PUBLIC_URL}/icons/cloudwatch.svg` }
  ],
  "CI/CD": [
    { name: "GitHub Actions", icon: `${process.env.PUBLIC_URL}/icons/githubactions.svg` },
    { name: "Azure DevOps", icon: `${process.env.PUBLIC_URL}/icons/azuredevops.svg` }
  ],
  "Programming": [
    { name: "Python", icon: `${process.env.PUBLIC_URL}/icons/python.svg` },
    { name: "Bash", icon: `${process.env.PUBLIC_URL}/icons/bash.svg` },
    { name: "C++", icon: `${process.env.PUBLIC_URL}/icons/cpp.svg` },
    { name: "C", icon: `${process.env.PUBLIC_URL}/icons/c.svg` }
  ]
};

const certifications = [
  {
    name: "Certified Kubernetes Administrator",
    icon: `${process.env.PUBLIC_URL}/icons/kubernetes.svg`,
    certificateImage: `${process.env.PUBLIC_URL}/certificates/cka.png`,
    keySkills: "Kubernetes Administration, Cluster Management, Troubleshooting, Container Orchestration, Pod Management, Service Mesh, Networking, Security, Storage, Monitoring"
  },
  {
    name: "Google Certified Professional Cloud Architect",
    icon: `${process.env.PUBLIC_URL}/icons/gcp.svg`,
    certificateImage: `${process.env.PUBLIC_URL}/certificates/gcp-pca.png`,
    keySkills: "Cloud Architecture, Cloud Computing, Cloud Security, Cloud Storage, GKE, Google Cloud Platform (GCP), Identity And Access Management (IAM), Networking, Scalability, Workload Migration"
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
        <li><b>Security and Compliance:</b> Led FIPS compliance initiative for Prometheus monitoring stack, implementing
          cryptographic security protocols and achieving <b>$50,000</b> cost savings through optimized container images</li>
        <li><b>System Reliability:</b> Rearchitected and implemented system improvements for the on-premise data collection solutions that increased availability to 
          <b> 99.90%</b>, supporting critical business operations. </li>
        <li><b>Multi-Cloud Operations:</b> Designed and deployed automated workflows managing <b>30+</b> Kubernetes clusters
          across multi-cloud environments, significantly reducing operational overhead</li>
        <li><b>Critical Monitoring:</b> Engineered custom shell script to collect PVC storage utilization metrics, integrated
          with Prometheus alerting system, reducing <b>disk-full incidents to near zero</b> and preventing multiple production outages.</li>
      </ul>
    ),
    skills: [
      { name: "Prometheus", category: "monitoring" },
      { name: "Grafana", category: "monitoring" },
      { name: "Kubernetes", category: "containerization" },
      { name: "Node Exporter", category: "monitoring" },
      { name: "OCI Image Format", category: "monitoring" },
      { name: "FIPS", category: "security" },
      { name: "Multi-Cloud", category: "cloud" },
      { name: "System Design", category: "architecture" }
    ]
  },
  {
    role: "Software Engineer Intern",
    company: "Motorola Solutions",
    duration: "May 2023 - May 2024",
    content: (
      <ul className="list-disc ml-6">
        <li><b>Critical Issue Resolution:</b> Resolved long-standing CAdvisor metrics collection issue <b>(1.5+ years)</b>, eliminating need for secondary exporter and improving system performance and cost efficiency</li>
        <li><b>Observability Enhancement:</b> Built comprehensive observability dashboards providing real-time performance indicators and system health metrics, accelerating incident detection and reducing mean time to identify
          <b>(MTTI) by 40 percent.</b></li>
        <li><b>Performance Optimization:</b> Developed custom event-driven KEDA auto-scaler, improving microservices
          performance and resource utilization efficiency
        </li>
        <li><b>Testing:</b> Built comprehensive Cypress-based test suites streamlining local development.</li>
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




const CertificateCard = ({ certificate }) => (
  <div className="certificate-item">
    <img src={certificate.certificateImage} alt={certificate.name} className="cert-image" />
    <span className="cert-name">{certificate.name}</span>
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


const CertificationsSection = () => (
  <section className="certifications-section">
    <h2 className="section-title">Certifications</h2>
    <div className="certificates-list">
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

const SkillItem = ({ skill }) => (
  <motion.div
    className="skill-item"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <img src={skill.icon} alt={skill.name} className="skill-icon" />
    <span className="skill-name">{skill.name}</span>
  </motion.div>
);

const SkillsGrid = () => (
  <div className="skills-container grid-layout">
    {Object.entries(skillCategories).map(([category, skills]) => (
      <div key={category} className="skill-category grid-category">
        <h3 className="category-title">{category}</h3>
        <div className="category-skills-grid">
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const HomePage = () => (
  <div className="home-page">
    <div className="home-hero">
      <div className="home-left">
        <motion.h1
          className="home-name"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I am Akshay
        </motion.h1>
        <motion.div
          className="home-highlights"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="highlight-tag">Software Engineer @ Motorola Solutions</span>
          <span className="highlight-tag">Observability</span>
          <span className="highlight-tag">Certified Kubernetes Administrator</span>
        </motion.div>
      </div>
      <motion.div
        className="home-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="home-profile-pic">
          <img src={`${process.env.PUBLIC_URL}/profilePic.jpg`} alt="Akshay" />
        </div>
      </motion.div>
    </div>

    <motion.div
      className="home-skills-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="skills-section-title">Skills</h2>
      <SkillsGrid />
    </motion.div>
  </div>
);

const AboutSection = () => (
  <div className="about-section">
    <h2 className="section-title">About Me</h2>
    <div className="about-intro option1">
      <div className="about-text">
        <h3 className="about-subtitle">Professional Background</h3>
        <p>I am Akshay Rajput, a dedicated Cloud Platform Engineer with a strong foundation in Computer Science and Technology. I hold a Bachelor of Technology degree from Charusat University, where I delved in Machine Learning and gained hands-on experience with distributed systems technologies including Apache Spark and Kubernetes.</p>
        
        <h3 className="about-subtitle">Current Role & Expertise</h3>
        <p>In my current position as a Software Engineer at Motorola Solutions, I specialize in observability and monitoring solutions, focusing on metrics collection, analysis, and visualization using industry-standard tools such as Prometheus, Grafana, and Thanos. My work encompasses multi-cloud environments including AWS, Azure, and Google Cloud Platform, where I have developed expertise in architecting scalable, resilient solutions and implementing automated workflows to enhance operational efficiency and system reliability.</p>
        
        <h3 className="about-subtitle">Certifications & Professional Development</h3>
        <p>To strengthen my professional credentials and technical expertise, I have earned the Certified Kubernetes Administrator (CKA) certification and hold multiple Google Cloud Platform certifications, including Professional Cloud Architect and Associate Cloud Engineer. These certifications validate my proficiency in cloud technologies and demonstrate my commitment to continuous learning and professional development in the rapidly evolving field of cloud computing.</p>
        
        <h3 className="about-subtitle">Technical Philosophy & Approach</h3>
        <p>I am passionate about collaborative problem-solving and continuous improvement methodologies. My approach centers on creating dynamic, automated solutions that enhance system reliability, improve operational efficiency, and reduce manual intervention. I believe in leveraging cutting-edge technologies to solve complex challenges while maintaining a focus on scalability, security, and maintainability in all technical implementations.</p>
      </div>
    </div>
  </div>
);

const DarkModeToggle = ({ isDark, toggleDarkMode }) => (
  <motion.button
    className="dark-mode-toggle"
    onClick={toggleDarkMode}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="toggle-icon"
      animate={{ rotate: isDark ? 0 : 180 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.div>
  </motion.button>
);

const CompactContactIcon = ({ href, icon: Icon, label, className = "" }) => (
  <motion.a
    href={href}
    className={`compact-contact-icon ${className}`}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    title={label}
  >
    <Icon size={18} />
  </motion.a>
);

const HeaderComponent = ({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="portfolio-header">
      <div className="header-content">
        <div className="header-left">
          <div className="brand">
            <h1 className="brand-name">Akshay Rajput</h1>
          </div>
          <nav className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <div className="compact-contact-icons">
            <CompactContactIcon
              href="mailto:rajputakshay2710@gmail.com"
              icon={Mail}
              label="Email"
              className="email"
            />
            <CompactContactIcon
              href="tel:+918511607538"
              icon={Phone}
              label="Phone"
              className="phone"
            />
            <CompactContactIcon
              href="http://github.com/RajputAkshay27"
              icon={Github}
              label="GitHub"
              className="github"
            />
            <CompactContactIcon
              href="http://www.linkedin.com/in/akshay2710"
              icon={Linkedin}
              label="LinkedIn"
              className="linkedin"
            />
            <CompactContactIcon
              href="https://leetcode.com/u/rajputakshay2710/"
              icon={Code2}
              label="LeetCode"
              className="leetcode"
            />
            <CompactContactIcon
              href="https://www.credly.com/users/akshay-rajput.774905ee"
              icon={Award}
              label="Credly"
              className="credly"
            />
          </div>
          <DarkModeToggle isDark={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </header>
  );
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="portfolio-container">
      <HeaderComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="portfolio-main">
        <SectionWrapper show={activeTab === 'Home'}>
          <HomePage />
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'About'}>
          <AboutSection />
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'Portfolio'}>
          <div className="portfolio-section">
            <ExperienceSection />
            <CertificationsSection />
            <ProjectsSection />
          </div>
        </SectionWrapper>
      </main>
    </div>
  );
};

export default Portfolio;