angular.module('starter.services', [])




.factory('Usuario', function () {
        var usuario = {};

        // myProperty
        usuario.nombre = 'NOLOGUEADO';

        // Set myProperty
        usuario.setNombre = function (value) {
            this.nombre = value;
        };

        return usuario;
    })

.factory("Preguntas", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionicapp.firebaseio.com/-KRz59x-ec_7fg5rTh5A');
  return itemsRef;
});