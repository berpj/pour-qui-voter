Session.set('answers', []);
Session.set('currentQuestion', 0);

Template.registerHelper('getBody', function () {
  return Session.get('splashLoaded') ? 'home' : 'loading';
});

Template.question.helpers({
  randomQuestion: function() {
    return Questions.find({}, {skip: Session.get('currentQuestion'), limit: 1});
  },
  answeredQuestions: function() {
    return Session.get('answers').length;
  },
  totalQuestions: function() {
    return 5;
  }
})

function findResult() {
  var results = [];
  var final_result = null;

  Parties.find().forEach(function(party){
    results[party.acronym] = 0;
  });

  Session.get('answers').forEach(function(answer){
    question = Questions.find({_id: answer.question}).fetch()[0];

    Parties.find().forEach(function(party){
      console.log(party.name);
      console.log(question[party.acronym]);
      console.log(answer.answer)

      results[party.acronym] += question[party.acronym] * answer.answer;
    });
  });

  console.log(results);

  max = -9000;
  Parties.find().forEach(function(party){
    if (max < results[party.acronym]) {
      max = results[party.acronym];
      final_result = party.acronym;
    }
  });

  Session.set('answers', []);

  return '/result/' + final_result;
}

Template.question.events({
  "click .choice": function (event) {

    answers = Session.get('answers');
    if (event.target.classList.contains('yes')) {
      answers.push({question: event.target.id, answer: 1});
    }
    else {
      answers.push({question: event.target.id, answer: -1});
    }
    Session.set('answers', answers);

    console.log(Session.get('answers'));

    if (Session.get('answers').length == 5) {
      Session.set('currentQuestion', 0);
      Router.go(findResult());
    }
    else {
      Session.set('currentQuestion', Session.get('currentQuestion') + 1);
    }
  }
});
