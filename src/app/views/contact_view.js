import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Contact from '../models/contact.js';

const ContactView = Backbone.View.extend({

  initialize: function(params){
    this.template = params.myTemplate; // this matches the render
    // this.listenTo(this.model, "change", this.render);
  },
  render: function(){
    // console.log('this.model: ', this.model);
    var generatedHTMLView = this.template(this.model.toJSON());

    this.$el.html(generatedHTMLView);

    return this;
  },
  //////// acts kind of like the controller - charles //////
  events: {
    'click': 'onClick'
  // the buttons in the task are for the task template not the form.. hmmmm
},
onClick: function(){
  var click = this.trigger('selected', this.model);
  console.log('click', click);
}
});

export default ContactView;
