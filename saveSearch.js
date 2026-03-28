export default async function saveSearchToDB(movie) {
  try {
    const res = await fetch("https://movieapp-acny.onrender.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieID: movie.id,
        title: movie.title,
        poster_url: movie.poster_path,
        movieType:movie.media_type,
      }),
    });

    const data = await res.json();
    console.log(data);

  } catch (err) {
    console.log("Error saving search:", err);
  }
}
