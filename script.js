const CachedApiCall = (time) => {
  let cache = {};

  return async (url, config = {}) => {
    let key = `${url}-${JSON.stringify(config)}`;
    let entry = cache[key];

    if (!entry || Date.now() > entry.expire) {
      console.log("Making a fresh API call");

      try {
        let res = await fetch(url, config);
        let data = await res.json();

        cache[key] = { value: data, expire: Date.now() + time };
      } catch (error) {
        console.error("Error while fetching the Data", error);
      }
    } else {
      console.log("Getting data from Cache");
    }
    return cache[key].value;
  };
};

let url = "https://jsonplaceholder.typicode.com/users";

const getData = CachedApiCall(2000);

getData(url, {}).then((res) => console.log(res));

setTimeout(() => {
  getData(url, {}).then((res) => console.log(res));
}, 1200);

setTimeout(() => {
  getData(url, {}).then((res) => console.log(res));
}, 2500);
