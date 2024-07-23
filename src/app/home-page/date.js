var app = angular.module('app', []);
app.controller('SideController', function($scope) { // Added $scope parameter
  document.addEventListener('DOMContentLoaded', function () {
    // Function to update the current date
    function updateCurrentDate() {
      const currentDateElement = document.getElementById('currentDate');
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      currentDateElement.textContent = formattedDate;
    }
  
    // Update the current date initially
    updateCurrentDate();
  
    // Update the current date every second
    setInterval(updateCurrentDate, 1000);
  });
});