// fetchTrending.ts
 const BACKEND_URL = "http://localhost:5000"; // update for emulator/device

export default async function fetchTrending() {
  const res = await fetch(`${BACKEND_URL}/trending`);
  const data = await res.json();
  console.log(data);
  return data;
}


