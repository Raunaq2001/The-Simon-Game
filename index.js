var counter=0;
var level=0;
var gamePattern=[];
var userCLickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
$(document).on("keypress",function(){
  if(counter===0)
  {
    nextSequence();
    counter++;
  }
});
// User clicks on a button that button is registered and a corresponding sound is played
$(".btn").on("click",function(event){
  var userChosenColour=this.id; //event.target.id; (instead of "this.id" this could also be written)
  userCLickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userCLickedPattern.length-1);
});
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userCLickedPattern[currentLevel])
  {
    console.log("Success");
    if (userCLickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    console.log("Wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    $("h1").text("Game Over....Press any key to restart");
    startOver();
  }
}
function nextSequence()
{
  userCLickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  // A random color button is flashed and the corresponding sound track is played
  var randomNumber=Math.round(Math.random()*3);
  var randomChosenColour=buttonColours[randomNumber];
  var newRandomChosenColour="#"+randomChosenColour;
  gamePattern.push(randomChosenColour);
  $(newRandomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// Plays the sound track that corresponding to the button pressed by the user
function playSound(name)
{
  var track="sounds/"+name+".mp3";
  var audio=new Audio(track);
  audio.play();
}
// To add the press animation
function animatePress(currentColour)
{
  // only the colour name is received and to access the corresponding class name we concatinate it using the
  // "."+ so that jQuery could point to the required class
  $("."+currentColour).addClass("pressed")
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}
function startOver()
{
  level=0;
  gamePattern=[];
  counter=0;
}
