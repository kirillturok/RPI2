const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  date = document.querySelector('.date');
  const body = document.querySelector('body');
  const btn = document.querySelector('.btnnext');
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const btnquote = document.querySelector('.btn'); 
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const windspeed = document.querySelector('.windspeed');
  const humidity = document.querySelector('.humidity');
  const city = document.querySelector('.city');
  var weekday=["Sunday", "Monday","Tuesday","Wednesday","Thurdsday","Friday","Saturday"];
  var months=["January","February","March","April","June","July","August","September","October","November","December"];
  var evening=new Array(20);
  var morning=new Array(20);
  var afternoon=new Array(20);
  var night=new Array(20);
  var allbackgroundsoverallday=new Array(24);
  evening=getImages(20,'evening');
  shuffle(evening);
  morning=getImages(20,'morning');
  shuffle(morning);
  afternoon=getImages(20,'day');
  shuffle(afternoon);
  night=getImages(20,'night');
  shuffle(night);
  var i =0;
  var m=0;
  var c=0;
  let today = new Date(),
startedhour = today.getHours();

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    dayofweek = getDayOfWeek(today);
    dayofmonth = today.getDate();
    month = getMonth(today);

 
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} `;
  date.textContent = `${dayofweek}, ${dayofmonth} ${month}`;
  setTimeout(showTime, 1000);
}

function getDayOfWeek(today){
  return (weekday[today.getDay()])
}

function getMonth(today){
  return (months[today.getMonth()])
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
  var bool=false;
  let today = new Date(),
  hour = today.getHours();
  loadArrayByImages(hour);
    min=today.getMinutes();
    sec=today.getSeconds();
    if(bool==false){
    var millsec=3600000-(min*60000+sec*1000);
    bool==true;
    }else{
      millsec=3600000;
    }
    if(hour >=6 && hour<12){
     
    document.body.style.backgroundImage ="url(" +  allbackgroundsoverallday[i] + ")";
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
    i++;
    }
else if (hour >= 12 && hour <18) {
    
    document.body.style.backgroundImage ="url(" +  allbackgroundsoverallday[i] + ")";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
    i++;
  } else if (hour >= 18 && hour <24) {
    
    if(hour==23&&min==59&&sec==59){
      shuffle(evening);
      shuffle(morning);
      shuffle(afternoon);
      shuffle(night);
    }
    document.body.style.backgroundImage ="url(" + allbackgroundsoverallday[i] + ")";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';  
    i++;  
  } else {
    
    document.body.style.backgroundImage ="url(" +  allbackgroundsoverallday[i] + ")";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
    i++;
  }
  setTimeout(setBgGreet, millsec);
}
function viewBgImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
var bool = false;
function getImage() {
  let today = new Date(),
  hour = today.getHours();
  c=c%(24-hour);
  if(bool==false&&c==0){
    c++;
    bool=true;
  }
  viewBgImage(allbackgroundsoverallday[c]);
  c++;
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 
function loadArrayByImages(hour,min,sec){
  if(hour==23&&min==59&&sec==59){
    allbackgroundsoverallday=[];
  }
  var ind=0;
  var z=0;
  var some=hour;
  var x=0;
  var c=0;
  var v =0;
  var b=0;
  while(z!=24-hour){
      if(some >=6 && some<12){
        allbackgroundsoverallday[ind]=morning[x];
        ind++;
        x++;
        some++;
      }else if (some >= 12 && some <18) {
        allbackgroundsoverallday[ind]=afternoon[c]; 
        ind++;
        c++;
        some++;
    } else if (some >= 18 && some <24) {
      allbackgroundsoverallday[ind]=evening[v];
      ind++;
      v++;
      some++;
  } else {
  allbackgroundsoverallday[ind]=night[b];
  ind++;
  b++;
  some++;
  }
  z++;
  }
}
function setCity(event) {
  var sourceCity=city.textContent;
  if (event.code === 'Enter'&&city.textContent.trim() != '') {
    getWeather();
    city.blur();
    city.textContent =city.textContent.trim();
    localStorage.setItem('city', event.target.innerText.trim());
  }
  if (event.code === 'Enter'&&city.textContent.trim() == '') {
    city.textContent = localStorage.getItem('city');
  }
}
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}
async function getWeather() {
  weatherIcon.className = 'weather-icon owf';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=6306659d8dcf7e107ebafdc059d9bc6f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.cod==404){  
    alert(data.message);
  }
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent=data.weather[0].description;
  humidity.textContent=data.main.humidity+'%';
  windspeed.textContent=data.wind.speed+' m/s';
}
function getImages(n,times){
    for( var image, array = [], i = 1; i <= n; i++ ){
      image = new Image;
      image.src = "../img/"+times+"/" + i + ".jpg";
      array.push(image.src);
    };
    return array;
  };
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  var sourceName=name.textContent;  
  if(e.which==1) {
    name.textContent='';
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent.trim() === ''){
        getName();
      }
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else if(name.textContent.trim() != '') {
    localStorage.setItem('name', sourceName);
  }
  if(name.textContent.trim() === '' && e.type === 'blur'){
    getName();
  }
}
function setFocus(e) {
  var sourceFocus=focus.textContent;
  if(e.which==1) {
    focus.textContent='';
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent.trim() === ''){
        getFocus();
      }
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else if(focus.textContent.trim() != '') {
    localStorage.setItem('focus', sourceFocus);
  }
  if(focus.textContent.trim() === '' && e.type === 'blur'){
    getFocus();
  }
}
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
document.addEventListener('DOMContentLoaded', getQuote);
btnquote.addEventListener('click', getQuote);

showTime();
setBgGreet();
getName();
getFocus();
getWeather();
getCity();
getQuote();