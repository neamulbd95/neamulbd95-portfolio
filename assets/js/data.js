    // =================
    // CONFIGURATION
    // =================
    const NEAMUL_EMAIL = "neamulhaque.naem@gmail.com";
    const CV_PATH = "./assets/cv/Neamul-Haque-Khan-CV.pdf";
    const CV_DOWNLOAD_NAME = "Neamul_Haque_Khan_CV.pdf";

    const SKILLS = [
      {
        title: "Backend",
        icon: "server",
        items: ["C#", ".NET / ASP.NET Core", "ASP.NET MVC", "EF Core", "REST APIs", "Java Spring Boot"]
      },
      {
        title: "Frontend",
        icon: "layout",
        items: ["JavaScript", "jQuery", "Angular", "HTML5", "CSS", "Bootstrap"]
      },
      {
        title: "Data",
        icon: "database",
        items: ["SQL Server", "Relational design", "Stored procedures", "Triggers", "Data migration"]
      },
      {
        title: "Architecture",
        icon: "layers",
        items: ["Microservices", "SaaS", "SOLID", "Dependency Injection", "Repository Pattern", "Layered Architecture"]
      },
      {
        title: "AI / GenAI",
        icon: "spark",
        items: ["RAG", "Vector databases", "Enterprise knowledge retrieval", "AI agents", "AI code review"]
      },
      {
        title: "Delivery",
        icon: "rocket",
        items: ["Azure DevOps", "Docker", "IIS", "Git", "Apache Superset", "Production deployment"]
      }
    ];

    // type: "ai" | "backend" | "fullstack"
    const PROJECTS = [
      {
        title: "ESG Management Platform",
        type: "fullstack",
        role: "Ernst & Young",
        blurb: "Enterprise ESG platform for automating data collection and supporting environmental, social, and governance reporting. Contributed within a SaaS microservice architecture and integrated reporting through Apache Superset.",
        tech: ["Java Spring Boot", "Angular", "Microservices", "Apache Superset", "Azure DevOps"]
      },
      {
        title: "ESG Factsheet — Configurable CMS",
        type: "backend",
        role: "Team Lead",
        blurb: "Highly configurable CMS for ESG factsheet content and presentation. Worked as Team Lead with a backend focus, guiding implementation and supporting end-to-end delivery through production deployment.",
        tech: ["Backend Development", "Configurable Content", "Deployment"]
      },
      {
        title: "GenAI RAG Chatbot",
        type: "ai",
        role: "Ernst & Young",
        blurb: "Retrieval-augmented chatbot that grounds LLM responses in enterprise knowledge retrieved through vector search from relational data and file-system documents.",
        tech: ["RAG", "Vector Database", "RDBMS", "File System"]
      },
      {
        title: "AI Engineering Automation",
        type: "ai",
        role: "Ernst & Young",
        blurb: "AI-driven development workflows with task-specific instructions and specialized code-review agents for repeatable engineering tasks and focused quality checks.",
        tech: ["AI Agents", "Code Review", "Task-Specific Instructions"]
      },
      {
        title: "Marketing Automation Platform",
        type: "fullstack",
        role: "Full-Stack Developer",
        blurb: "Campaign-oriented marketing automation application. Worked across backend services, persistence, APIs, UI functionality, and workflow implementation.",
        tech: [".NET", "JavaScript", "SQL Server"]
      },
      {
        title: "Approval Management System",
        type: "fullstack",
        role: "Summit Communications",
        blurb: "Dynamic, configurable digital approval workflows — covering architecture, deployment, maintenance, and production support.",
        tech: [".NET 5", "jQuery", "SQL Server"]
      },
      {
        title: "OPUS Workflow Management System",
        type: "fullstack",
        role: "Summit Communications",
        blurb: "Workflow management system — developed three modules and supervised delivery of an additional module.",
        tech: ["ASP.NET MVC", "jQuery", "SQL Server"]
      },
      {
        title: "InstaForex Services & Client Portal",
        type: "backend",
        role: "IT Grow Division",
        blurb: "API development, documentation, account workflows, and client-portal features for secure.instaforex.com and related services.",
        tech: ["ASP.NET Core", "REST APIs", ".NET Web Forms"]
      }
    ];

    const EXPERIENCE = [
      { role: "Senior Software Engineer · Team Lead", org: "Ernst & Young (EY)", period: "May 2022 – Present", current: true,
        bullets:[
          "Serve as Dev Lead, providing technical direction while remaining hands-on with architecture, implementation, code review, delivery, and deployment.",
          "Led backend development for ESG Factsheet, a highly configurable CMS, and helped take the product from implementation through release and deployment.",
          "Worked as a Full-Stack Developer on a marketing automation platform across backend services, persistence, APIs, web UI, and campaign-oriented workflows.",
          "Implemented GenAI solutions including a RAG chatbot with vector search over RDBMS and file-system sources, plus task-specific AI code-review agents and engineering workflows."
        ]},
      { role: "Software Engineer", org: "Summit Communications Limited", period: "Dec 2020 – Mar 2022",
        bullets:[
          "Developed an automated Approval Management System using .NET 5, jQuery, and SQL Server, supporting configurable digital approval workflows.",
          "Designed relational database components, stored procedures, and triggers; also handled deployment, data migration, maintenance, and production support."
        ]},
      { role: "Software Engineer", org: "IT Grow Division Ltd.", period: "Mar 2018 – Dec 2020",
        bullets:[
          "Developed backend services and web applications using ASP.NET, ASP.NET Core, SQL Server, and IIS following SOLID and Agile engineering practices.",
          "Contributed to secure.instaforex.com and related services covering account onboarding, verification, payments, and REST API development."
        ]},
      { role: "Software Engineer", org: "RRMSense Global Systech Limited", period: "Nov 2017 – Jan 2018",
        bullets:[
          "Performed software performance and usability testing and supported application quality validation activities."
        ]}
    ];

    const EDUCATION = [
      {
        degree: "B.Sc. in Software Engineering",
        school: "American International University-Bangladesh (AIUB), Dhaka",
        detail: "CGPA: 3.15"
      }
    ];

    const CERTIFICATIONS = [
      { title: "C# Advanced Topics: Prepare for Technical Interviews", issuer: "Udemy",
        link: "https://www.udemy.com/certificate/UC-631ae4dd-fa74-4778-a5b9-a75bd1d27940/" },
      { title: "Angular – The Complete Guide", issuer: "Udemy",
        link: "https://www.udemy.com/certificate/UC-26d36285-a914-4869-aa80-ffd03627c36e/" },
      { title: "ChatGPT & Generative AI – The Complete Guide", issuer: "Udemy", link: "" },
      { title: "Python for Data Science and AI", issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/certificate/BNCDUZJ6T7F5" },
      { title: "What is Data Science?", issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/certificate/5WVM9ZFV7TEK" }
    ];
