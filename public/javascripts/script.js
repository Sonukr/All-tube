
var app = angular.module('Alltube', []);


app.controller('MainCtrl', function($scope, $http) {
var url = 'https://api-videos.herokuapp.com/youtube?query=humnawa';
    $http.get(url)
         .success(function(data){
     $scope.videos = data.videos;
 console.log(data)
});

})