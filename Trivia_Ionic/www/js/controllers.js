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

.controller('HistorialCtrl', function($scope,$firebaseArray, $timeout, $state, $stateParams, Usuario) {
  $scope.usuario = 'hdd';
  $scope.datosFB;
  $scope.datosFBArray;
  $scope.mostrar = false;
  $scope.username = Usuario.nombre;


  var FBRef = new Firebase("https://triviaionicapp.firebaseio.com/HistorialUsuarios");


  $scope.datosFBArray = $firebaseArray(FBRef);

  FBRef.once("value", function(snapshot) {
    console.info("Datos", snapshot.val());

    $scope.datosFB = snapshot.val();
    console.info("noarray: ",$scope.datosFB);
    console.info("FBARRAY: ",$firebaseArray(FBRef));

    console.info("scope", $scope.datosFBArray);

    //$scope.random = Math.round(Math.random() * ($scope.datosFB.preguntas.length - 1)); 
    });
  

  $scope.habilitar = function(){
    $scope.mostrar = !$scope.mostrar;
  }

})

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, $firebaseArray, $cordovaVibration,  $cordovaNativeAudio, $timeout, Preguntas, $cordovaFile, Usuario) {

  $scope.nombreUsuario = angular.fromJson($stateParams);
  $scope.showComenzar = true;
  $scope.seCargaronLosSonidos = false;
  $scope.datosFB;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';
  $scope.FBRef = new Firebase("https://triviaionicapp.firebaseio.com/");

  //TODO: eliminar el pasaje del usuario por stateParams y hacerlo todo desde la factory!
  


  Preguntas.once("value", function(snapshot) {
    console.info("Datos", snapshot.val());

    $scope.datosFB = snapshot.val();

    console.info("scope", $scope.datosFB);
    console.info("scope", $scope.datosFB.preguntas.length);
    //$scope.random = Math.round(Math.random() * ($scope.datosFB.preguntas.length - 1)); 
    });

  $scope.guardarHistorial = function(respuesta) {
     $scope.FBRef.child('HistorialUsuarios')
     .push({ 
      "usuario": $scope.nombreUsuario.nombre,
      "pregunta": $scope.datosFB.preguntas[$scope.random].descripcion, 
      "respuesta" : respuesta.rta, 
      "escorrecta" : respuesta.correcta 
      });
  }


  $scope.getPregunta = function() {
    if($scope.nombreUsuario.nombre == 'NOLOGUEADO'){
      $scope.showAlert("No se ha logueado!");
      $state.go('tab.login');
    }else{
      $scope.showComenzar = false;
      $scope.showLoader = true;

      setTimeout(function() {
        $scope.showLoader = false;
        $scope.showAlert("COMENZAR A JUGAR!");
        Usuario.setNombre($scope.nombreUsuario.nombre);
        $scope.showPregunta = true;
        }, 700);
    }
  };

  $scope.setResultado = function(btnApretado, respuesta) {
    /*console.info("asd",respuesta);
    console.info("asd",respuesta.rta);*/

    $scope.guardarHistorial(respuesta);

    if(respuesta.correcta){
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


  })//fin controller

.controller('AcercadeCtrl', function($scope, $cordovaInAppBrowser) {
  $scope.miFoto = 'img/perfil.png';
  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

  $scope.InAppBrowser=function(){
    $cordovaInAppBrowser.open('https://github.com/hdillon', '_system', options);
  }

});


