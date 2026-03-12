// fetchTrending.ts
 const BACKEND_URL = "https://movieapp-acny.onrender.com"; // update for emulator/device

export default async function fetchTrending() {
  const res = await fetch(`${BACKEND_URL}/trending`);
  const data = await res.json();
 
  return data;
}


