import { marketingEvents2027 } from "@/data/marketing-events-2027";
import { CalendarDashboard } from "@/views/calendar-dashboard";

export default function Home() {
  return <CalendarDashboard initialEvents={marketingEvents2027} />;
}
