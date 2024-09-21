import { supabase } from "@/utils/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, clerk_id: clerkId }])
      .select();

    if (error) {
      console.error("Error inserting user:", error);
      return Response.json({ error: "Failed to create user" }, { status: 500 });
    }

    return Response.json(
      { message: "User created Successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.log("Unexpected error: ", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
