import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role, eventType } = await req.json();

    // Handle role creation or update
    console.log(`Event Type: ${eventType}, Role: ${role}`);
    // Process the role and event type as needed

    return NextResponse.json({ message: "Role event processed successfully." });
  } catch (error) {
    console.error("Error processing role event:", error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  try {
    const { role, eventType } = await req.json();

    // Handle role deletion
    console.log(`Event Type: ${eventType}, Role: ${role}`);
    // Process the role deletion as needed

    return NextResponse.json({
      message: "Role deletion processed successfully.",
    });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.error();
  }
}
