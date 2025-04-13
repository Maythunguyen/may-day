import {
  IconCircleDottedLetterJ,
  IconBrandTabler,
  IconStars,
  IconDropletHalf2,
  IconHeart,
  IconUsers,
  IconCirclePlus,
  IconTag
} from "@tabler/icons-react";

import {
  IconMoodSmile,
  IconMoodEmpty,
  IconMoodSad,
  IconMoodAngry,
  IconMoodConfuzed,
  IconMoodCrazyHappy,
  IconZzz,
  IconBrain

} from "@tabler/icons-react";
import {  UserButton } from "@clerk/nextjs";

export const navItems = [
    {
      name: "About May Day",
      link: "#about-mayday",
    },
    {
      name: "Features",
      link: "#features",
    },
    
];

// Thumbnails for the products in Hero sections

export const products = [
  {
    title: "Moonbeam",
    link: "#",
    thumbnail:
      "/girl1.webp",
  },
  {
    title: "Cursor",
    link: "#",
    thumbnail:
      "girl-bf.webp",
  },
  {
    title: "Rogue",
    link: "#",
    thumbnail:
      "/girl-df.webp",
  },

  {
    title: "Editorially",
    link: "#",
    thumbnail:
      "girl-sad.webp",
  },
  {
    title: "Editrix AI",
    link: "#",
    thumbnail:
      "girl-hp.webp",
  },
  {
    title: "Pixel Perfect",
    link: "#",
    thumbnail:
      "girl-fm.webp",
  },

  {
    title: "Algochurn",
    link: "#",
    thumbnail:
      "/girl-dog.webp",
  },
  {
    title: "Algochurn",
    link: "#",
    thumbnail:
      "/girl-cf.webp",
  },
  {
    title: "Algochurn",
    link: "#",
    thumbnail:
      "/girl-dogg.webp",
  },
];

// Sidebar links
export const links = [
  {
    label: "Profile",
    href: "#",
    icon: (
      < UserButton className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  
  {
    label: "Create Journal",
    href: "#",
    icon: (
      <IconCirclePlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "AI Insights",
    href: "#",
    icon: (
      <IconBrain className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Tags Library",
    href: "#",
    icon: (
      <IconTag className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export const dashboardItems = [

  {
    label: "Daily Journal",
    href: "#",
    icon: (
      <IconCircleDottedLetterJ className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Gratitude Log",
    href: "#",
    icon: (
      <IconStars className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dating Reflections",
    href: "#",
    icon: (
      <IconHeart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-red-200" />
    ),
  },
  {
    label: "People",
    href: "#",
    icon: (
      <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dream",
    href: "#",
    icon: (
      <IconZzz className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },

];

export const tagItems = [
  {
    title: "Daly Journal",
    description:
      "A normal day in a life of a person. Nothing special, just a normal day and just want to write something.",
    icon: <IconCircleDottedLetterJ />,
  },
  {
    title: "Gratitude Log",
    description:
      "There's so many things or just one thing to be grateful for. Just write it down.",
    icon: <IconStars />,
  },
  {
    title: "Dating Reflections",
    description:
      "Some expereiences from dating moments. Some good, some bad. Need to be reflected to choose the right one.",
    icon: <IconHeart />,
  },
  {
    title: "People",
    description: "Some relationship around me can bring some negative or positive energy. Also need to be reflected.",
    icon: <IconUsers />,
  },
  {
    title: "Dream",
    description: "I just want to write down my dreams. I don't know why, but I just want to.",
    icon: <IconZzz />,
  },
  {
    title: "What else ?",
    description: "Do you think there's something else to be reflected? Just let me know.",
    icon: <IconDropletHalf2 />,
  },
];

export const moods = [
  {
    label: "Happy",
    icon: <IconMoodSmile className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Sad",
    icon: (
      <IconMoodSad className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Angry",
    icon: (
      <IconMoodAngry className="h-5 w-5 shrink-0 text-neutral-700 dark:text-red-200" />
    ),
  },
  {
    label: "Excited",
    icon: (
      <IconMoodCrazyHappy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-red-200" />
    ),
  }, 
  {
    label: "Normal",
    icon: (
      <IconMoodEmpty className="h-5 w-5 shrink-0 text-neutral-700 dark:text-red-200" />
    ),
  },
  {
    label: "Confused",
    icon: (
      <IconMoodConfuzed className="h-5 w-5 shrink-0 text-neutral-700 dark:text-red-200" />
    ),
  },
]

export const aboutMayDaysItems = [
  {
    title: "Daily Journal",
    description:
      "Write and organize your thoughts, dreams, and reflections to track your emotional journey over time.",
    link: "#",
  },
  {
    title: "Gratitude Log",
    description:
      "Capture small moments of appreciation each day to cultivate positivity and emotional balance.",
    link: "#",
  },
  {
    title: "People & Connections",
    description:
      "Reflect on your interactions and let AI help you understand who uplifts or drains your energy.",
    link: "#",
  },
  {
    title: "Dating Reflections",
    description:
      "Receive thoughtful, therapist-like insights based on sentiment analysis of your journal entries.",
    link: "#",
  },
  {
    title: "Emotional Insights",
    description:
      "Analyse your emotional patterns and gain insights into your mental well-being.",
    link: "#",
  },
  {
    title: "Mood Tracker",
    description:
      "Tag each entry with your mood and monitor trends in your emotional well-being over time.",

    link: "#",
  },
];
