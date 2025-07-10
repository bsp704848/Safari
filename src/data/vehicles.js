import BikeImage from "../assets/images/Bike.webp";
import AutoImage from "../assets/images/auto.webp";
import CabEconomyImage from "../assets/images/taxi.webp";
import CabPremiumImage from "../assets/images/taxi premium.webp";

export const VEHICLES = [
  {
    name: "Bike",
    icon: BikeImage,
    type: "bike",
    minFarePerKm: 5,
    maxFarePerKm: 10,
  },
  {
    name: "Auto Rickshaw",
    icon: AutoImage,
    type: "auto",
    minFarePerKm: 10,
    maxFarePerKm: 20,
  },
  {
    name: "Cab Economy",
    icon: CabEconomyImage,
    type: "cab",
    minFarePerKm: 25,
    maxFarePerKm: 40,
  },
  {
    name: "Cab Premium",
    icon: CabPremiumImage,
    type: "cab-premium",
    minFarePerKm: 40,
    maxFarePerKm: 50,
  },
];
