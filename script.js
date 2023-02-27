'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const sanjana = fetch('https://restcountries.com/v3.1/name/india');
// console.log(sanjana);

// //Promise
// //An object that is used as a placeholder for the future result of an asynchronous operation.
// //A container for a future value(asynchrously delivered value)(example: Response from AJAX call).

const renderCountry = function (data, className = '') {
  console.log(data, 'SANJANANANANAN');
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
        <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// //Advantage of using promises:
// //1.we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchrous results.
// //2.instead of nesting callbacks, we can chain promises for a sequence of asynchrous operations:escaping callback hell.

// // const request = function (country) {
// //   fetch(`https://restcountries.com/v3.1/name/${country}`)
// //     .then(function (result) {
// //       console.log(result);
// //       return result.json();
// //     })
// //     .then(data => {
// //       console.log(data);
// //       renderCountry(data[0]);
// //     });
// // };
// // request('portugal');

// //Coding challenge #1 Using the gps coordinates, determine the country.
// //1.function 'whereAmI' which takes as inputs a latitude value and longitude value.(these are GPS coordinates)
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=117869244988157e15797815x95211`)
//     .then(res =>  {
//         console.log(res, "THAPA");
//         if(!res.ok)
//         throw new Error(`Problem with geocoding ${res.status}`)       //handling error message annualy as fetch func. didnt reject this error msg
//         return res.json()})                                            //so we are rejecting this error here(unhandled promise rejection) and will catch it in down catch handler
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`)

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//       })
//       .then (res => {
//         console.log(res, "Ujjwal")
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);
//         //console.log(res, "Ujjwal")
//         return res.json();
//       })
//       .then(data => {
//         return renderCountry(data[0])}
//         )
//       .catch(err => console.error(`${err.message}`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(40.731, -73.997);
// whereAmI(-33.933, 18.474);

//TheEvent loop
// console.log("start test");
// setTimeout(() => {
//   console.log("o sec callback")
// }, 0);
// Promise.resolve("Resolved immediately 1").then(res => console.log(res));
// Promise.resolve("Resolved Promise 2").then(res => {
//   for (let i =0; i <100000000; i++)
//   {}
//    console.log (res)
// })

//console.log("End test");
//Callbacks of the promise dont go to the callback queue instead it go to the microtasks queue(promise has their own microtasks).
//and this microtaks has more priority over the callback queue.

//Promise constructor takes exactly one argument(so called executor function)so when promise exeicutes, the executor
//func also runs with 2 arguments func(resolve and reject)
//in order to set the promise as fulfilled, we use the resolve func.(mark this promise as a fulfilled func. by
//calling like this resolve()) or we can say a resolved promise. and into the resolved func. we pass the fulfilled value
//of the promise and that it can later be consumed with the then method.

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5){
//     resolve("You won the Lottery");
//   }
//   else {
//     reject("You lost the money");
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You won the Lottery');
    } else {
      reject('You lost the money');
    }
  }, 5000);
  console.log('Sanjana');
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying => means to convert callback based asynchronous behavior to promise based
//this will now create a promise that will wait for 2 seconds, and after these 2 seconds, it will resolve. ans so we can handle that
//it laso not really necessary to wait for some value

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(5)
  .then(() => {
    console.log('1 sec passed');
    return wait(3);
  })
  .then(() => {
    console.log('2 sec passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 sec passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 sec passed');
  });

//creating fulfilled and rejecting promise immediately
Promise.resolve('Hello hello').then(res => console.log(res));
Promise.reject(new Error('Aww promise got rejected')).catch(err =>
  console.error(err)
);

//Challenge #2
// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which
//creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path.
//When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise.
//The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event),
// reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed
//to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

const wait1 = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imagePath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imagePath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;
createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait1(3);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 uploaded');
    return wait1(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));

//Consuming promises with ASYNC and AWAIT
//when we write async to in front of the functions, that functions become asynchronous function. so a function that
//will basically keep running in the background while performing the code that inside of it, then when this function
//is done, it automatically returns a promise. inside an async function we can have one or more await statements.
//basically await will stop the code execution at this point of the func until the promise is fulfilled.

//await keyword to basically await for the result of this promise

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//const whereAMI = async function(country){
const whereAMI = async function (country) {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse GeoCoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=117869244988157e15797815x95211`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo, 'GGGGGGGGGGGEEEEEEEEEOOOOOOOOOOOOOOOOOOO');

    //country data
    //fetch().then(res => console.log(res))
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!resGeo.ok) throw new error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    //Returning values from Async functions
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`${err.message}`);

    //rethrowing error to propogate it to bottom catch handler
    //reject promise returned from async function
    throw err;
  }
};

whereAMI('Portugal');
//whereAMI();
console.log('First Sanjana');
//Returning values from Async functions
console.log('1.will get location ');

// const city  = whereAMI();  just to check is this normal function or async function
// console.log(city);

// whereAMI().then(city => console.log(`2:${city}`))
// .catch(err => console.error(`2.${err.message}`))
// .finally(() => console.log("3.Finished getting location"));

//doing in async method through IIFE(as we dont want to create a new function)
(async function () {
  try {
    const city = await whereAMI();
    console.log(`2:${city}`);
  } catch (err) {
    console.error(`2.${err.message}`);
  }
  console.log('3.Finished getting location');
})();

//Error handling with try catch....
//so we can basically wrap all our code in a try block. And so JS will then basically try to execute this code.

// try {
//   let x = 1;
//   const y = 2;
//   y = 3;
// }
//with this block -> got error => missing catch or finally after try

let x = 1;
const y = 2;
y = 3;
//without the block -> got error => Assignment to constant variable
//this catch block have access to whatever  occurred in the try block
try {
  let x = 1;
  const y = 2;
  y = 3;
} catch (err) {
  alert(err.message);
}

//Returning values from Async functions

//Running Promises in parallel

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
const get3Countries = async function (c1,c2,c3){
  try{
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital])

    //we can actually rum these fetch() parellely instead of running one by one to save the valuable loading time.(can check in the console netwok)
    //this all function takes in an array of promises and it will return a new promise, which will then run all the promises in the array at the same time.

    const data = await Promise.all([getJSON(`https://restcountries.com/v3.1/name/${c1}`),
                 getJSON(`https://restcountries.com/v3.1/name/${c1}`),
                 getJSON(`https://restcountries.com/v3.1/name/${c1}`)]);

    console.log(data.map(d => d[0].capital));

  } catch(err){
    console.error(err)
  }
};
get3Countries('portugal', 'canada', 'tanzania')
//build process in nodejs
//memory-usage profilling in nodejs process
//google billing library (into the APP).
