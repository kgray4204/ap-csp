//The full Icon List from Table
var Photo = getColumn("Tools", "Image PNG");
//The full tool name List from table
var Name = getColumn("Tools", "Tool Name");
//The total number of correct answers the user has answered
var CountCorrect = 0;
//The Correct string value for image showing 
//value is update inputed later in code 
var CorrectAnswer = "";

//Button event built-in procedures
onEvent("button1", "click", function() {BuildMainForm(0);});
onEvent("A", "click", function(event) {ButtonClicked(event);});
onEvent("B", "click", function(event) {ButtonClicked(event);});
onEvent("C", "click", function(event) {ButtonClicked(event);});
onEvent("D", "click", function(event) {ButtonClicked(event);});

//Button Clicked Function
//Verifies the correct button was clicked
//Accepts the button event as a parameter
//Increments the correct count and sets the quiz to a new item 
//Ends the quiz if the user chooses the incorrect button
function ButtonClicked(e)
{
  //Sequencing
  //Parameter
  var buttonText = getText(e.srcElementId);
  var correctIndex = 0;
  
  console.clear();
  console.log("Clicked=" + buttonText);
  
  //Loop Statement
  for (var i = 0; i < Name.length; i++)
  {
    if (Name[i] == CorrectAnswer)
    {
      correctIndex = i;
      console.log("CorrectIndex=" + correctIndex);
      break;
    }
  }
  
  //If Statement
  if (buttonText == Name[correctIndex])
  {
    CountCorrect++;
    console.log("CountCorrect=" + CountCorrect);
    setText("label1", CountCorrect + " Answers Correct");
    BuildMainForm(correctIndex);
  }
  else
  {
    //Goto exit you lost
  }
  
}


//This function loads Screen3, and then populates the quiz question image and answers
function BuildMainForm(previousIndex)
{
    //Hides previous screen and sets up the main screen
    hideElement("button1");
    setScreen("screen3");
    
    //Sets the indexs for choosing the next set of answers
    var RightPos = randomNumber(0, 3);
    var index = previousIndex;
    
    //Loop until different to choose a different index than last image
    do
    {
      index = randomNumber(0, 19);
      console.log("NewIndex=" + index +", LastIndex=" + previousIndex);
    }
    while (index == previousIndex);
    
    //Build the answer list
    var answers = [];
    answers[RightPos] = Name[index];
    for (var i = 0; i < 4; i++) {
      if (i == RightPos) 
      {
        continue;
      } 
      else 
      {
        var answer = randomNumber(0, 19);
        while (true) {
          var alreadyHasAnswer = false;
          for (var j = 0; j < answers.length; j++) 
          {
            if (answers[j] == Name[answer]) 
            {
              alreadyHasAnswer = true;
            }
          }
          if (alreadyHasAnswer) 
          {
            answer = randomNumber(0, 19);
          } 
          else 
          {
            break;
          }
      }
      answers[i] = Name[answer];
    }
  }
  
  //Set image and answer buttons
  setImageURL("image1", Photo[index]);
  CorrectAnswer = Name[index];
  setText("A", answers[0]);
  setText("B", answers[1]);
  setText("C", answers[2]);
  setText("D", answers[3]);
}
