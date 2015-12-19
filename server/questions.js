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
  var newId = '';

  for (i = 0; i < NB_OF_QUESTIONS; i++) {
    newPosition = Math.floor(Math.random() * Questions.find().fetch().length);
    while (randomPositions.indexOf(newPosition) > -1) {
      newPosition = Math.floor(Math.random() * Questions.find().fetch().length);
    }
    newId = Questions.find({}, {skip: newPosition, limit: 1}).fetch()[0]._id;
    randomPositions.push(newPosition);
    randomIds.push(newId);
  }

  return Questions.find({_id: {$in: randomIds}});
});
