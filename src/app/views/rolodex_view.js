import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Contact from './models/contact.js';

var RolodexView = Backbone.View.extend({
  initialize: function(params){
    this.rolodexTemplate = params.template;
    // add listener
  },
  render: function(){
    // clears something
    // this.$().empty();
    var that = this;

    this.model.each(function(contact){
      var contactView = new ContactView({
        model: contact,
        template: that.rolodexTemplate,
        // tagName: ''
      });
    // rendered the view and append the new view to the 'todo-items'
      that.$('.contact-cards').append(contactView.render().$el);
    });
    //we `return this` so that we can `myView.render().el`
    return this;
  },
  events: {
    'click .btn-save': 'saveContact',
    getInputData: function(){
      // var inputName = $('#name').val(); $('#name').val('');
      var inputName = $('label[name=name]').val(); $('lable[name=name]').val('');
      // var inputEmail = $('#email').val(); $('#email').val('');
      var inputEmail = $('label[name=email]').val(); $('lable[name=name]').val('');
      // var inputPhone = $('#phone').val(); $('#phone').val
      var inputPhone = $('label[name=phone]').val(); $('lable[name=name]').val('');

      return {
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
      };
    },
  }
});
