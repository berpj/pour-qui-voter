Template.loading.rendered = function () {
  Meteor.setTimeout(function () {
    Session.set('splashLoaded', true);
  }, 2500);
};
