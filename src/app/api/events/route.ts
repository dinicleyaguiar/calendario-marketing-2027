import { marketingEvents2027 } from "@/data/marketing-events-2027";

export async function GET() {
  return Response.json({
    year: 2027,
    total: marketingEvents2027.length,
    events: marketingEvents2027,
  });
}


