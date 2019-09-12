export const legendCategories = [
  {
    label: "Asian",
    race: "Asian",
    party: "Democratic",
    id: "asian-democratic",
    category: "race"
  },
  {
    label: "Black",
    race: "Black",
    party: "Democratic",
    id: "black-democratic",
    category: "race"
  },
  {
    label: "Latinx",
    race: "Latino/a",
    party: "Democratic",
    id: "latinx-democratic",
    category: "race"
  },
  {
    label: "White",
    race: "White",
    party: "Democratic",
    id: "white-democratic",
    category: "race"
  },
  { label: "White", 
    race: "White", 
    party: "Republican", 
    id: "white-republican",
    category: 'race'
  },
  {
    label: "Leadership",
    race: "",
    party: "",
    id: "conference-leadership",
    category: "in_legislative_leadership"
  }
];

export const toolsApiKey = process.env.REACT_APP_TOOLS_API_KEY;

export const legApiKey = process.env.REACT_APP_LEG_API_KEY;
