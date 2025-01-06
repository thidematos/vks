import { format } from "date-fns";

export function formatMinSec(timestamp) {
  return format(timestamp, "mm:ss 'min'");
}
