

export const TMDB_CONFIG= {
    Baseurl: 'https://api.themoviedb.org/3' ,
    API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY',
    headers: {
    accept: 'application/json',
    Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY',

  },
       
}

 const useFetchMovies = async({query} : {query: string} ) =>{

    const endPoint = query
  ? `${TMDB_CONFIG.Baseurl}/search/movie?query=${encodeURIComponent(query)}`
  : `${TMDB_CONFIG.Baseurl}/discover/movie?sort_by=popularity.desc`;



  console.log('HEADERS:', TMDB_CONFIG.headers);

      const response = await fetch(endPoint, {
        method:'GET',
        headers: TMDB_CONFIG.headers,
      });

      if(!response.ok)
      {
        throw new Error('failed to fech movies');
      }
      const data = await response.json();
      // console.log(data);

      return data.results;
}


export default useFetchMovies;
