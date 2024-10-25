export const SelectTravelesList = [
  {
    id: 1,
    tittle: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    tittle: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    tittle: "Family",
    desc: "A group of fun loving adv",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    tittle: "Freinds",
    desc: "A bunch of thrill-seekes",
    icon: "⛷️",
    people: "5 to 10 people",
  },
];

export const SelectedBudgetOptions = [
  {
    id: 1,
    tittle: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    tittle: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    tittle: "Luxury",
    desc: "Dont worry about cost",
    icon: "💲",
  },
];

export const AI_PROMPT =
  "  Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget , Give me a Hotels options list with HotelName , Hotel address, price ,geo Coordinates, rating , descriptions and suggest itinerary with placeName , Place Details , Place Image Url , Geo Coordinates , ticket Pricing ,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
