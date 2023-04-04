import Notiflix from 'notiflix';

export const fetchCountries = name => {
  const filteredQuery = new URLSearchParams({
    fields: ['flags', 'capital', 'population', 'name', 'languages'],
  }).toString();
  const url = `https://restcountries.com/v3.1/name/${name}?${filteredQuery}`;
  let isSuccess = true;
  return new Promise((resolve, reject) => {
    if (isSuccess) {
      resolve(
        fetch(url).then(response => {
          if (response.status === 404) {
            isSuccess = false;
            reject(
              Notiflix.Notify.failure(
                'Oops, there is no country with that name'
              )
            );
            console.clear();
          }
          return response.json();
        })
      );
    }
  });
};
