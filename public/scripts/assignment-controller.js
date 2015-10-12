angular.module('homework.modalInstance', [])
// This is the controller for the modal  ==========================================>
.controller('assignmentCtrl', function ($scope, $modalInstance, assignmentFactory) {
    
    //this creates a new assignment and adds it to the bar
    $scope.create = function (assignment) {
    	$scope.submitForm();
      assignmentFactory.addAssignment(assignment);
      $modalInstance.close();
    };

    //closes modal when cancel is clicked
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.userForm.$valid) {
				alert('New Assignment Created');
			}

		};
 });