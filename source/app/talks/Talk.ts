export type Talk = {
  title: string;
  link: string;
  conference: string;
  conferenceLink: string;
  date: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export const talks: ReadonlyArray<Talk> = [
  {
    title: "Cross Platform React",
    link:
      "https://www.youtube.com/watch?v=sl-QUd3YiqA&pp=ygUKTmFtYW4gR29lbA%3D%3D",
    conference: "React Conf",
    conferenceLink: "https://conf.react.dev/talks",
    date: "2024-04-16",
    image: {
      src: "/2024-react-conf.jpg",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Rethinking CSS - Introducing Stylex",
    link:
      "https://www.youtube.com/watch?v=ur-sGzUWId4&pp=ygUKTmFtYW4gR29lbA%3D%3D",
    conference: "React Finland",
    conferenceLink: "https://react-finland.fi/2021/",
    date: "2021-09-01",
    image: {
      src: "/2021-react-finland.png",
      width: 3456,
      height: 1728,
    },
  },
  {
    title: "React 19 and Beyond Panel Discussion",
    link:
      "https://www.youtube.com/watch?v=7u75lMrxZXw&pp=ygUKTmFtYW4gR29lbA%3D%3D",
    conference: "React Nexus",
    conferenceLink: "https://2024.reactnexus.com/",
    date: "2024-07-04",
    image: {
      src: "/2024-react-nexus.png",
      width: 3456,
      height: 1882,
    },
  },
];
