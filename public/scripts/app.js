angular.module('homework', ['ui.router', 'ui.bootstrap'])

  // This is the router  ==========================================>
  .config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');

    $stateProvider

      // Initial view for seeing assignments  
      .state('landing', {
        url: '/landing',
        templateUrl: '/views/templates/landing.html',
        controller: 'MainCtrl',
      })

      // The view showing assignment description  
      .state('landing.description', {
        url: '/description',
        templateUrl: '/views/templates/description.html',
        controller: 'MainCtrl'
      })

      // The view showing assignment submissions
      .state('landing.submissions', {
        url: '/submissions',
        templateUrl: '/views/templates/submissions.html',
        controller: 'MainCtrl'
      })

         // The view showing assignment submission's content 
      .state('landing.submissions.content', {
        url: '/content',
        templateUrl: '/views/templates/submissions.content.html',
        controller: 'MainCtrl'
      })

  })

    // Factory to get data from API ==========================================>
  .factory('dataFactory', function ($http) {
    var assignments =[];
    var ids = [];
    var getAllAssignments = function() {
      return $http({
        method: "GET",
        url: "https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      })
      .then(function(resp) {
        var data = resp.data;
        console.log("assignments!! :", assignments);
        for (var i = 0; i < data.length; i++) {
          if (ids.indexOf(data[i].id) === -1) {
            ids.push(data[i].id);
            assignments.push(data[i]);
          }
        }
      });
    };

    var addAssignment = function(assignment) {
      assignments.push(assignment);
      console.log('im being added', assignments);
    };

    var updateAssignments = function() {

    };

    return {
      getAllAssignments: getAllAssignments,
      assignments: assignments,
      addAssignment: addAssignment
    };

  })


  // This is the Main Controller  ========================================>
  .controller('MainCtrl', ['$scope', 'dataFactory', '$http', '$modal', '$log', function($scope, dataFactory, $http, $modal, $log) {

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
      console.log("this is the assignments", $scope.assignments);
    };

    //initialized to get the assignments to show up
    $scope.initialize();


    //used to open the model when create new assignment is clicked
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: '/views/templates/modal.html',
        controller: 'ModalInstanceCtrl',
      });
    };


}])

// This is the controller for the modal  ==========================================>
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, dataFactory) {
    
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