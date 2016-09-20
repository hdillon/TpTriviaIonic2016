angular.module('starter.services', [])

.factory("Preguntas", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionicapp.firebaseio.com/-KRz59x-ec_7fg5rTh5A');
  return itemsRef;
});