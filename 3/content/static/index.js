//initializing the variables
const bg="url('https://www.teahub.io/photos/full/220-2205714_get-the-latest-movies-data-src-kodi-tv.jpg')";
var n=0;
var div="div";
let movieId=21;
var buttonId=0;
var idinput="idi";
var allmovies=[];

// errors management
function onfail(error){ 
   console.log('error : ', error);
}

// get the movie according to the movie id
function movie(){
  var data=fetch('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=b1cd873b996025c059ed17379953c1b8&language=en-US').then(onsucess,onfail).then(function(data) {
  n=n+1;  
  div=div+n.toString();
  buttonId=buttonId+1;
  idinput=idinput+"1";
  //create the component to display the billboard
  addcomponent(div,bg,data.release_date,data.original_title,data.poster_path);
  n=n+1;
  // get the user input to deal with his answer
  get_user_input("Who has played in or directed this movie ?",div+n.toString());
  });
}

function onsucess(response){ 
  x=0;
 return response.json();
}

// create the input blank and the check button to submit
function get_user_input(question,div_id){
  var div = document.createElement("div");
  div.id=div_id;
  div.style.background="#001926";
  div.style.padding="20px 12px";
  div.className="container border mb-3";
  document.body.appendChild(div);
  
  var input = document.createElement("input");
  input.type="text";
  input.id=idinput;
  input.placeholder=question;
  input.className="form-control";
  
  input.onclick = function(){
  document.getElementById(idinput).value="";
  document.getElementById(idinput).style.color="black";
  };
  document.getElementById(div_id).appendChild(input);
  
  var but = document.createElement("button");
  var button_content = document.createTextNode("check");
  but.className="btn btn-primary ";
  but.id=buttonId;

  // 2 case conditions
  but.onclick = function(){
    if(question=="Who has played in or directed this movie ?"){
      checking(1);
    }
    else{
       checking(2);    
    }
  
  };
  but.style.marginTop="6px";
  but.appendChild(button_content);
  document.getElementById(div_id).appendChild(but);
}

// to verify the answers of the user for both cases
function checking(a){
  // case 1
  if(a==1){
    var cas=0;
    var input=document.getElementById(idinput).value;
    var data2=fetch('https://api.tmdb.org/3/search/person?api_key=b1cd873b996025c059ed17379953c1b8&query='+input).then(onsucess,onfail).then(function(data2) {
    var data3=fetch('https://api.themoviedb.org/3/person/'+data2.results[0].id+'/movie_credits?api_key=b1cd873b996025c059ed17379953c1b8').then(onsucess,onfail).then(function(data3) {
    for (var i in data3.cast){
      if(data3.cast[i].id ==movieId){
        cas=1;
        break;
      }
    }
    if(cas==1){ 
      n=n+1;
      idinput=idinput+"1";
      allmovies.push(data3.cast[i].title);
      console.log(allmovies);
      addcomponent(div+n.toString(),bg,"department of "+data2.results[0].known_for_department,data2.results[0].name,data2.results[0].profile_path);
      document.getElementById( buttonId ).disabled=true;   
      buttonId=buttonId+1;
      n=n+1;
      get_user_input("find me a movie in which this actor or director has been in ?",div+n.toString());
    }
    else{
      document.getElementById(idinput).value="incorrect answer sorry :( please try again !";
      document.getElementById(idinput).style.color="red";
    }
            
   });
           
   });
  }
  // case 2
  else{
    var p1=0;
    var input=document.getElementById(idinput).value;
    var  data3=fetch('https://api.themoviedb.org/3/search/movie?api_key=b1cd873b996025c059ed17379953c1b8&query='+input).then(onsucess,onfail).then(function(data3) {
    for (var i in data3.results){
      if(allmovies.includes(data3.results[i].original_title)){
        document.getElementById(idinput).value="you can't choose the same movie twice !";
        document.getElementById(idinput).style.color="red"; break;
      }
    if(i>=data3.results.length-1){
            
      var exidinput=idinput.substring(0, idinput.length-1);
      console.log(exidinput);
      var exinput=input=document.getElementById(exidinput).value;
      console.log(exinput);
      var data5=fetch('https://api.tmdb.org/3/search/person?api_key=b1cd873b996025c059ed17379953c1b8&query='+exinput).then(onsucess,onfail).then(function(data5) {
      var data6=fetch('https://api.themoviedb.org/3/person/'+data5.results[0].id+'/movie_credits?api_key=b1cd873b996025c059ed17379953c1b8').then(onsucess,onfail).then(function(data6) {
        
      for (var i in data6.cast){
        if(data6.cast[i].id==data3.results[0].id){
          p1=1;
          break;
        }
      }
      if(p1==1){
              
        movieId=data3.results[0].id;
        console.log(movieId);
        document.getElementById( buttonId ).disabled=true;  
        allmovies.push(data3.results[0].original_title);
        movie();
      }
        
      else{
        document.getElementById(idinput).value="he wasn't in this movie ! ";
        document.getElementById(idinput).style.color="red"; 
      }
    });
  });             
}}          
});
}}

// A simple method to create a html element
function addcomponent (actors,bg,rl,origin_titl,image) {
  var div = document.createElement("div");
  div.id=actors;
  div.style.backgroundImage=bg;
  div.style.backgroundSize="cover";
  div.style.color="pink";
  div.style.padding="0px 11px 5px"
  div.className="container border col-sm";
  
  
  document.body.appendChild(div);
  /*create the title */
  var h1 = document.createElement("h1");
  var h1_content = document.createTextNode(origin_titl);
  h1.appendChild(h1_content);
  document.getElementById(actors).appendChild(h1)
  /*create the release date*/ 
  var h6 = document.createElement("h6");
  var h6_content = document.createTextNode(rl);
  h6.appendChild(h6_content);
  document.getElementById(actors).appendChild(h6)
  /*create the image*/
  var img = document.createElement("img"); img.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2"+image;
  img.className="img-fluid img-thumbnail";
  img.style.height="250px";
  document.getElementById(actors).appendChild(img)
}    

// main 
movie(movieId);
