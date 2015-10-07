angular.module('homework.main', [])


 .controller('mainCtrl', ['$scope', 'dataFactory', '$http', '$modal', '$log', function($scope, dataFactory, $http, $modal, $log) {

    $scope.myValue = true;

  
    $scope.getDescription = function(assignment) {
      $scope.description = assignment;
      $scope.getSubmissions(assignment);
    };

    $scope.getSubmissions = function(assignment) {
      var url = "https://api.edmodo.com/assignment_submissions?assignment_id=" + assignment.id + "&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      $http.get(url)
        .then(function (response) {
          $scope.submissions = response.data;
        })
    };

    //this gets the content for the submission clicked
    $scope.getContent = function(submission) {
      var submissions = $scope.submissions;
      for (var i = 0; i < submissions.length; i++) {
        if (submissions[i].id === submission.id) {
          $scope.content = submission.content;
        }
      }
    };

    //this is to toggle the submission content for each student
    $scope.buttonToggle = function(buttonNumber) {
      this.pickChosen = buttonNumber === this.pickChosen ? 0 : buttonNumber;
    };

    //this is used to highlight the selected assignment in the assignment column
    $scope.setSelected = function() {
     if ($scope.lastSelected) {
       $scope.lastSelected.selected = '';
     }
     this.selected = 'selected';
     $scope.lastSelected = this;
    };

    $scope.initialize = function() {
      $scope.getAssignments = dataFactory.getAllAssignments;
      $scope.getAssignments();
      $scope.assignments = dataFactory.assignments;
    };

    //initialized to get the assignments to show up
    $scope.initialize();


    //used to open the model when create new assignment is clicked
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: '/views/templates/modal.html',
        controller: 'assignmentCtrl',
      });
    };

  }]);