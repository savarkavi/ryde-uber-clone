import { supabase } from "@/utils/supabase";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id) {
    return Response.json({ error: "Missing required fields", status: 400 });
  }

  try {
    const { data } = await supabase.from("rides").select().eq("id", id);

    return Response.json({
      message: "Ride fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Unexpected error: ", error);
    return Response.json({
      error: "An unexpected error occurred",
      status: 500,
    });
  }
}
