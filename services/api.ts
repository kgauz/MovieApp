import  { useState } from "react";


export const TMDB_CONFIG = {
  Baseurl: "https://api.themoviedb.org/3",
  API_KEY:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY",
  },
};
const latestTVEndpoint = `${TMDB_CONFIG.Baseurl}/discover/tv?sort_by=first_air_date.desc`;


const useFetchMovies = async ({ query }: { query: string }) => {
 
  const endPoint = query
    ? `${TMDB_CONFIG.Baseurl}/search/multi?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.Baseurl}/movie/popular?language=en-US&page=1`;
    // https://api.themoviedb.org/3/movie/popular


  console.log("HEADERS:", TMDB_CONFIG.headers);

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("failed to fech movies");
  }
  const data = await response.json();
  // console.log(data);

  return data.results.map((item: any) => ({
  id: item.id,
  title: item.title || item.name,
  poster_path: item.poster_path,
  backdrop_path: item.backdrop_path,
  release_date: item.release_date || item.first_air_date,
  vote_average: item.vote_average,
  overview: item.overview,
  movie_type: item.media_type || (item.first_air_date ? "tv" : "movie"), 
}));
};

export default useFetchMovies;

export const fetchLatestTV = async () => {
  try {
    const res = await fetch(
      `${TMDB_CONFIG.Baseurl}/discover/tv?sort_by=first_air_date.desc&language=en-US&vote_count.gte=5&with_original_language=en`,
      {
        headers: TMDB_CONFIG.headers,
      }
    );
    
    if (!res.ok) throw new Error("Failed to fetch latest TV series");

    const data = await res.json();
      return data.results.map((item: any) => ({
  id: item.id,
  title: item.title || item.name,
  poster_path: item.poster_path,
  release_date: item.release_date || item.first_air_date,
  vote_average: item.vote_average,
  movie_type: "tv", 
}));
  } catch (err) {
    console.log("API Error:", err);
    return [];
  }
};



export const TrendingMovieThisweek= async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/trending/movie/day`,
         { headers: TMDB_CONFIG.headers,} );

         if(!res.ok)
         {
          throw new Error("failed to fetch trending movies this week");
         }
         const data = await res.json();
         console.log(data);

      
  return data.results.map((item: any) => ({
  id: item.id,
  title: item.title || item.name,
  poster_path: item.poster_path,
  release_date: item.release_date || item.first_air_date,
  vote_average: item.vote_average,
  movie_type: item.media_type, 
   backdrop_path: item.backdrop_path,
   overview:item.overview,
}));

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};



export const TrendingTvSeriesThisweek= async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/trending/tv/day`,
         { headers: TMDB_CONFIG.headers,} );

         if(!res.ok)
         {
          throw new Error("failed to fetch trending tv this week");
         }
         const data = await res.json();
         console.log(data);

        return data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        release_date: item.release_date || item.first_air_date,
        vote_average: item.vote_average,
        movie_type: "tv", 
        backdrop_path: item.backdrop_path,
         overview:item.overview,
      }));

      
  

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};



export const fetchPopularSeries = async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/tv/popular`,
         { headers: TMDB_CONFIG.headers,} );

         if(!res.ok)
         {
          throw new Error("failed to fetch popular TV series");
         }
         const data = await res.json();
         console.log(data);

        return data.results.map((item: any) => ({
  id: item.id,
  title: item.title || item.name,
  poster_path: item.poster_path,
  release_date: item.release_date || item.first_air_date,
  vote_average: item.vote_average,
  movie_type:"tv", 
}));

      
  

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};




export const topRatedMovies= async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
         { headers: TMDB_CONFIG.headers,} );

         if(!res.ok)
         {
          throw new Error("failed to fetch trending movies this week");
         }
         const data = await res.json();
        

      
  return data.results.map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date || item.first_air_date,
      vote_average: item.vote_average,
      movie_type: item.media_type, 
      backdrop_path: item.backdrop_path,
    }));

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};

export const TopRatedSeries = async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`,
         { headers: TMDB_CONFIG.headers,} );
         if(!res.ok)
         {
          throw new Error("failed to fetch popular TV series");
         }
         const data = await res.json();
         console.log(data);

        return data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        release_date: item.release_date || item.first_air_date,
        vote_average: item.vote_average,
        movie_type:"tv", 
      }));

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};




export const upcomingMovies= async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/movie/now_playing`,
         {method:"GET", headers: TMDB_CONFIG.headers,} );

         if(!res.ok)
         {
          throw new Error("failed to fetch upcoming  movies");
         }
         const data = await res.json();
        

      
  return data.results.map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date || item.first_air_date,
      vote_average: item.vote_average,
      movie_type: item.media_type, 

    }));

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};



export const OntheAirSeries = async () =>{
     try{
      const res = await fetch(`${TMDB_CONFIG.Baseurl}/tv/on_the_air`,
         { headers: TMDB_CONFIG.headers,} );
         if(!res.ok)
         {
          throw new Error("failed to fetch on the air TV series");
         }
         const data = await res.json();
     

        return data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        release_date: item.release_date || item.first_air_date,
        vote_average: item.vote_average,
        movie_type:"tv", 
      }));

     }
     catch(err){
      console.log("API Error", err);
      return [];
     }
};

export const fetchMovieById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`, { headers: TMDB_CONFIG.headers,} 
  );
  if(!res.ok)
  {
    console.error("Movie id is invalid or movie not found");
  }
   const data = await res.json();

 return {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path || data.backdrop_path,
      release_date: data.release_date,
      vote_average: data.vote_average,
      movie_type: "movie",
    };
    
};

export const fetchSeriesById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}`,{ headers: TMDB_CONFIG.headers,} 
  );

  if(!res.ok)
  {
    console.error("series id is invalid or series not found");
  }
   const data = await res.json();

    return {
      id: data.id,
      title: data.name, 
      poster_path: data.poster_path || data.backdrop_path,
      release_date: data.first_air_date,
      vote_average: data.vote_average,
      movie_type: "tv",
    };
  
  
};










  
  
  
  
  