Meteor.startup(function () {
  var questions = {};
  questions = JSON.parse(Assets.getText("questions.json"));

  questions.forEach(function(question) {
    if (Questions.find({question: question.question}).count() == 0) {
      Questions.insert(question);
    }
  });
});

Meteor.publish('questions', function() {
  var randomPositions = [];
  var randomIds = [];
  var newPosition = 0;
  var questions_length = Questions.find().fetch().length;

  for (i = 0; i < NB_OF_QUESTIONS; i++) {
    newPosition = Math.floor(Math.random() * questions_length);

    while (randomPositions.indexOf(newPosition) > -1) {
      newPosition = Math.floor(Math.random() * questions_length);
    }

    randomPositions.push(newPosition);
    randomIds.push(Questions.findOne({}, {skip: newPosition, limit: 1})._id);
  }

  return Questions.find({_id: {$in: randomIds}});
});
