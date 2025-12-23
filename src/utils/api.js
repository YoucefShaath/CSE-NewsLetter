export const toggleDepartmentFollow = async (departmentName, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments/follow/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Ensure you pass the access token
    },
    body: JSON.stringify({
      department: departmentName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update follow status");
  }

  return await response.json();
};
