import $ from 'jquery';
import _ from 'underscore';
// links contact model to application js file
import Contact from './app/models/contact.js';
import Rolodex from './app/collections/rolodex.js';

import ContactView from './app/views/contact_view.js';
import RolodexView from './app/views/rolodex_view.js';

// new instance of contact model with static data, this is just for testing purposes

$('#contact-details').hide();

var myContacts = [
  {
  name: 'Ashton',
  email: 'ashton@ashton.com',
  phone: '909-000-0000'
},
{
  name: 'Test',
  email: 'Test@test.com',
  phone: '000-000-0000'
}];

// NOTE notice the use of closures here
// var render = function(contact){
//   // selected the html that lives with the tmpl-contact-card and assigning to the var templateText
//   var templateText = $('#tmpl-contact-card').html();
//
//   // create underscore template using the previously generated templateText (think of it as creating a new instance of underscore)
//   var templateObject = _.template(templateText);
//
// // compile object data into underscore template oject
//   var compiledHTML = templateObject(contact.toJSON());
//
//   //append
//   $('#contact-cards').append(compiledHTML);
// };

// new instance of Rolodex (collection)
var myRolodex = new Rolodex(myContacts);



$(document).ready(function() {
  // console.log('heyyyy');
  // render(myContact);
// the object shows up in params
  var myRolodexView = new RolodexView({
    model: myRolodex,
    // this goes to rolodex_view.js
    // _.template() returns a functoin
    template: _.template($('#tmpl-contact-card').html()),
    // setting el to be main?
    // because there is one list, we can assign el to main
    el: 'body'
  });
  myRolodexView.render();
});
