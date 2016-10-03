import Ember from 'ember';

function submit(app,selector){
  return triggerEvent(selector, 'submit');
}

Ember.Test.registerAsyncHelper('submit', submit);
