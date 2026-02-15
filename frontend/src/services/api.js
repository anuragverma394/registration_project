
export const registerUser = async (form) => {
  console.log("SENDING TO BACKEND 👉", form);
  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),   
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
