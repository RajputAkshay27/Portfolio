import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import './SkillCircle.css';

const techSkills = {
  Cloud: ["gcp.svg", "azure.svg", "terraform.svg"],
  Observability: ["prometheus.svg", "grafana.svg", "thanos.svg", "cloudwatch.svg"],
  Automation: ["githubactions.svg", "azuredevops.svg", "bash.svg"],
  Programming: ["cpp.svg", "python.svg", "c.svg"]
};

const certifications = [
  {
    name: "Google Certified Professional Cloud Architect",
    icon: "gcp-cert.svg",
    details: "Validates advanced skills in designing, developing, and managing robust, secure, scalable, and dynamic solutions on Google Cloud."
  },
  {
    name: "Google Certified Associate Cloud Engineer",
    icon: "gcp-assoc.svg",
    details: "Demonstrates foundational knowledge of deploying applications, monitoring operations, and managing enterprise solutions on GCP."
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    icon: "azure.svg",
    details: "Covers core Azure services, security, privacy, pricing, and support. Ideal for those starting with Azure cloud."
  },
  {
    name: "Motorola Associate (Feb 2023 - May 2023)",
    icon: "motorola.svg",
    details: "Company-specific program covering internal tools, standards, and practices in software engineering and observability."
  }
];

const SkillCircle = ({ title, icons }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-xl text-cyan-300 font-semibold mb-2">{title}</h3>
    <div className="orbit-container">
      {icons.map((icon, i) => (
        <motion.img
          key={i}
          src={/icons/${icon}}
          alt={icon.replace('.svg', '')}
          className="orbit-item"
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>
  </div>
);

const ExpandableItem = ({ icon, title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center space-x-4">
          {icon && <img src={/icons/${icon}} alt={title} className="w-10 h-10 object-contain" />}
          <span className="text-gray-100 font-semibold">{title}</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-cyan-300" />
        </motion.div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mt-2 text-gray-300"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 max-w-5xl mx-auto space-y-6 font-mono">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-cyan-400">Akshay Rajput</h1>
        <p className="text-xl text-gray-300 mt-2">Software Engineer | GCP PCA | Observability</p>
        <div className="flex justify-center gap-4 mt-4 text-gray-400">
          <a href="mailto:rajputakshay2710@gmail.com" className="hover:text-cyan-400"><Mail /></a>
          <a href="tel:+918511607538" className="hover:text-cyan-400"><Phone /></a>
          <div className="flex items-center gap-1"><MapPin className="w-4" /> Surat, Gujarat</div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <a href="http://github.com/RajputAkshay27" target="_blank" className="hover:text-cyan-400"><Github /></a>
          <a href="http://www.linkedin.com/in/akshay-rajput-748208201" target="_blank" className="hover:text-cyan-400"><Linkedin /></a>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {Object.entries(techSkills).map(([category, icons], idx) => (
            <SkillCircle key={idx} title={category} icons={icons} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Certifications</h2>
        {certifications.map((cert, idx) => (
          <ExpandableItem
            key={idx}
            icon={cert.icon}
            title={cert.name}
            content={<p>{cert.details}</p>}
          />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Work Experience</h2>
        <ExpandableItem
          title="Software Engineer, Motorola Solutions (June 2024 - Present)"
          content={
            <ul className="list-disc ml-6">
              <li>Implemented FIPS-compliant cryptographic functions for Prometheus, saving $50K</li>
              <li>Improved system availability to 99.90%</li>
              <li>Enhanced observability across 30+ clusters in multi-cloud</li>
            </ul>
          }
        />
        <ExpandableItem
          title="Software Engineer Intern, Motorola Solutions (May 2023 - May 2024)"
          content={
            <ul className="list-disc ml-6">
              <li>Built event-driven KEDA auto-scaler for microservices</li>
              <li>Resolved long-standing CAdvisor issue, improving performance and cost</li>
              <li>Scaled metric system to support 20M+ time series with 2-year retention</li>
            </ul>
          }
        />
      </section>
    </div>
  );
};

export default Portfolio;