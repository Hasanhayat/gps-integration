export async function POST(req: Request) {
  const body = await req.json();

  console.log("Location received:", body);

  return Response.json({
    success: true,
    message: "Location saved successfully",
    data: body,
  });
}
