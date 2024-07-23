var app = angular.module('app', []); // Added [] when declaring the app module
app.controller('SideController', function($scope) { // Changed $ to $scope
    $scope.isSidebarOpen = true; // Set the sidebar to be opened by default
    $scope.activeSubMenu = '';
  
    $scope.toggleSidebar = function() {
      $scope.isSidebarOpen = !$scope.isSidebarOpen;
    };
  
    $scope.toggleSubMenu = function(menu) {
      if ($scope.activeSubMenu === menu) {
        $scope.activeSubMenu = '';
      } else {
        $scope.activeSubMenu = menu;
      }
    };
  });