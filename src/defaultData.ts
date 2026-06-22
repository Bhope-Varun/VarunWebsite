import { DeveloperProfile } from './types';

export const defaultProfile: DeveloperProfile = {
  name: "Bhope Varun",
  title: "Full-Stack Software Developer",
  email: "bvarun2624@gmail.com",
  phone: "+91 8639718579",
  profilePictureUrl: "/avatar.svg",
  location: "Hyderabad, Telangana, India",
  bio: `I'm Bhope Varun, a Full Stack Developer and Electronics & Communication Engineering graduate with a strong passion for building modern, user-focused web applications. My journey began in electronics and embedded systems, where I worked on projects involving Arduino, IoT, and automation, and later evolved into software development through hands-on experience with Java, React, JavaScript, Python, and SQL.

Currently, I am working as a Full Stack Developer Intern at Prodesk IT, where I develop responsive web applications, build interactive user interfaces, and collaborate using modern development tools such as Git and GitHub. I enjoy transforming ideas into practical digital solutions and continuously expanding my knowledge of modern web technologies.

My technical background combines software development, problem-solving, and engineering principles, enabling me to approach challenges with both creativity and analytical thinking. I am particularly interested in Full Stack Development, AI-powered applications, and scalable web technologies.

Beyond coding, I enjoy learning emerging technologies, working on real-world projects, and continuously improving my skills to build impactful products. I am currently seeking opportunities where I can contribute, learn from experienced professionals, and grow as a software engineer.`,
  yearsExperience: 1,
  projectsCount: 6,
  weeklyContributions: 28,
  githubUrl: "https://github.com/b-varun",
  linkedinUrl: "https://www.linkedin.com/in/b-varun-62684a312",
  projects: [
    {
      title: "AI Cover Letter Generator",
      category: "AI / ML",
      description: "A smart document-drafting web application that generates professional, context-rich cover letters based on user constraints and text uploads.",
      details: [
        "Developed responsive user interfaces using React.js, JavaScript, HTML, and CSS.",
        "Implemented seamless upload facilities and structured dynamic template filling templates.",
        "Designed and deployed the production-ready system components cleanly on Vercel."
      ],
      tech: ["React.js", "JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/b-varun/ai-cover-letter-generator",
      demoUrl: "https://github.com/b-varun/ai-cover-letter-generator",
      stats: "Vercel Deployed"
    },
    {
      title: "Kanban Task Board",
      category: "Full-Stack",
      description: "A trello-style operational workflow board facilitating task prioritization, categorization, editing, and drag-and-drop state syncing.",
      details: [
        "Built a responsive task board utilizing React.js, JavaScript, and drag-and-drop components.",
        "Created support for creation, description editing, deletion, and quick stage switches.",
        "Integrated client-side localStorage structures for zero-latency user persistency."
      ],
      tech: ["React.js", "JavaScript", "dnd-kit", "HTML", "CSS"],
      githubUrl: "https://github.com/b-varun/kanban-task-board",
      demoUrl: "https://github.com/b-varun/kanban-task-board",
      stats: "Persisted Client State"
    },
    {
      title: "House Price Prediction Engine",
      category: "AI / ML",
      description: "Constructed a machine learning regression system predicting real-estate pricing based on sizing, areas, and room criteria.",
      details: [
        "Preprocessed raw data thoroughly by filling null rows, scaling range intervals, and encoding labels.",
        "Implemented elegant Linear Regression algorithms and contrasted error coefficients for high accuracy.",
        "Visualized prediction vectors using structured graphing routines in Python."
      ],
      tech: ["Python", "Machine Learning", "Linear Regression", "NumPy", "Pandas"],
      githubUrl: "https://github.com/b-varun/house-price-prediction",
      demoUrl: "https://github.com/b-varun/house-price-prediction",
      stats: "High Prediction Accuracy"
    },
    {
      title: "Expense Tracker Application",
      category: "Creative",
      description: "A clean expense record and log keeper system tracking categorical outlays, budget guidelines, and monthly insights.",
      details: [
        "Engineered localized data loggers managing day-to-day items and categories in Python.",
        "Coded dynamic statistics sorting and clean visualizations for financial tracking.",
        "Built a polished interactive UI displaying average itemized consumption habits."
      ],
      tech: ["Python", "Tkinter", "Data Filters", "Logistics Metrics"],
      githubUrl: "https://github.com/b-varun/expense-tracker",
      demoUrl: "https://github.com/b-varun/expense-tracker",
      stats: "Clean Expense Sorting"
    },
    {
      title: "Wireless Power Transfer System",
      category: "Creative",
      description: "Designed and built an electromagnetic inductive coupling wireless power transmitter and receiver circuit to efficiently charge low-power devices.",
      details: [
        "Engineered high-frequency oscillator networks to generate stable electromagnetic waves at resonant frequency.",
        "Optimized receiver and transmitter coil windings and tuning capacitors to increase power transfer efficiency and range.",
        "Integrated rectification and voltage regulation stages to supply clean DC power safe for battery recharging."
      ],
      tech: ["Electromagnetics", "Resonant Inductive Coupling", "Circuit Design", "Power Electronics", "Hardware Testing"],
      githubUrl: "https://github.com/b-varun/wireless-power-transfer",
      demoUrl: "https://github.com/b-varun/wireless-power-transfer",
      stats: "Inductive Coupling Model"
    },
    {
      title: "Footstep Power Generation System",
      category: "Creative",
      description: "Created a smart clean energy generation prototype utilizing non-conventional piezoelectric transducers to convert mechanical footsteps into electrical charge.",
      details: [
        "Constructed a robust custom step platform fitted with highly responsive piezoelectric transducer arrays.",
        "Designed matching booster and storage circuits using capacitor blocks and rechargeable batteries for maximum retention.",
        "Integrated an LCD monitor display showing real-time voltage generation statistics."
      ],
      tech: ["Piezoelectric Electrodes", "Energy Harvesting", "Power Conversion", "Embedded Hardware", "Sensors"],
      githubUrl: "https://github.com/b-varun/footstep-power-generation",
      demoUrl: "https://github.com/b-varun/footstep-power-generation",
      stats: "Clean Energy Harvesting"
    }
  ],
  timeline: [
    {
      year: "MAY 2026 - PRESENT",
      role: "Full Stack Developer Intern",
      company: "Prodesk IT",
      description: "A practical professional internship developing responsive web views and managing scalable routing behaviors.",
      highlights: [
        "Developed responsive web applications using React.js, JavaScript, HTML, and CSS.",
        "Implemented seamless client-side routing and state containers for single-page interactive layouts."
      ]
    },
    {
      year: "2022 - 2026",
      role: "B.Tech, Electronics and Communication Engineering",
      company: "JB Institute of Engineering and Technology",
      description: "Undergrad engineering studies with focus on signaling channels, computing architectures, and digital circuit designs.",
      highlights: [
        "Maintained robust academic standing achieving a 8.14 CGPA.",
        "Successfully specialized in software development and intelligent machine learning vectors."
      ]
    }
  ],
  skills: [
    { category: "Languages & Frameworks", skills: ["React.js", "JavaScript", "HTML", "CSS", "C++", "Python", "Java", "SQL"] },
    { category: "Development Toolkit", skills: ["Git", "GitHub", "VS Code", "Vercel", "IntelliJ IDEA", "Anaconda", "dnd-kit"] },
    { category: "Core Architectures", skills: ["Responsive Design", "Component-Based Architecture", "State Management", "REST APIs", "Machine Learning", "Linear Regression"] }
  ]
};
