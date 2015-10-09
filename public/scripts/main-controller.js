angular.module('homework.main', [])


 .controller('mainCtrl', ['$scope', 'assignmentFactory', 'submissionFactory', '$http', '$modal', '$log', function($scope, assignmentFactory, submissionFactory, $http, $modal, $log) {

    $scope.myValue = true;

  
    $scope.getDescription = function(assignment) {
      $scope.description = assignment;
      $scope.current = assignment;
      $scope.getSubmissions(assignment);
    };

    $scope.getAllSubmissions = function() {
      $scope.getSubs = submissionFactory.getAllSubmissions;
      for (var i = 0; i < $scope.assignments.length; i++) {
        $scope.getSubs($scope.assignments[i]);
      }
      $scope.subs = submissionFactory.submissions;
    }

    $scope.getSubmissions = function(assignment) {
      $scope.submissions = [];
      for (var i = 0; i < $scope.subs.length; i++) {
        if ($scope.subs[i].assignment_id === $scope.current.id) {
          $scope.submissions.push($scope.subs[i]);
        }
      }
    }

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

    $scope.selectFirst = function(assignment) {
      if (assignment === $scope.assignments[0]) {
        this.selected = 'selected';
      } 
    };

    //this is used to highlight the selected assignment in the assignment column
    $scope.setSelected = function() {
     if ($scope.lastSelected) {
       $scope.lastSelected.selected = '';
     }
     this.selected = 'selected';
     $scope.lastSelected = this;
    };

    $scope.setDescSelected = function() {
     // if ($scope.lastdescSelected) {
     //   $scope.lastdescSelected.selected = '';
     // }
     $scope.descSelected = 'descSelected';
     // $scope.lastdescSelected = this;
     // $scope.lastsubSelected = 'off';
    };

    $scope.setSubSelected = function() {
     // if ($scope.lastsubSelected) {
     //   $scope.lastsubSelected.selected = '';
     // }
     $scope.subSelected = 'subSelected';
     // $scope.lastsubSelected = this;
     // $scope.descSelected = 'off';
    };

    $scope.unSelect = function() {
      if ($scope.descSelected) {
        $scope.descSelected = false;
      }
      else if ($scope.subSelected) {
        $scope.subSelected = false;
      }
    };

    $scope.initialize = function() {
      $scope.getAssignments = assignmentFactory.getAllAssignments;
      $scope.getAssignments();
      $scope.assignments = assignmentFactory.assignments;
      $scope.getAllSubmissions();
      $scope.assignment1 = $scope.assignments[0];
    };

    //initialized to get the assignments to show up
    $scope.initialize();
    // $scope.getSubmissions($scope.assignments[0]);


    //used to open the model when create new assignment is clicked
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: '/views/templates/modal.html',
        controller: 'assignmentCtrl',
      });
    };

  }]);