angular.module('essignment')

  // This is the router  ==========================================>
  .config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');

    $stateProvider

      // Initial view for seeing assignments  
      .state('landing', {
        url: '/landing',
        templateUrl: '/views/templates/landing.html',
        controller: 'mainCtrl',
      })

      // The view showing assignment description  
      .state('landing.description', {
        url: '/description',
        templateUrl: '/views/templates/description.html',
        controller: 'mainCtrl'
      })

      // The view showing assignment submissions
      .state('landing.submissions', {
        url: '/submissions',
        templateUrl: '/views/templates/submissions.html',
        controller: 'mainCtrl'
      })

         // The view showing assignment submission's content 
      .state('landing.submissions.content', {
        url: '/content',
        templateUrl: '/views/templates/submissions.content.html',
        controller: 'mainCtrl'
      })

  })