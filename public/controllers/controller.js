var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('Hello World from controller');

    var refresh = function(){
      $http.get('/contactList').success(function(response){
        console.log('I got the data I request');
        $scope.contactList = response;
        $scope.contact = '';
      });
    };

    refresh();

    $scope.addContact = function(){
      console.log($scope.contact);
      $http.post('/contactList', $scope.contact).success(function(response){
        console.log(response);
        refresh();
      });
    };

    $scope.delContact = function(id){
      console.log(id);
      $http.delete('/contactList/' + id).success(function(response){
        refresh();
      });
    };

    $scope.preContact = function(id){
      console.log(id);
      $http.get('/contactList/' + id).success(function(response){
        $scope.contact = response;
      });
    };

    $scope.updContact = function(){
      console.log($scope.contact._id);
      $http.put('/contactList/' + $scope.contact._id,  $scope.contact).success(function(response){
        refresh();
      });
    };

    $scope.deselect = function() {
      $scope.contact = "";
    }
}]);
