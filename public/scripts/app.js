angular.module('homework', ['ui.router', 'ui.bootstrap'])

  // This is the router  ========================================
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


  .factory('dataFactory', function ($http) {
  // Your code here
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


  // This is the Main Controller  ========================================
  .controller('MainCtrl', ['$scope', 'dataFactory', '$http', '$modal', '$log', function($scope, dataFactory, $http, $modal, $log) {

    $scope.myValue = true;

    // get assignments
  

    $scope.getDescription = function(assignment) {
      $scope.description = assignment;
      $scope.getSubmissions(assignment);
      console.log("finished");
    };

    

    $scope.getSubmissions = function(assignment) {
      var url = "https://api.edmodo.com/assignment_submissions?assignment_id=" + assignment.id + "&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      $http.get(url)
        .then(function (response) {
          console.log("were here", response.data);
          $scope.submissions = response.data;
        })
    };

    $scope.getContent = function(submission) {
      var submissions = $scope.submissions;
      for (var i = 0; i < submissions.length; i++) {
        if (submissions[i].id === submission.id) {
          $scope.content = submission.content;
        }
      }
    };

    $scope.buttonToggle = function(buttonNumber) {
      this.pickChosen = buttonNumber === this.pickChosen ? 0 : buttonNumber;
    };

    $scope.setSelected = function() {
     if ($scope.lastSelected) {
       $scope.lastSelected.selected = '';
     }
     this.selected = 'selected';
     $scope.lastSelected = this;
    };

    $scope.initialize = function() {
      // var url = "https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d";
      // $http.get(url)
      //   .then(function (response) {
      //     $scope.assignments = response.data;
      //   })
      $scope.assignments = [1,2,3];
      $scope.getAssignments = dataFactory.getAllAssignments;
      $scope.getAssignments();
      $scope.assignments = dataFactory.assignments;
      console.log("this is the assignments", $scope.assignments);
      
    };

    $scope.initialize();

    setInterval(function() {
      $scope.initializ
    }, 1000);


    $scope.animationsEnabled = true;


    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/views/templates/modal.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}])

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, dataFactory) {
    

    $scope.create = function (assignment) {
      // dataFactory.assignments.push(assignment);
      console.log('helllooo');
      dataFactory.addAssignment(assignment);
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
 });