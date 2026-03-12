export default async function saveUser(username , email, password , confirmPass) {
  try {
    // Optional frontend validation
    if (password !== confirmPass) {
      return { success: false, message: "Passwords do not match" };
    }

    const res = await fetch("https://movieapp-acny.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPass,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, data };

  } catch (err) {
    console.log("Error saving user details:", err);
    return { success: false, message: "Something went wrong" };
  }
}
