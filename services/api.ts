// API read acess
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY


// api_key
// 4f5f90dca93569bbbaf1bc34ee0292d7

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


// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjVmOTBkY2E5MzU2OWJiYmFmMWJjMzRlZTAyOTJkNyIsIm5iZiI6MTc2OTkzMDg2NS4yNzIsInN1YiI6IjY5N2YwMDcxNWJhZTlkZTRmMjFjNWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rOKjLGoFLpDbzdWtTgeUM6RjHDQV84Z8dJNBun8trY'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

export default useFetchMovies;