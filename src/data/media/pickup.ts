import { shot } from "./index";
import checkoutDates from "@/assets/pickup/checkout-dates.webp";
import orders from "@/assets/pickup/orders.webp";

const P = "/media/pickup";

export const pickupMedia = {
  heroDesktop: shot("PIC-H1", `${P}/hero/dashboard.png`, "Pickup & Delivery admin: orders by fulfillment method and delivery zones", "Appstle Pickup & Delivery delivery zone management with zones, rates and location-based rules on a map", { standIn: orders, standInFit: "cover" }),
  heroMobile: shot("PIC-H2", `${P}/hero/product-mobile.png`, "Product page with pickup / delivery / shipping choice and a date picker (mobile)", "Pickup and delivery options shown directly on a product page", { frame: "mobile", standIn: checkoutDates, standInFit: "cover" }),
};
