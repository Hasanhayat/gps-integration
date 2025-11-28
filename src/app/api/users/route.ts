
export async function GET() {
  const users = [
    { id: 1, name: "Hasan Hayat", role: "Admin" },
    { id: 2, name: "Ali Raza", role: "Manager" },
    { id: 3, name: "Usman Khan", role: "Employee" },
  ];

  return Response.json({
    success: true,
    message: "Demo users fetched successfully",
    data: users,
  });
}
