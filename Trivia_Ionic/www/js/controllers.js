angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $cordovaVibration,  $cordovaNativeAudio) {
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.seCargaronLosSonidos = false;
  $scope.login = function() {
      if($scope.usuario.nombre == ""){
        $scope.play('clickMal');
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE", false);
      }
      else{
        $scope.showAlert("BIENVENIDO " + $scope.usuario.nombre + "!", true);
        $scope.play('clickBien');
      }
    };

    $scope.showAlert = function(resultado, jugar) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
         if(jugar){
            var usuario = { "nombre": $scope.usuario.nombre};
            $state.go('tab.jugar', usuario);
         }
      });
   };

   $scope.play = function (sound) {
  try{
  $cordovaNativeAudio.play(sound);
  }catch(err){
    console.log("No es un dispositivo mobile");
  }
};
})

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout, Preguntas, $cordovaFile) {

  $scope.nombreUsuario = angular.fromJson($stateParams);
  $scope.showComenzar = true;
  $scope.seCargaronLosSonidos = false;
  $scope.datosFB;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';


Preguntas.once("value", function(snapshot) {
  console.info("Datos", snapshot.val());

  $scope.datosFB = snapshot.val();

  console.info("scope", $scope.datosFB);
  console.info("scope", $scope.datosFB.preguntas.length);
  $scope.random = Math.round(Math.random() * ($scope.datosFB.preguntas.length - 1)); 
  });

  $scope.getPregunta = function() {
    if($scope.nombreUsuario.nombre == 'NOLOGUEADO'){
    $scope.showAlert("No se ha logueado!");
    $state.go('tab.login');
  }else{
    $scope.showComenzar = false;

    $scope.showLoader = true;

    setTimeout(function() {
      $scope.showLoader = false;
      $scope.showPregunta = true;
      $scope.showAlert("COMENZAR A JUGAR!");
      }, 700);

  }
  };

  $scope.setResultado = function(btnApretado, respuestaCorrecta) {
    if(respuestaCorrecta){
      try{
      $cordovaVibration.vibrate(100);  
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'correcto');
      $scope.play('clickBien');
    //Le agrego un retardo para que me muestre el popUp del resultado y me muestre la próxima pregunta
    setTimeout(function() {
      $scope.showAlert("CORRECTO!", btnApretado);
      }, 700);  
    }
    else{
      try{
        var patron = [100, 100, 100, 100];
        $cordovaVibration.vibrate(patron); 
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'incorrecto');

      try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }

      setTimeout(function() {
        $scope.showAlert("INCORRECTO!", btnApretado);
      }, 700);
    }
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

  $scope.showAlert = function(resultado, btnApretado) {
  
      var alertPopup = $ionicPopup.alert({
         title: resultado,
         okText: "SIGUIENTE"
      });

      alertPopup.then(function(res) {
        //vuelvo a poner el boton en el color por default
        $scope.cambiarColorBoton(btnApretado, 'clear'); 
        //recargo la variable random para que se recargue la siguiente pregunta
         $scope.random = Math.round(Math.random() * ($scope.datosFB.preguntas.length - 1)); 
      });
   };

try{
  if(!$scope.seCargaronLosSonidos){
    $scope.seCargaronLosSonidos = true;
  $cordovaNativeAudio
      .preloadSimple('clickBien', 'audio/correcto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('clickMal', 'audio/incorrecto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });
  }
}catch(err){
  console.log("No es un dispositivo mobile");
}

/****FUNCIONES NATIVE AUDIO****/
$scope.play = function (sound) {
  try{
  $cordovaNativeAudio.play(sound);
  }catch(err){
    console.log("No es un dispositivo mobile");
  }
};
/****FIN FUNCIONES NATIVE AUDIO****/



$scope.guardarArchivo = function(datos) {
  try{
    $cordovaFile.checkFile(cordova.file.externalDataDirectory, "trivia.txt")
    .then(function (success) {
      $cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, "trivia.txt", datos)
      .then(function (success) {

       }, function (error) {
            
          });
      }, function (error) {
        
        $cordovaFile.createFile(cordova.file.externalDataDirectory, "trivia.txt", true)
          .then(function (success) {

          }, function (error) {

          });
        $cordovaFile.writeFile(cordova.file.externalDataDirectory, "trivia.txt", datos, true)
          .then(function (success) {

          }, function (error) {

          });
      });

  } catch(err){
    console.log("No es un dispositivo mobile");
  }
}

})//fin controller

.controller('AcercadeCtrl', function($scope) {
  $scope.miFoto = 'img/perfil.png';
});
