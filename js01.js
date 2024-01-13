(function() {
    let questions = [{
      question: "when was yearup founded?",
      choices: [1990, 2003, 2001, 2000, 1992],
      correctAnswer: 3
    }, {
      question: "what is 10 + 10?",
      choices: [30, 12, 19, 10, 20],
      correctAnswer: 4
    }, {
      question: "how many points do you start off in the beginning of L & D?",
      choices: [120, 200, 100, 220, 150],
      correctAnswer: 1
    }, {
      question: "what is 1 * 7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3
    }, {
      question: "what is 8 * 8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }];
    
    let questionCounter = 0; // tracks question number
    let selections = []; // an array containing user choices
    let quiz = $('#quiz'); // quiz div object
    
    // displays initial question
    displayNext();
    
    // click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // if no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      let qElement = $('<div>', {
        id: 'question'
      });
      
      let header = $('<h2>question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      let question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      let radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // creates a list of the answer choices as radio inputs
    function createRadios(index) {
      let radioList = $('<ul>');
      let item;
      let input = '';
      for (let i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          let nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          let scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // computes score and returns a paragraph element to be displayed
    function displayScore() {
      let score = $('<p>',{id: 'question'});
      
      let numCorrect = 0;
      for (let i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('you got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!');
      return score;
    }
  })();