export const bandcampProjectUrl = "https://eklipse-music.bandcamp.com/";

export const currentReleaseLedger = [
  {
    href: "https://eklipse-music.bandcamp.com/album/introspection-i-remastered-edition",
    title: "Introspection I (remastered edition)",
    datetime: "2026-03-05",
    playerId: "1220626604",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/moonstone",
    title: "Moonstone",
    datetime: "2024-09-17",
    playerId: "19763814",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/sunfire",
    title: "Sunfire",
    datetime: "2023-08-04",
    playerId: "2406883175",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/nostalgia-remastered-edition",
    title: "Nostalgia (remastered edition)",
    datetime: "2022-04-21",
    playerId: "3728766971",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/empty-spaces-here",
    title: "Empty Spaces Here",
    datetime: "2021-10-09",
    playerId: "852466480",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/idolatry",
    title: "Idolatry",
    datetime: "2020-04-29",
    playerId: "4245822916",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/illusions",
    title: "Illusions",
    datetime: "2011-03-08",
    playerId: "3139998395",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/introspection-ii",
    title: "Introspection II",
    datetime: "2010-03-08",
    playerId: "2555382805",
  },
];

export const archiveReleaseLedger = [
  {
    href: "https://eklipse-music.bandcamp.com/album/introspection-i-original-version",
    title: "Introspection I (original version)",
    label: "2009",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/moon-original-version",
    title: "Moon (original version)",
    label: "2008",
  },
  {
    href: "https://eklipse-music.bandcamp.com/album/sun-original-version",
    title: "Sun (original version)",
    label: "2006",
  },
];

export const releaseLedger = [...currentReleaseLedger, ...archiveReleaseLedger];

export const currentReleaseMarkup = {
  "Introspection I (remastered edition)": {
    slug: "introspection",
    cover: "introspection-i-remastered.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "5 March 2026",
    heading: "Introspection I <small>(remastered edition)</small>",
    description: "<p>An eclectic mix of slower, melancholic sounds set against harsher, faster jungle energy.</p>",
  },
  Moonstone: {
    slug: "moonstone",
    cover: "moonstone.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "17 September 2024",
    heading: "Moonstone",
    coverAlt: "Moonstone album cover",
    description: "<p>The remastered version of the 2008 album <em>Moon</em>.</p>",
  },
  Sunfire: {
    slug: "sunfire",
    cover: "sunfire.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "4 August 2023",
    heading: "Sunfire",
    coverAlt: "Sunfire album cover",
    description: "<p>A deluxe remaster of the 2006 album <em>Sun</em>, combining remastered originals with new tracks.</p>",
  },
  "Nostalgia (remastered edition)": {
    slug: "nostalgia",
    cover: "nostalgia-remastered.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "21 April 2022",
    heading: "Nostalgia <small>(remastered edition)</small>",
    coverAlt: "Nostalgia (remastered edition) cover",
    description:
      "<p>Started around 1999, this definitive edition reinterprets authentic sounds from the 1990s and early-2000s dance scene.</p>",
  },
  "Empty Spaces Here": {
    slug: "empty-spaces",
    cover: "empty-spaces-here.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "9 October 2021",
    heading: "Empty Spaces Here",
    coverAlt: "Empty Spaces Here album cover",
  },
  Idolatry: {
    slug: "idolatry",
    cover: "idolatry.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "29 April 2020",
    heading: "Idolatry",
    coverAlt: "Idolatry album cover",
  },
  Illusions: {
    slug: "illusions",
    cover: "illusions.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    dateLabel: "8 March 2011",
    heading: "Illusions",
    coverAlt: "Illusions album cover",
  },
  "Introspection II": {
    slug: "introspection-ii",
    cover: "introspection-ii.jpg",
    coverWidth: 1200,
    coverHeight: 1106,
    dateLabel: "8 March 2010",
    heading: "Introspection II",
    coverAlt: "Introspection II album cover",
  },
};

export const archiveReleaseMarkup = {
  "Introspection I (original version)": {
    cover: "introspection-i-original.jpg",
    coverWidth: 1200,
    coverHeight: 1106,
    heading: "Introspection I <small>(original version)</small>",
  },
  "Moon (original version)": {
    cover: "moon-original.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    heading: "Moon <small>(original version)</small>",
  },
  "Sun (original version)": {
    cover: "sun-original.jpg",
    coverWidth: 1200,
    coverHeight: 1200,
    heading: "Sun <small>(original version)</small>",
  },
};
