// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('questions');
  Meteor.subscribe('parties');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: '404'
});

Router.route('/', function () {
  this.render('question');
});

Router.route('/result/:acronym', function () {
  var party = Parties.findOne({acronym: this.params.acronym});
  this.render('result', {data: party});
});
