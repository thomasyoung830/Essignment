angular.module('homework.modalInstance', [])
// This is the controller for the modal  ==========================================>
.controller('assignmentCtrl', function ($scope, $modalInstance, dataFactory) {
    
    //this creates a new assignment and adds it to the bar
    $scope.create = function (assignment) {
      dataFactory.addAssignment(assignment);
      $modalInstance.close();
    };

    //closes modal when cancel is clicked
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
 });