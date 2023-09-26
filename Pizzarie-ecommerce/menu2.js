const url = 'https://text-translator2.p.rapidapi.com/translate';
  const options = {
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '4d8b13d9fbmsh70b5419ee3950b0p16103fjsn9364c43a3cd7',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
          source_language: 'en',
          target_language: 'id',
          text: 'What is your name?'
      })
  };
  
  try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
  } catch (error) {
      console.error(error);
  }