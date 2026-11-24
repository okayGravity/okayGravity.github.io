export interface Job {
  org: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const summary =
  "Computer science student with a cybersecurity background, multiple industry certifications, open-source development experience, and over four years of professional healthcare experience. Strong technical foundation in programming, operating systems, networking, and information security. Interested in software engineering, systems programming, vulnerability research, and secure software development. Experienced in analytical problem-solving, technical troubleshooting, independent learning, and collaboration within professional and public-sector environments.";

export const education = {
  school: "University of Maryland Global Campus",
  degree: "Bachelor of Science in Computer Science",
  minor: "Cybersecurity",
  graduation: "December 2027",
  gpa: "3.6",
  showGpa: true,
  coursework: [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Advanced Programming Languages",
    "Object-Oriented Programming",
    "Computer Networking",
    "Computer Systems and Architecture",
    "Software Vulnerability Detection",
    "Secure Programming",
    "Cybersecurity",
    "Database Systems",
  ],
  honors: [
    "Upsilon Pi Epsilon — International Honor Society for the Computing and Information Disciplines",
    "Phi Kappa Phi — Multidisciplinary Academic Honor Society",
  ],
};

export const skills: SkillGroup[] = [
  { label: "Programming Languages", items: ["Python", "Java", "C", "SQL", "JavaScript", "Bash"] },
  { label: "Developing Proficiency", items: ["C++", "C#", "TypeScript"] },
  { label: "Operating Systems", items: ["Linux (Arch Linux)", "Windows"] },
  {
    label: "Software Engineering",
    items: [
      "Object-oriented programming",
      "Data structures and algorithms",
      "Debugging and troubleshooting",
      "Version control",
      "Software testing",
      "Secure coding practices",
      "Codebase analysis",
      "Software vulnerability remediation",
    ],
  },
  {
    label: "Cybersecurity",
    items: [
      "Vulnerability assessment",
      "Penetration testing",
      "Digital forensics",
      "Memory analysis",
      "Network security",
      "Static and dynamic analysis fundamentals",
      "Security research fundamentals",
    ],
  },
  {
    label: "Systems and Infrastructure",
    items: [
      "Linux system administration",
      "TCP/IP and network fundamentals",
      "Virtualization",
      "Filesystems and disk partitioning",
      "Bootloader configuration",
      "Full-disk encryption",
      "Command-line environments",
    ],
  },
  {
    label: "Tools and Technologies",
    items: [
      "Git", "GitHub", "GDB", "Wireshark", "Volatility 3", "Visual Studio Code",
      "Neovim", "QEMU/KVM", "libvirt", "Flask", "Godot",
    ],
  },
];

export const certifications = [
  "CompTIA PenTest+",
  "CompTIA CySA+",
  "CompTIA Security+",
  "CompTIA Network+",
  "CompTIA A+",
];

export const competitions = [
  { name: "MAGIC Capture the Flag 18", result: "Third place" },
  { name: "UMGC MAGIC Capture the Flag, Spring 2025", result: "Second place" },
  { name: "Hack The Box — Hack the Madness", result: "Third place" },
  { name: "Hack The Box", result: "Global ranking within the top 800 in 2025" },
];

export const otherTraining =
  "Additional cybersecurity training and competition participation through TryHackMe, National Cyber League, MetaCTF, and LetsDefend.";

export const experience: Job[] = [
  {
    org: "Starbucks",
    role: "Barista",
    location: "Sacramento, California",
    start: "2026",
    end: "Present",
    bullets: [
      "Collaborate with team members in a fast-paced, customer-facing environment.",
      "Maintain accuracy and efficiency while managing competing operational priorities.",
      "Communicate effectively with customers, colleagues, and leadership.",
      "Follow established operational, safety, and quality assurance procedures.",
      "Demonstrate adaptability, accountability, and effective time management.",
    ],
  },
  {
    org: "Sacramento County — Department of Public Health",
    role: "Medical Assistant",
    location: "Sacramento, California",
    start: "December 2024",
    end: "April 2025",
    bullets: [
      "Supported clinical and administrative operations within a public-sector healthcare environment.",
      "Maintained accurate and confidential patient information.",
      "Collaborated with healthcare professionals to coordinate patient care and operational workflows.",
      "Adhered to established privacy, documentation, and regulatory requirements.",
    ],
  },
  {
    org: "Sacramento County — Department of Health Services",
    role: "Medical Assistant",
    location: "Sacramento, California",
    start: "November 2023",
    end: "December 2024",
    bullets: [
      "Supported daily clinical operations and patient services.",
      "Utilized electronic healthcare information systems to document and retrieve information.",
      "Coordinated responsibilities across multidisciplinary teams.",
      "Maintained accuracy and confidentiality when handling sensitive information.",
      "Managed multiple responsibilities within a regulated professional environment.",
    ],
  },
  {
    org: "One Community Health",
    role: "Medical Assistant",
    location: "Sacramento, California",
    start: "June 2020",
    end: "November 2023",
    bullets: [
      "Provided clinical and administrative support within a community healthcare organization.",
      "Maintained patient documentation and supported electronic health record workflows.",
      "Collaborated with medical professionals to support efficient service delivery.",
      "Developed strong interpersonal, organizational, and problem-solving skills.",
    ],
  },
];

export const interests = [
  "Systems programming",
  "Operating system internals",
  "Computer architecture",
  "Software vulnerability research",
  "Reverse engineering",
  "Memory safety",
  "Secure software development",
  "Open-source infrastructure",
  "Critical infrastructure and industrial control system security",
];
