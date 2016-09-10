angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state) {
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.login = function() {
      if($scope.usuario.nombre == "")
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
        $scope.showAlert("BIENVENIDO " + $scope.usuario.nombre + "!");
        var usuario = { "nombre": $scope.usuario.nombre};
        $state.go('tab.jugar', usuario);
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

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, Preguntas, Respuestas, Opciones ) {

  $scope.nombreUsuario = angular.fromJson($stateParams);
  $scope.showComenzar = true;
  $scope.preguntas = Preguntas;
  $scope.respuestas = Respuestas;
  $scope.opciones = Opciones;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';

  $scope.random = Math.round(Math.random() * 2); //TODO: Cambiar el random a un tanaño variable de a cuerdo a la cantidad de preguntas cargadas en firebase

  $scope.getPregunta = function() {
    if($scope.nombreUsuario.nombre == 'NOLOGUEADO'){
    $scope.showAlert("No se ha logueado!");
    $state.go('tab.login');
  }else{
    $scope.showComenzar = false;
    $scope.showPregunta = true;
  }
  };

  $scope.setRespuesta = function(idOpcion, Respuesta, btnApretado) {
    if(idOpcion == Respuesta){
      $scope.cambiarColorBoton(btnApretado, 'correcto');
      $scope.showAlert("CORRECTO!");
    }
    else{
      $scope.cambiarColorBoton(btnApretado, 'incorrecto');
      $scope.showAlert("INCORRECTO!");
    }
    //recargo la variable random para que se recargue la pregunta
    $scope.random = Math.round(Math.random() * 2); 
  };


  $scope.cambiarColorBoton = function(btnApretado, estado) {
  switch(btnApretado){
        case 'btnOp1':
          $scope.btnOp1Estado = estado;
        break;
        case 'btnOp2':
          $scope.btnOp2Estado = estado;
        break;
        case 'btnOp3':
          $scope.btnOp3Estado = estado;
        break;
        default:
        break;
      }
  }

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
