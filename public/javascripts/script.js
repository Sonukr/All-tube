
var app = angular.module('Alltube', []);


app.controller('MainCtrl', function($scope, $http, $sce) {
    $scope.video_url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/wuV4BCYv-YY?autoplay=0&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1");


    var url = 'https://api-videos.herokuapp.com/';
        $http.get(url)
             .success(function(data){
             $scope.videos = data.videos;
             $scope.page = data.page;
            });
    $scope.search_video = function (evt) {
        $(".loading").fadeIn(10);
        var query = $scope.query;
        var url = 'https://api-videos.herokuapp.com/youtube?query=' + query;
        $http.get(url)
            .success(function (data) {
                $scope.videos = data.videos;
                $scope.page = data.page;
                $(".loading").fadeOut(100);
            });
    };

    $scope.play_video = function(url){
        var url_id = "https://www.youtube.com/embed/" + url+"?autoplay=1&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1";
        $scope.video_url = $sce.trustAsResourceUrl(url_id);
        $("html, body").animate({ scrollTop: 0 }, 1000);
    };

    $scope.search_by_paging = function(page_link){
        $(".loading").fadeIn(10);
        var url = 'https://api-videos.herokuapp.com/youtube/page?page=' + page_link;
        $http.get(url)
            .success(function (data) {
                $scope.videos = data.videos;
                $scope.page = data.page;
                $(".loading").fadeOut(1000);

            });
    };

    $scope.download_video = function(video_id){
        $scope.download_url = ' ';
        var down_url = 'http://api-videos.herokuapp.com/download?query='+ video_id ;
        $http.get(down_url )
            .success(function(data){
                //console.log(data.urls);
                //console.table(data.urls, "best_download_url");
                $scope.download_url = data.urls;
                $(".loading_url").fadeOut(1000);
            });

    };

});


//========================      Jquery     =======================================

$(window).load(function(){
    $(".loading").fadeOut(100);
});

$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
    //for fitvid
    $("#main").fitVids();
    //$(".loading").fadeOut(100);

    $('input[type=text]').keypress(function(event){
        if(event.which == 13){
            $("#search").click();
            //Prevent the action on the element
            event.preventDefault();
        }
    });
    $('a').click(function(){
        $( "body").animate({ scrollTop: 0 }, 1000);
    });

});

