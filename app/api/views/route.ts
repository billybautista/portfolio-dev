import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    // Fetch the page views document
    const result = await client.fetch(
      `*[_type == "pageViews" && page == $page][0]`,
      { page }
    );

    if (!result) {
      return NextResponse.json({
        page,
        views: 0,
      });
    }

    return NextResponse.json({
      page: result.page,
      views: result.views || 0,
    });
  } catch (error) {
    console.error("Error fetching page views:", error);
    return NextResponse.json(
      { error: "Failed to fetch page views" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { page } = await request.json();

    if (!page || typeof page !== "string") {
      return NextResponse.json(
        { error: "Page parameter is required and must be a string" },
        { status: 400 }
      );
    }

    // Find existing document or create new one
    const existingDoc = await writeClient.fetch(
      `*[_type == "pageViews" && page == $page][0]`,
      { page }
    );

    let result;

    if (existingDoc) {
      // Increment existing views
      result = await writeClient
        .patch(existingDoc._id)
        .set({
          views: (existingDoc.views || 0) + 1,
          lastViewed: new Date().toISOString(),
        })
        .commit();
    } else {
      // Create new document
      result = await writeClient.create({
        _type: "pageViews",
        page,
        views: 1,
        lastViewed: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      views: result.views,
      page: result.page,
    });
  } catch (error) {
    console.error("Error incrementing page views:", error);
    return NextResponse.json(
      { error: "Failed to increment page views" },
      { status: 500 }
    );
  }
}
