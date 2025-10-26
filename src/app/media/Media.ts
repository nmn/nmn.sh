export type MediaItem = {
  title: string;
  link: string;
  source: string;
  date: string; // YYYY-MM-DD
  image?: {
    src: string;
    width: number;
    height: number;
  };
};

export const mediaItems: ReadonlyArray<MediaItem> = [
  {
    title: "Whiskey, Web and Whatnot",
    link: "https://www.youtube.com/watch?v=oEr-JnGMe3Y",
    source: "YouTube",
    date: "2025-10-23",
    image: {
      src: "/media/2025-www-pod.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Logrocket - StyleX",
    link: "https://podrocket.logrocket.com/stylex-naman-goel",
    source: "Podcast",
    date: "2024-02-22",
    image: {
      src: "/media/podrocket-cover.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Devtools FM - StyleX",
    link: "https://www.youtube.com/watch?v=34TvzOdkw0I",
    source: "YouTube",
    date: "2024-06-16",
    image: {
      src: "/media/2024-devtools-fm.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Facebook Did It Again",
    link: "https://www.youtube.com/watch?v=dphmbB77W_4&t=34s",
    source: "YouTube",
    date: "2023-12-12",
    image: {
      src: "/media/2023-web-dev-simplified-stylex.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "StyleX 🎨 Performant, Reliable and Scalable Styles",
    link: "https://www.youtube.com/watch?v=TdlbG_r8hAc&t=67s",
    source: "YouTube",
    date: "2025-02-02",
    image: {
      src: "/media/2025-nl-tech-stylex-intro.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "StyleX: Meta's Solution To CSS At Scale",
    link: "https://www.youtube.com/watch?v=6ZDiGtg1jN4",
    source: "YouTube",
    date: "2023-12-05",
    image: {
      src: "/media/2023-jack-stylex.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Could this replace Tailwind? Facebooks alternative - StyleX",
    link: "https://www.youtube.com/watch?v=JANdqfdMbrQ",
    source: "YouTube",
    date: "2023-12-06",
    image: {
      src: "/media/2023-jollycoding-stylex.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Meta's “Tailwind Killer” Is Almost Perfect...",
    link: "https://www.youtube.com/watch?v=6aHlgT8-jLU",
    source: "YouTube",
    date: "2024-05-16",
    image: {
      src: "/media/2024-connor-stylex.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "The Truth About Facebook's “Tailwind Killer”",
    link: "https://www.youtube.com/watch?v=vpAXHtPK8nA",
    source: "YouTube",
    date: "2023-12-17",
    image: {
      src: "/media/2023-josh-stylex.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Facebook's Tailwind Killer Is Now Open Source",
    link: "https://www.youtube.com/watch?v=v4HkkjXmEMM",
    source: "YouTube",
    date: "2023-12-14",
    image: {
      src: "/media/2023-theo-stylex-2.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Facebook Tried Tailwind, Then Built This Instead",
    link: "https://www.youtube.com/watch?v=PHV94q7BivI",
    source: "Youtube",
    date: "2023-10-02",
    image: {
      src: "/media/2023-theo-stylex-1.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Slightly More Advanced Flow™",
    link: "https://www.youtube.com/watch?v=jYwpPQT85hs",
    source: "YouTube",
    date: "2017-09-25",
    image: {
      src: "/media/2017-reactjs-sf-meetup.jpg",
      width: 1280,
      height: 720,
    },
  },
];
