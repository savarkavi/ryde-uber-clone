import { supabase } from "@/utils/supabase";

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase.from("drivers").select();

    if (error) {
      return Response.json({
        error: "Failed to fetch drivers",
        status: 500,
      });
    }

    return Response.json({ data });
  } catch (error) {
    console.log("Unexpected error: ", error);
    return Response.json({
      error: "An unexpected error occurred",
      status: 500,
    });
  }
}
