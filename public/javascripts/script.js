
var app = angular.module('Alltube', ['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/',{
           templateUrl:'/video.html',
            controller:'MainCtrl'
        });

        $routeProvider.when('/video/:id',{
            templateUrl:'/play_video.html',
            controller:'play'
        });

    });


// for play video over his own url. :)

app.controller('play', function ($scope, $routeParams, $sce) {
        //Get ID out of current URL
        var currentId = $routeParams.id;
        $scope.video_url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/aGe9Hr_9YEU?autoplay=0&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1");
        var url_id = "https://www.youtube.com/embed/" + currentId+"?autoplay=1&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1";
        $scope.video_url = $sce.trustAsResourceUrl(url_id);



});

app.controller('MainCtrl', function($scope, $http, $sce) {

    $scope.name = " ";

    $scope.video_url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/wuV4BCYv-YY?autoplay=0&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1");

    var url = 'https://api-videos.herokuapp.com/';

    $http.get(url).success(function(data){
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
                console.log($scope.videos);
                $(".loading").fadeOut(100);
            });
    };

    $scope.play_video = function(video){
        var embed_url = video.embed_url;
        var url_id = "https://www.youtube.com/embed/" + embed_url+"?autoplay=1&rel=0&showinfo=0&modestbranding=1&autohide=1&hd=1";
        $scope.video_url = $sce.trustAsResourceUrl(url_id);
        $scope.name = video.name;
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
        var down_url = 'https://api-videos.herokuapp.com/download?query='+ video_id ;
        $http.get(down_url )
            .success(function(data){
                //console.log(data.urls);
                //console.table(data.urls, "best_download_url");
                $scope.download_url = data.urls;
                $(".loading_url").fadeOut(1000);
            });

    };


    //for initialize with a function for video player

    $scope.load = function () {
        //$(".loading").fadeOut(100);
        $("#main").fitVids();
    };


});


//========================      Jquery     =======================================

$(window).load(function(){
    $(".loading").fadeOut(100);
    $("#main").fitVids();
});

$(document).ready(function(){
    $(".loading").fadeOut(100);
    $('.dropdown-toggle').dropdown();
    //for fitvid
    $("#main").fitVids();

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

