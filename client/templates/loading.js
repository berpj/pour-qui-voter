Template.loading.rendered = function () {
  Meteor.setTimeout(function () {
    Session.set('splashLoaded', true);
  }, 4000);
};
