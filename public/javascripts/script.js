
var app = angular.module('Alltube', []);


app.controller('MainCtrl', function($scope, $http, $sce) {
    $scope.video_url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/wuV4BCYv-YY?rel=0&showinfo=0&modestbranding=1&autohide=1&theme=light&hd=1");

    var url = 'https://api-videos.herokuapp.com/youtube';
        $http.get(url)
             .success(function(data){
             $scope.videos = data.videos;
             $scope.page = data.page;
            });
    $scope.searchvideo = function (evt) {
        var query = $scope.query;
        var url = 'https://api-videos.herokuapp.com/youtube?query=' + query;
        $http.get(url)
            .success(function (data) {
                $scope.videos = data.videos;

            });
    };

    $scope.play_video = function(url){
        var url_id = "https://www.youtube.com/embed/" + url+"?rel=0&showinfo=0&modestbranding=1&autohide=1&theme=light&hd=1";
        $scope.video_url = $sce.trustAsResourceUrl(url_id);
    };

    $scope.search_by_paging = function(page_link){

        var url = 'https://api-videos.herokuapp.com/youtube/page?page=' + page_link;
        $http.get(url)
            .success(function (data) {
                $scope.videos = data.videos;
                $scope.page = data.page;

            });

    };

})


//===============================================================


$(document).ready(function(){
    $('input[type=text]').keypress(function(event){
        if(event.which == 13){
            $("#search").click();
            //Prevent the action on the element
            event.preventDefault();
        }
    });
    $('a').click(function(){
        $( "body").animate({ scrollTop: 0 }, 2500);
    });

});