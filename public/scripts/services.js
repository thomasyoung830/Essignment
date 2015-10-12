angular.module('essignment.services', [])

    // Factory to get data from API ==========================================>
  .factory('assignmentFactory', function ($http) {
    var assignments =[];
    var ids = [];
    var getAllAssignments = function() {
      return $http({
        method: "GET",
        url: "https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      })
      .then(function(resp) {
        var data = resp.data;
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
    };


    return {
      getAllAssignments: getAllAssignments,
      assignments: assignments,
      addAssignment: addAssignment
    };

  })

  .factory('submissionFactory', function ($http) {
    var submissions = [];
    var ids = [];
    var getAllSubmissions = function(assignment) {
      return $http({
        method: "GET",
        url: "https://api.edmodo.com/assignment_submissions?assignment_id=" + assignment.id + "&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      })
      .then(function(resp) {
        // submissions.length = 0;
        var data = resp.data;
        for (var i = 0; i < data.length; i++) {
          if (ids.indexOf(data[i].id) === -1) {
            ids.push(data[i].id);
            submissions.push(data[i]);
          }
        }
      });
    };

    return {
      getAllSubmissions: getAllSubmissions,
      submissions: submissions
    };
  })
