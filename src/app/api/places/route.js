import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const jsonFilePath = path.join(process.cwd(), "src", "app", "jsonData", "places.json");
  const data = await fs.readFile(jsonFilePath, "utf-8");

  return NextResponse.json(JSON.parse(data));
}
