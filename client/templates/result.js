Template.result.events({
  "click .reset": function (event) {
    event.preventDefault();

    Session.set('currentQuestion', 0);
    Session.set('answers', []);

    Router.go('/');
  }
});
