Meteor.startup(function () {
  var parties = {};
  parties = JSON.parse(Assets.getText("parties.json"));

  parties.forEach(function(party) {
    if (Parties.find({name: party.name}).count() == 0) {
      Parties.insert(party);
    }
  });
});

Meteor.publish('parties', function() {
  return Parties.find();
});
