import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Virendra Pal",
  initials: "DV",
  url: "https://virendra.io",
  location: "Swastik Vihar Colony, Rau, indore",
  locationLink: "https://www.google.com/maps/place/Swastik+Vihar+Colony,+Rau,+Indore,+Madhya+Pradesh+453331/@22.6335388,75.792856,15z/data=!3m1!4b1!4m6!3m5!1s0x3962f9590f0eea57:0x342013beb65c043b!8m2!3d22.6335395!4d75.8031558!16s%2Fg%2F11gfjvlhrh?entry=ttu",
  description:
    "Full Stack Developer turned Entrepreneur. Driven by a passion for building innovative solutions and empowering communities through technology. Highly active on Twitter, engaging with peers and sharing insights in the tech landscape.",
  summary:
    "Since starting at [Sage University Indore](https://sageuniversity.in/) in 2022, I have been pursuing a [Bachelor of Computer Applications (BCA)](https://hub.sunstone.in/#/dashboard) degree while immersing myself in practical experiences. Currently, I am in my 5th semester and working full-time at [Moreyeahs](https://www.moreyeahs.com/) as part of an offline internship. This role allows me to apply my academic knowledge in a real-world setting and gain valuable industry experience.",
  avatarUrl: "/pro2.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    'linux',
    'Javascript',
    'Html',
    'css', 
    'Tailwind Css'
    
  
    
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "palv09172@gmail.com",
    tel: "+917307544335",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Sunstone-Summer-Project",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/virendra-pal-540b82296/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Virendra284402",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:palv09172@gmail.com",
        icon: Icons.email,
  
        navbar: true,
      },
    
    },
  },

  work: [
   
   
    {
      company: "MoreYeahs",
      href: "https://www.moreyeahs.com/",
      badges: [],
      location: "4th Floor B Zone, Business Spaces, Nipania Main Rd, Dewas Naka, Pipliya Kumar, Indore, Madhya Pradesh 453771",
      title: "Trainee Software Developer",
      logoUrl: "/moreyeahs.png",
      start: "July 2024",
      end: "September 2024",
      description:
        "Full Stack Developer with a comprehensive understanding of both front-end and back-end technologies. Skilled in designing, building, and maintaining innovative web applications that provide seamless user experiences. Committed to leveraging the full tech stack to solve complex problems and deliver high-quality software solutions.",
    },
    {
      company: "emossy",
      href: "https://www.emossy.com/",
      badges: [],
      location: "4th Floor B Zone, Business Spaces, Nipania Main Rd, Dewas Naka, Pipliya Kumar, Indore, Madhya Pradesh 453771",
      title: "Trainee Software Developer",
      logoUrl: "/emossy.png",
      start: "July 2024",
      end: "September 2024",
      description:
        "Full Stack Developer with a comprehensive understanding of both front-end and back-end technologies. Skilled in designing, building, and maintaining innovative web applications that provide seamless user experiences. Committed to leveraging the full tech stack to solve complex problems and deliver high-quality software solutions.",
    },

  ],
  education: [
    {
      school: "Jeevan shilp inter college banpur",
      href: "https://www.jeevanshilp.in/",
      degree: "10th",
      logoUrl: "/10.png",
      start: "2020",
      end: "2021",
    },
    {
      school: " SARASWATI VIDYA MANDIR MAHRONI",
      href: "https://schools.org.in/lalitpur/09370500117/saraswati-vidya-mandir-mahroni.html",
      degree: "12th",
      logoUrl: "/12.png",
      start: "2021",
      end: "2022",
    },
    {
      school: "SAGE University Indore",
      href: "https://sageuniversity.in/",
      degree: "Bachelor of Computer Applications (BCA)",
      logoUrl: "/sage.png",
      start: "2022",
      end: "2025",
    },
   
  ],
  projects: [
    {
      title: "Tic Tac Toe",
      href: "https://github.com/viredra284402/Game",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "This is a classic Tic Tac Toe game built using HTML, CSS, and JavaScript. The game allows two players to take turns marking the spaces in a 3x3 grid. The first player to align three of their marks (X or O) in a row, column, or diagonal wins the game.",
      technologies: [
        "Html",
        "javascript",
        'Css'
        
      ],
      links: [
     
        {
          type: "Source",
          href: "https://github.com/viredra284402/Game",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/video/tic.webm",
    },
    {
      title: "X Clone UI",
      href: "https://mausi.freewebhostmost.com/",
      dates: "May 2024 - Present",
      active: true,
      description:
        "This project is a user interface (UI) clone of the X platform, meticulously recreated using Tailwind CSS. Tailwind CSS, a utility-first CSS framework, was employed to build this responsive and visually appealing UI with minimal custom CSS",
      technologies: [
        "Html",
        'Tailwind Css',
        'javascript'
        
      ],
      links: [
        {
          type: "Website",
          href: "https://mausi.freewebhostmost.com/",
          icon: <Icons.globe className="size-3" />,
        },
       
      ],
      image: "",
      video: "/video/x.webm",
    },
    {
      title: "PassOP",
      href: "https://github.com/viredra284402/passop-local",
      dates: "June 2024 - Present",
      active: true,
      description:
        "PassOP is a secure password manager built with HTML, Tailwind CSS, JavaScript, and Next.js. It stores your sensitive data safely in local storage, offering an intuitive and reliable solution for managing passwords.",
      technologies: [
        "Html",
        "Javascript",
        'Tailwind Css',
        'Next js'
        
      ],
      links: [
     
        {
          type: "Website",
          href: "https://passop-local.vercel.app/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/video/passop.webm",
    },
    {
      title: "iTask",
      href: "https://github.com/viredra284402/Game",
      dates: "July 2024 - Present",
      active: true,
      description:
        "iTask is a simple and stylish to-do list app developed with HTML, Tailwind CSS, JavaScript, and React.js. It provides a clean interface for efficiently managing tasks, with a modern design and smooth functionality.",
      technologies: [
        "Html",
        "javascript",
        'Tailwind Css',
        'React js'
        
      ],
      links: [
     
        {
          type: "Source",
          href: "https://github.com/viredra284402/Game",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/video/todo.webm",
    },
    {
      title: "Spotify Clone ",
      href: "https://github.com/viredra284402/SpotifyClone",
      dates: "April 2024 - Present",
      active: true,
      description:
        "A Spotify clone built with HTML, CSS, and JavaScript, replicating the original UI and providing basic music player functionality. Features include responsive design, playback controls, and a search bar.",
      technologies: [
        "Html",
        "javascript",
        'Css',
        
        
      ],
      links: [
     
        {
          type: "Website",
          href: "https://spotify-clone-xi-khaki.vercel.app/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/video/spot.webm",
    },
    
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2013",
      location: "India, Indore",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2013",
      location: "Indore, Indore",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
     ],
} as const;
