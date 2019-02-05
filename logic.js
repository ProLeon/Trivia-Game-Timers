console.log("Ya boy");
$(document).ready(function(){

    //variables
    index = 0;
    randArray = [];
    timeOut = 0;
    randNumArray = [];
    gameOver = false;
    score = 0;
    counter = 0;
    canClick = true;
    gameStarted = false;
    timeLeft = 30;
    scoreWrong = 0;
    scoreRight = 0;
    //empty arrays for future use
    bandsToGuess = [];
    incorrectGuesses = [];
    guessList = [];
    bandName = "";
    //Holds the bands for the 90s
    ninetiesBands = [
        "Nirvana",
        "Pearl Jam",
        "The Smashing Pumpkins",
        "Alice in Chains",
        "Foo Fighters",
        "Goo Goo Dolls",
        "Oasis",
        "Counting Crows",
        "Third Eye Blind",
        "Weezer",
        "The Wallflowers",
        "Everclear",
        "Aerosmith",
        "Sugar Ray",
        "blink-182"
    ]
    eightiesBands = [
        "The Police",
        "Van Halen",
        "Prince",
        "Iron Maiden",
        "The Cure",
        "Tom Waits",
        "Joy Division",
        "Depeche Mode",
        "The Stone Roses",
        "Mercyful Fate",
        "Metallica",
        "The Replacements",
    ]
    twoThousandsBands = [
        "Linkin Park",
        "Green Day",
        "Red Hot Chili Peppers",
        "Eminem",
        "Fall Out Boy",
        "Maroon 5",
        "Fall Out Boy",
        "Paramore",
        "Bon Jovi",
        "OneRepublic",
        "Nickelback",
        "The Black Eyed Peas",
        "Justin Timberlake",
        "Matchbox Twenty",
    ]
    //function to push your selected bands into the empty game array
    selectedBand = function(bands){
        for(i = 0;i < bands.length; i++){
            bandsToGuess.push(bands[i])
            incorrectGuesses.push(bands[i])
        }
    }
    //==============================================================
    //function to ensure you don't get two of the same bands
    pickNextBand = function(bands){
        randNum = Math.floor(Math.random() * bands.length);
        $("#imgBox").empty();
        band = bandsToGuess[randNum]; 
        bandsToGuess.splice(randNum,1);
        queryUrl = "https://rest.bandsintown.com/artists/" + band + "?app_id=key"
        //grab band info
            $.ajax({
                url: queryUrl,
                method: "GET",
            }).then(function(response){
                $("#imgBox").append("<img style='width:100%; height:100%; border-radius: 25px' src='" + response.thumb_url + "'/>");
                bandName = response.name;
                setGuesses();

            });

    };
    
    //========================================================
    // selectedBand(ninetiesBands);
    // console.log(bandsToGuess);
    grabAjaxInfo = function(){
        selectedBand = {
            image: response.thumb_url,
            name: response.name
        };
    }
    //selecting your decade - click handlers
    $("#imgBox").on("click",function(){
        if(gameStarted !== true){
            gameStarted = true;
            timeLeft = 30;
            selectedBand(ninetiesBands);
            $("h2").html(timeLeft);
            timerCountDown();
            $("#rightBox").empty();
            $("#imgBox").empty();
            $("#leftBox").empty();
            $("h1").html("Guess the Band");
            $(".mainContent").append("<div id='guessBox'><p id='guess1' value=1></p><p id='guess2' value=2></p><p id='guess3' value=3></p><p id='guess4' value=4></p></div>");
            pickNextBand(bandsToGuess);
            
        }
    })
    $("#leftBox").on("click",function(){
        if(gameStarted !== true){
            gameStarted = true;
            timeLeft = 30;
            selectedBand(eightiesBands);
            $("h2").html(timeLeft);
            timerCountDown();
            $("#rightBox").empty();
            $("#imgBox").empty();
            $("#leftBox").empty();
            $("h1").html("Guess the Band");
            $(".mainContent").append("<div id='guessBox'><p id='guess1' value=1></p><p id='guess2' value=2></p><p id='guess3' value=3></p><p id='guess4' value=4></p></div>");
            pickNextBand(bandsToGuess);
            
        }
    })
    $("#rightBox").on("click",function(){
        if(gameStarted !== true){
            gameStarted = true;
            timeLeft = 30;
            selectedBand(twoThousandsBands);
            $("h2").html(timeLeft);
            timerCountDown();
            $("#rightBox").empty();
            $("#imgBox").empty();
            $("#leftBox").empty();
            $("h1").html("Guess the Band");
            $(".mainContent").append("<div id='guessBox'><p id='guess1' value=1></p><p id='guess2' value=2></p><p id='guess3' value=3></p><p id='guess4' value=4></p></div>");
            pickNextBand(bandsToGuess);
            
        }
    })
    $(document).on("click",'#guess1',function(){       
        if(correctNum == $("#guess1").attr("value")  && canClick == true){
            youWin();
        }else if (canClick == true){
            youLose();
        }
    });
    $(document).on("click",'#guess2',function(){
        if(correctNum == $("#guess2").attr("value")  && canClick == true){
            youWin();
        }else if (canClick == true){
            youLose();
        }
    });
    $(document).on("click",'#guess3',function(){
        if(correctNum == $("#guess3").attr("value")  && canClick == true){
            youWin();
        }else if (canClick == true){
            youLose();
        }
    });
    $(document).on("click",'#guess4',function(){
        if(gameOver == false){
            if(correctNum == $("#guess4").attr("value")  && canClick == true){
                youWin();
            }else if (canClick == true){
                youLose();
            }
        }else{
            gameOver = false;
            gameStarted = false;
            $("#guessBox").remove();
            $("h2").empty();
            $("#leftBox").append("<div id='box1'><img style='width:100%; height:100%; border-radius: 25px' src='assets/images/80s.jpg'/></div>");
            $("#imgBox").html("<img style='width:100%; height:100%; border-radius: 25px' src='assets/images/90s.jpg'/>");
            $("#rightBox").append("<div id='box2'><img style='width:100%; height:100%; border-radius: 25px' src='assets/images/2000s.jpg'/></div>");
            $("h1").html("Pick Your Decade");
        };
    });
    
    isGameOver = function(){
        for(i = 0; i < bandsToGuess.length; i++){
            counter += 1;
        }
        if(counter < 2){
            console.log("Nope");
            timeLeft = 0;
            bandsToGuess = [];
            incorrectGuesses = [];
            guessList = [];
            gameStarted = false;
            gameOver = true;
            counter = 0;
            $("h2").empty();
            $("#guess1").html("Correct Guesses: " + scoreRight);
            $("#guess2").html("Incorrect Guesses: " + scoreWrong);
            $("#guess3").html("You timed out: " + timeOut + " time(s)");
            $("#guess4").html("Click here to restart");
        }else{
            counter = 0;
        }
    }
    youWin = function(){
        canClick = false;
        $("#guess1").html("You Guessed");
        $("#guess2").html("correctly!!!!!");
        $("#guess3").html("");
        $("#guess4").html("");
        setTimeout(function() {
            console.log(gameOver)
            timeLeft = 30;
            scoreRight += 1;
            guessList = [];
            isGameOver();
            if(gameOver == false){pickNextBand(bandsToGuess);}
            canClick = true; 
        }, 3000);        
    }
    youLose = function(){
        canClick = false;
        $("#guess1").html("You Guessed");
        $("#guess2").html(" Incorrectly.");
        $("#guess3").html("");
        $("#guess4").html("");
        setTimeout(function() {
            console.log(gameOver)
            timeLeft = 30;
            scoreWrong += 1;
            guessList = [];
            isGameOver();
            if(gameOver == false){pickNextBand(bandsToGuess);}
            canClick = true;
        }, 3000)
    }
    youTimedOut = function(){
        canClick = false;
        $("h2").html("0");
        $("#guess1").html("You timed out");
        $("#guess2").html("");
        $("#guess3").html("");
        $("#guess4").html("");
        setTimeout(function() {
            console.log(gameOver)
            timeLeft = 30;
            timerCountDown();
            timeOut += 1;
            guessList = [];
            isGameOver();
            if(gameOver == false){pickNextBand(bandsToGuess);}
            canClick = true;
        }, 3000)
    }
    //set the possible guesses for the band
    setGuesses = function(){
        randNumJ = Math.floor(Math.random() * 3);
        correctNum = randNumJ + 1;
        for(i = 0; i < 4; i++){
            if(randNumJ !== i){
                randNum = Math.floor(Math.random() * incorrectGuesses.length);
                guessList.push(incorrectGuesses[randNum]);
                console.log(randNum);
            }else{
                guessList.push(bandName);
            }
            
        };
        $("#guess1").html(guessList[0]);
        $("#guess2").html(guessList[1]);
        $("#guess3").html(guessList[2]);
        $("#guess4").html(guessList[3]);

    };
    //prevent duplicate guesses
    //set timer for the limited time to guess
    timerCountDown = function(){
        if(timeLeft < 0){
            timeLeft = 0;
            if(gameStarted == true) youTimedOut();
        }else if (gameStarted == true){
            setTimeout(function() {
                timeLeft = timeLeft - 1;
                if(timeLeft > 0)$("h2").html(timeLeft);
                
                timerCountDown();  
            }, 1000);
        }
    }
    $('.mainContent').on('mouseenter','#guess1',function() {
        $("#guess1").css("background-color", "white")
    });
    $('.mainContent').on('mouseleave','#guess1',function() {
        $("#guess1").css("background-color", "")
    });
    $('.mainContent').on('mouseenter','#guess2',function() {
        $("#guess2").css("background-color", "white")
    });
    $('.mainContent').on('mouseleave','#guess2',function() {
        $("#guess2").css("background-color", "")
    });
    $('.mainContent').on('mouseenter','#guess3',function() {
        $("#guess3").css("background-color", "white")
    });
    $('.mainContent').on('mouseleave','#guess3',function() {
        $("#guess3").css("background-color", "")
    });
    $('.mainContent').on('mouseenter','#guess4',function() {
        $("#guess4").css("background-color", "white")
    });
    $('.mainContent').on('mouseleave','#guess4',function() {
        $("#guess4").css("background-color", "")
    });

});
