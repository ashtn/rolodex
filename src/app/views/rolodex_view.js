import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Contact from '../models/contact.js';
import ContactView from '../views/contact_view.js';
// import ContactDetailsView from '../views/contact_details_view.js';

var RolodexView = Backbone.View.extend({
  initialize: function(params){
    this.contactTemplate = params.template;
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
      that.listenTo(contactView, "selected", that.displayModal);
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
    // 'click .contact-card': 'viewContact'
  },
  getInputData: function(){
    var inputName = this.$('#name').val(); this.$('#name').val('');
    // var inputName = this.$('label[name=name]').val(); this.$('lable[name=name]').val('');
    var inputEmail = this.$('#email').val(); this.$('#email').val('');
    // var inputEmail = this.$('label[name=email]').val(); this.$('lable[name=name]').val('');
    var inputPhone = this.$('#phone').val(); this.$('#phone').val('');
    // var inputPhone = this.$('label[name=phone]').val(); this.$('lable[name=name]').val('');

    return {
      name: inputName,
      email: inputEmail,
      phone: inputPhone,
    };
  },
  // creates new contact model object with the information passed from the form
  saveContact: function(){
    var contact = new Contact(this.getInputData());
    console.log('add contact-buttion');
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
    // console.log('contact: ', contact);
    // console.log('contact.toJSON: ',contact.toJSON());
    $('#contact-details').empty();

    // var modalDetails = this.
    var generatedModalTemplate = this.modalTemplate(contact.attributes);

    this.$('#contact-details').append(generatedModalTemplate);

    return this;
  }
});

export default RolodexView;
