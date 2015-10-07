angular.module('homework.services', [])

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