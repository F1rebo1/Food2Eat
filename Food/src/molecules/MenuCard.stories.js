import { MenuCard } from "./MenuCard.jsx";

export default {
  title: 'molecules/MenuCard',
  component: MenuCard,
};

const cards = [
    {
      description: "Lana Del Rey",
      title: "Summertime Sadness",
      src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: "Lana Del Rey, an iconic American singer-songwriter, is celebrated for" +
          "her melancholic and cinematic music style. Born Elizabeth Woolridge" +
          "Grant in New York City, she has captivated audiences worldwide with" +
          "her haunting voice and introspective lyrics. <br /> <br /> Her songs" +
          "often explore themes of tragic romance, glamour, and melancholia," +
          "drawing inspiration from both contemporary and vintage pop culture." +
          "With a career that has seen numerous critically acclaimed albums, Lana" +
          "Del Rey has established herself as a unique and influential figure in" +
          "the music industry, earning a dedicated fan base and numerous" +
          "accolades."
    },
];


export const menuCardOne = {
  args: {
    label: 'Aceternity Menu Card',
    cards: cards,
  },
};