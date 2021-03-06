angular.module('ContactListApp', [])
.controller('AppCtrl', ['$http', AppCtrl]);

function AppCtrl($http) {
  var vm = this;
  getContacts();
  vm.add = function(){
    $http.post('/contactlist', vm.contact).success(function(data){
      vm.contact = '';
      getContacts();
    });
  };

  vm.delete = function(id){
    $http.delete('/contactlist/' + id).success(function(data){
      getContacts();
    });
  };

  vm.edit = function(id){
    $http.get('/contactlist/' + id).success(function(data){
      vm.contact = data;
    });
  };

  vm.update = function(){
    $http.put('/contactlist/' + vm.contact._id, vm.contact).success(function(data){
      vm.contact = '';
      getContacts();
    });
  };
  function getContacts(){
    $http.get('/contactlist').success(function(data){
      vm.contacts = data;
    });
  }
}
