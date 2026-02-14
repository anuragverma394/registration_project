// const BASE_URL = "http://localhost:3000";

// export const registerUser = async (payload) => {
//   const res = await fetch(`${BASE_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message || "Request Failed");

//   return data;
// };
export const registerUser = async (form) => {
  console.log("SENDING TO BACKEND 👉", form);
  const res = await fetch("http://localhost:3000/register", {
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
