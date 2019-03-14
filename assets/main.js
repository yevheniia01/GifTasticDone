
//BUTTONS ANIMATION=======================================================================================
var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient(){
      if ( $===undefined ) return;
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
        
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
     background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,10);

//SLIDING BACKGROUND=================================================================================================
    var count = 1;
    var images = ['../GifTasticDone/assets/images/whitecat.jpg',
                  '../GifTasticDone/assets/images/beardeddragon1.jpg',
                  '../GifTasticDone/assets/images/catsorange.jpg', 
                  '../GifTasticDone/assets/images/rainbowkitty.jpg',
                  '../GifTasticDone/assets/images/iguana1.jpg',
                  '../GifTasticDone/assets/images/dog1.jpg',
                  '../GifTasticDone/assets/images/chameleon1.jpeg',
                  '../GifTasticDone/assets/images/iguana2.jpg',
                  '../GifTasticDone/assets/images/dog2.jpg',
                  '../GifTasticDone/assets/images/beardeddragon2.jpg',
                  '../GifTasticDone/assets/images/chameleon2.jpg',
                  '../GifTasticDone/assets/images/beardeddragon3.jpg'];
    var image = $(".fader");
  
    image.css("background-image","url("+images[0]+")");
  
    setInterval(function(){
      image.fadeOut(700, function(){
        image.css("background-image","url("+images[count++]+")");
        image.fadeIn(700);
      });
      if(count == images.length)
      {
        count = 0;
      }
    },4000);
//ACTUALL FUNCTIONALITY CODE STARTS HERE========================================================================

//Array with buttons names
var topics = ['Axolotl', 'Bearded Dragon', 'Snake', 'Cats', 'Dogs', 
                  'Hamsters', 'Flamingos', 'Tigers', 'Iguanas', 'Bears', 'Rats'];
  
//Creating buttons
var createBtn = function(){
  $('#buttons')
    for(var i = 0; i<topics.length; i++){
        var newBtn = $('<a href="#" class = "btn btn-sm animated-button victoria-one col-md-4 col-sm-3 col-xs-2"></a>');
 
         newBtn.attr('data-name',topics[i]);
         newBtn.attr('value', topics[i])
         newBtn.text(topics[i]);
  $('#buttons').append(newBtn);

         console.log(i)
         console.log(newBtn)
    }
}
//Function that clear buttons div to prevent repeating buttons
$('#InputBtn').on('click', function(event){
    $('#buttons').empty()

    event.preventDefault();
     
    var addedBtn = $("#InputText").val()
   //Adding new button(user button)
     topics.push(addedBtn);
     createBtn()
})
createBtn()

//Display gif
function displayGif(){
var gifSearch = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=COGiXXultfkA9osXS98VBU5pt56bImum&limit=10"

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response){
    console.log(response)
    var gifResponse = response.data
  
    for (var i=0; i < gifResponse.length; i++){
        var gifDisplay = $('<div class ="gifDisplayText">')
        var onClickGif = $('<img class = "col col-md-12 col-sm-4 col-xs-1">')
            onClickGif.attr('src', gifResponse[i].images.original_still.url)
            onClickGif.attr('title', "Rating: "+ gifResponse[i].rating)
            onClickGif.attr('data-still', gifResponse[i].images.original_still.url);
            onClickGif.attr('data-state', 'still');
            onClickGif.addClass('gif')
            onClickGif.attr('data-animate', gifResponse[i].images.original.url);
            gifDisplay.append(onClickGif)
   $('#gifDisplayImg').append(gifDisplay)
};
    
   $('#removeGifsText').on('click', function(){
      $(".gifDisplayText").fadeOut()
    })
  })
}
//Gif play and stop
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
            console.log(this)
});
$(document).on('click', '.btn', displayGif)





  




