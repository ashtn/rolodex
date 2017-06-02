import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Contact from '../models/contact.js';
import ContactView from '../views/contact_view.js';
// import ContactDetailsView from '../views/contact_details_view.js';

var RolodexView = Backbone.View.extend({
  initialize: function(params){
    this.contactTemplate = params.template;
    //backbone event listener
    this.listenTo(this.model, "update", this.render);
    this.modalTemplate = _.template($('#tmpl-contact-details').html());
  },
  render: function(){
    // clears something

    this.$('#contact-cards').empty();
    // console.log('this.contactTempalte: ', this.contactTemplate);
    // console.log('this.modalTemplate: ', this.modalTemplate);
    var that = this;

    this.model.each(function(contact){
      var contactView = new ContactView({
        model: contact,
        myTemplate: that.contactTemplate, // gives it to contact view
        // tagName: ''
      });
      //backbone event listener for new contactView
      that.listenTo(contactView, "selectedCard", that.displayModal);
      // rendered the view and append the new view to the 'todo-items'
      that.$('#contact-cards').append(contactView.render().$el);
    });
    //we `return this` so that we can `myView.render().el`
    return this;
  },
  events: {
    //listens for the click on the save
    'click .btn-save': 'saveContact',
    'click .btn-cancel': 'clearContact',
    'click': 'hideModal'
  },
  getInputData: function(){

    var inputName = this.$('input[name=name]').val(); this.$('input[name=name]').val('');

    var inputEmail = this.$('input[name=email]').val(); this.$('label[name=email]').val('');

    var inputPhone = this.$('input[name=phone]').val(); this.$('label[name=phone]').val('');

    return {
      name: inputName,
      email: inputEmail,
      phone: inputPhone,
    };
  },
  // creates new contact model object with the information passed from the form
  saveContact: function(){
    var contact = new Contact(this.getInputData());
    //adds the new contact model to the rolodex collection
    // this add triggers the `update` listener above
    this.model.add(contact);
  },
  clearContact: function(){
    this.$('#name').val('');
    this.$('#email').val('');
    this.$('#phone').val('');
  },

  displayModal: function(contact){
    console.log('clicked Contact now showing modal');
    // console.log('contact: ', contact);
    // console.log('contact.toJSON: ',contact.toJSON());
    $('#contact-details').empty();
    $('#contact-details').show();

    // var modalDetails = this.
    var generatedModalTemplate = this.modalTemplate(contact.attributes);
    // TODO what's best practice?
    //var generatedModalTemplate = this.modalTemplate(contact.toJSON())

    this.$('#contact-details').append(generatedModalTemplate);
    //
    // return this;
  },
  hideModal: function(event){

    // console.log('event.target', event.target);

    if($('#contact-details').has(event.target).length === 0 && !$('#contact-details').is(event.target)){
      $('#contact-details').hide();
    }
  }
});

export default RolodexView;
