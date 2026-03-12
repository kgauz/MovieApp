export default async function saveSearchToDB(movie) {
  try {
    const res = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieID: movie.id,
        title: movie.title,
        poster_url: movie.poster_path,
      }),
    });

  } catch (err) {
    console.log("Error saving search:", err);
  }
}