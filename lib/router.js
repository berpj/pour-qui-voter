// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('questions');
  Meteor.subscribe('parties');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: '404',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
  this.render(Session.get('splashLoaded') ? 'question' : 'loading');
});

Router.route('/result/:acronym', function () {
  var party = Parties.findOne({acronym: this.params.acronym});
  this.render('result', {data: party});
});
