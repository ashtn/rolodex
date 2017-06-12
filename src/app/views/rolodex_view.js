import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Contact from '../models/contact.js';
import ContactView from '../views/contact_view.js';


var RolodexView = Backbone.View.extend({
  initialize: function(params){
    this.contactTemplate = params.template;

    this.listenTo(this.model, "update", this.render);

    this.modalTemplate = _.template($('#tmpl-contact-details').html());
  },
  render: function(){

    this.$('#contact-cards').empty();

    var that = this;

    this.model.each(function(contact){

      var contactView = new ContactView({
        model: contact,
        myTemplate: that.contactTemplate,
      });

      that.listenTo(contactView, "selectedCard", that.displayModal);

      that.$('#contact-cards').append(contactView.render().$el);
    });
    return this;
  },
  events: {
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
  saveContact: function(){
    var contact = new Contact(this.getInputData());
    this.model.add(contact);
  },
  clearContact: function(){
    this.$('#name').val('');
    this.$('#email').val('');
    this.$('#phone').val('');
  },

  displayModal: function(contact){

    this.$('#contact-details').empty();
    this.$('#contact-details').show();


    var generatedModalTemplate = this.modalTemplate(contact.attributes);
    // TODO what's best practice?
    //var generatedModalTemplate = this.modalTemplate(contact.toJSON())

    this.$('#contact-details').append(generatedModalTemplate);
  },
  hideModal: function(event){

    if(this.$('#contact-details').has(event.target).length === 0 && !this.$('#contact-details').is(event.target)){
      this.$('#contact-details').hide();
    }
  }
});

export default RolodexView;
