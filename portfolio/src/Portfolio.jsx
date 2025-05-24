
import React, { useState } from 'react'; import { Mail, Phone, MapPin, Github, Linkedin, ChevronDown } from 'lucide-react'; import { motion, AnimatePresence } from 'framer-motion'; import './portfolio.css';

const tabs = ['About', 'Contact Me', 'Portfolio'];
const skillCategories = {
  Containerization: ["docker.svg", "kubernetes.svg", "helm.svg", "keda.svg"],
  Cloud: ["gcp.svg", "azure.svg", "aws.svg"],
  Observability: ["prometheus.svg", "grafana.svg", "thanos.svg", "cloudwatch.svg"],
  Automation: ["githubactions.svg", "azuredevops.svg", "bash.svg"],
  Programming: ["cpp.svg", "python.svg", "c.svg"]
};

const certifications = [
  {
    name: "Google Certified Professional Cloud Architect",
    icon: "gcp.svg",
    details: "Validates advanced skills in designing, developing, and managing robust, secure, scalable, and dynamic solutions on Google Cloud."
  },
  {
    name: "Google Certified Associate Cloud Engineer",
    icon: "gcp.svg",
    details: "Demonstrates foundational knowledge of deploying applications, monitoring operations, and managing enterprise solutions on GCP."
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    icon: "azure.svg",
    details: "Demonstrates foundational knowledge in Azure."
  },
  {
    name: "Motorola Associate (Feb 2023 - May 2023)",
    icon: "motorola.svg",
    details: "Trained on Apache spacks on K8s."
  }
];

const workExperience = [
  {
    title: "Software Engineer, Motorola Solutions (June 2024 - Present)",
    content: (
      <ul className="list-disc ml-6">
        <li>Driving FIPS compliance for Prometheus by integrating FIPS-compliant cryptographic functions, ensuring secure TLS protocols
          within the Federal region, and achieving cost savings of approximately $50,000 for these images.</li>
        <li>Remodeled legacy system to increase stability and achieved availability of 99.90% </li>
        <li>Ensuring system visibility across 30 plus cluster in a multi-cloud environment.</li>
        <li>Contributing to the implementation of Prometheus-as-a-Service using a multi-cloud approach, enhancing flexibility and
          scalability.</li>
      </ul>
    )
  },
  {
    title: "Software Engineer Intern, Motorola Solutions (May 2023 - May 2024)",
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
    )
  }
];

const SkillTabs = () => {
  const [activeTab, setActiveTab] = useState("Containerization");

  return (
    <div className="skill-tabs">
      <div className="tab-buttons">
        {Object.keys(skillCategories).map((category) => (
          <button
            key={category}
            className={`tab-button ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {skillCategories[activeTab].map((icon, i) => (
          <img
            key={i}
            src={`/icons/${icon}`}
            alt={icon.replace(".svg", "")}
            className="skill-icon"
          />
        ))}
      </div>
    </div>
  );
};

const ExpandableItem = ({ icon, title, content ,isExpanded = false}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  return (
    <div className="mb-4 border border-gray-300 shadow-lg rounded-lg">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center space-x-4">
          {icon && <img src={`/icons/${icon}`} alt={title} className="w-10 h-10 object-contain" />}
          <span className="text-black font-semibold">{title}</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-cyan-900" />
        </motion.div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mt-2 text-black"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const SectionWrapper = ({ show, children }) => (<AnimatePresence> {show && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="section" > {children} </motion.div>)} </AnimatePresence>);

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="portfolio-container"> <header className="portfolio-header">
      <div className="intro"> <h1>Akshaykumarsingh Rajput</h1> <p> <h2> <b>Software Engineer @ Motorola Solutions</b></h2> </p>
        <p> <h2> <b>GCP Professional Cloud Architect</b></h2> </p>
        <div className="button-group"> {tabs.map(tab => (<button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} > {tab} </button>))}
        </div> </div> <div className="profile-pic"> <img src="./profilePic.jpg" alt="Akshay" /> </div> </header>

      <main className="portfolio-main">
        <SectionWrapper show={activeTab === 'About'}>
          <p class="text-gray-700">
            Software Engineer with 2+ years of hands-on experience in Observability. Skilled in deploying and managing monitoring stacks,
            automating infrastructure, and maintaining high availability for cloud-native applications. Proficient with GCP, Azure, Kubernetes,
            Prometheus, Grafana, and CI/CD tools. Passionate about reducing toil, improving system visibility, and enhancing operational
            resilience
          </p>
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'Contact Me'}>
          <ul className="contact-list">
            <li><a href="mailto:rajputakshay2710@gmail.com" className="hover:text-cyan-400"><Mail /></a> rajputakshay2710@gmail.com</li>
            <li><a href="tel:+918511607538" className="hover:text-cyan-400"><Phone /></a> (+91)8511607538</li>
            <li><MapPin />Surat, Gujarat</li>
            <li><a href="http://github.com/RajputAkshay27" target="_blank" rel="noreferrer" className="hover:text-cyan-400"><Github /></a>Github</li>
            <li><a href="http://www.linkedin.com/in/akshay-rajput-748208201" target="_blank" rel="noreferrer" className="hover:text-cyan-400"><Linkedin /></a>
              Linkedin</li>
          </ul>
        </SectionWrapper>

        <SectionWrapper show={activeTab === 'Portfolio'}>
          <div className="portfolio-section">
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-2">Professional Experience</h2>
              {workExperience.map((job, idx) => (
                <ExpandableItem key={idx} title={job.title} content={job.content} isExpanded={true}/>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cyan-300 mb-2">Tech Stack</h2>
              <SkillTabs />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cyan-300 mb-2">Certifications</h2>
              {certifications.map((cert, idx) => (
                <ExpandableItem key={idx} title={cert.name} icon={cert.icon} content={<p>{cert.details}</p>} />
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-2">Education</h2>
              <ul className="list-disc text-black ml-6">
                <li>B.Tech CSE, CHARUSAT University, 9.51 CGPA (2020 - 2024)</li>
                <li>XII Science, St. Xavier High School, 75.4% (2018 - 2020)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-2">Projects</h2>
              <ul className="list-disc text-black ml-6">
                <li><strong>Microscopic Fungi Image Classification:</strong> Developed a CNN model using the Resnet Model as base for classification of fungal infection caused by yeast, mould. Using
                  the pretrained Resnet model and adding new dense layer I was able to classify them into 5 different classes. The dataset
                  included 5000 images for training the model</li>
                <li><strong>Diabetes Detection using SVM:</strong> Developed an SVM model with a 75.5% accuracy rate to determine whether a person has diabetes, and used Tkinkter to
                  construct a simple user interface. This dataset was taken from Kaggle's Pima Indians Diabetes Database.</li>
              </ul>
            </section>
          </div>
        </SectionWrapper>
      </main>
    </div>

  );
};

export default Portfolio;