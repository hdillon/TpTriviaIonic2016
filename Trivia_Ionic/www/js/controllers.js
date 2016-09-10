angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state) {
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.login = function() {
      if($scope.usuario.nombre == "")
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
        $scope.showAlert("BIENVENIDO " + $scope.usuario.nombre + "!");
        $state.go('tab.jugar');
      }
        
    };

    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})

.controller('JugarCtrl', function($scope, $ionicPopup, Preguntas, Respuestas, Opciones ) {
  $scope.showComenzar = true;
  $scope.preguntas = Preguntas;
  $scope.respuestas = Respuestas;
  $scope.opciones = Opciones;
  $scope.random = Math.round(Math.random() * 2); 
  console.log($scope.random); 

  $scope.getPregunta = function() {
    $scope.showComenzar = false;
    $scope.showPregunta = true;
  };

  $scope.setRespuesta = function(idOpcion, idPregunta, Respuesta) {
    if(idOpcion == Respuesta)
      $scope.showAlert("CORRECTO!");
    else
      $scope.showAlert("INCORRECTO!");
    //recargo la variable random para que se recargue la pregunta
    $scope.random = Math.round(Math.random() * 2); 
  };

  $scope.showAlert = function(resultado) {
  
      var alertPopup = $ionicPopup.alert({
         title: resultado,
         okText: "SIGUIENTE"
      });

      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AcercadeCtrl', function($scope) {
  $scope.miFoto = 'img/perfil.png';
});
