var key = "AIzaSyCnWHokoIxxSIxPvnBaihBivbXPh0hxbq8";
var fullUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${key}`;
var request = new XMLHttpRequest();
var url = "https://www.googleapis.com/youtube/v3";
var input = document.querySelector("input");
var promenljiva_iz_inputa = input.value;
var main = document.querySelector("main");
var iframe = document.querySelector('iframe')

var btn = document.querySelector("button");
// var kartica = document.createElement("div");
// var img = document.createElement("img");
// var title = document.createElement("h4");
// var opis = document.createElement("p");


function search() {
  request.open("GET", fullUrl + `&q=${input.value}`);

  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      create(JSON.parse(request.responseText));
      console.log(JSON.parse(request.responseText));
    }
  };
}

function create(obj){
  main.innerHTML="";
  for(var i=0;i<obj.items.length;i++){
    createSingleVideo(obj.items[i])
  }
}

function createSingleVideo(video){
  var kartica = document.createElement("div");
  var img = document.createElement("img");
  var title = document.createElement("h4");
  var opis = document.createElement("p");

  kartica.className="kartica";
  title.innerText = video.snippet.title;
  opis.innerText= video.snippet.description;
  img.setAttribute("src", video.snippet.thumbnails.default.url);
  img.className="slika";
  kartica.append( img, title, opis);
  kartica.className="kartica";
  main.append(kartica);

  kartica.addEventListener("click", function(){
    console.log(video)
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video.id.videoId);
    iframe.className = 'showIframe';
  })
} 
btn.addEventListener("click", search);
window.addEventListener('load', search)




//