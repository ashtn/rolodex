import $ from 'jquery';
import _ from 'underscore';
// links contact model to application js file
import Contact from './app/models/contact.js';
import Rolodex from './app/collections/rolodex.js';

// new instance of contact model with static data, this is just for testing purposes
var myContact = new Contact({
  name: 'Ashton',
  email: 'ashton@ashton.com',
  phoneNumber: '909-000-0000'
});

// NOTE notice the use of closures here
var render = function(contact){
  // selected the html that lives with the tmpl-contact-card and assigning to the var templateText
  var templateText = $('#tmpl-contact-card').html();

  // create underscore template using the previously generated templateText (think of it as creating a new instance of underscore)
  var templateObject = _.template(templateText);

// compile object data into underscore template oject
  var compiledHTML = templateObject(contact.toJSON());

  //append
  $('#contact-cards').append(compiledHTML);
};

// new instance of Rolodex (collection)
var myRolodex = new Rolodex(myContact);



$(document).ready(function() {
  // console.log('heyyyy');
  // render(myContact);
});
