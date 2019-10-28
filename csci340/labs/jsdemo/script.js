$(document).ready(function(){

var state = 0;

function clicked(){
    state +=1
    
    state = state%3;

    var redlightObject = $("#redlight");
    var yellowlightObject = $("#yellowlight");
    var greenlightObject = $("#greenlight");

    var array = [redlightObject, yellowlightObject, greenlightObject];

    for (light of array){
        light.removeClass(["red","yellow","green"]);
        light.addClass("gray");
    }
    if (state==0){
        redlightObject.removeClass("gray")
        redlightObject.addClass("red")
    }
    if (state==1){
        console.log("???")
        yellowlightObject.removeClass("gray")
        yellowlightObject.addClass("yellow")
    }
    if (state==2){
        greenlightObject.removeClass("gray")
        greenlightObject.addClass("green")
    }
}
$("div").click(clicked);
});