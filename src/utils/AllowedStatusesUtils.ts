
import { ReservationStatus } from "../types/reservation";

export const handleAllowedStatuses = (reservationStatus: ReservationStatus) => {
    switch (reservationStatus) {
      case "Reserved":
        return ["Canceled", "Due In", "Reserved"];

      case "Due In":
        return ["Canceled", "In House", "No Show", "Due In"];

      case "In House":
        return ["Checked Out", "In House"];

      case "Checked Out":
        return ["In House", "Checked Out"];

      case "Canceled":
        return ["Reserved", "Canceled"];

      default:
        return [reservationStatus];
    }
  };