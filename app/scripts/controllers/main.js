'use strict';
angular.module('myApp').controller('MainCtrl', ['$scope', '$sce', function($scope, $sce) {

    
    var currentId = 0;
    this.currentTime = 0;
    this.totalTime = 0;
    this.state = null;
    this.volume = 1;
    this.isCompleted = false;
    this.API = null;
    this.seeking = {
        currentTime: 0,
        duration: 0
    };
    this.seeked = {
        currentTime: 0,
        duration: 0
    };

    //this.thumbnails = "assets/thumbnails/thumbnail.jpg";

    this.onPlayerReady = function (API) {
        this.API = API;
    };

    this.onError = function (event) {
        console.log("VIDEOGULAR ERROR EVENT");
        console.log(event);
    };

    this.onCompleteVideo = function () {
        this.isCompleted = true;
    };

    this.onUpdateState = function (state) {
        this.state = state;
    };

    this.onUpdateTime = function (currentTime, totalTime) {
        this.currentTime = currentTime;
        this.totalTime = totalTime;
    };

    this.onSeeking = function (currentTime, duration) {
        this.seeking.currentTime = currentTime;
        this.seeking.duration = duration;
    };

    this.onSeeked = function (currentTime, duration) {
        this.seeked.currentTime = currentTime;
        this.seeked.duration = duration;
    };

    this.onUpdateVolume = function (newVol) {
        this.volume = newVol;
    };

    this.onUpdatePlayback = function (newSpeed) {
        this.API.playback = newSpeed;
    };

    this.media = [
        {
            name: 'Full Video',
            start: 1,
            stop: 52,
            sources: [
                {
                    src: $sce.trustAsResourceUrl("http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"),
                    type: "video/mp4"
                }
            ]
        },
        {
            name: 'Clip 2',
            start: 6,
            stop: 10,
            sources: [
                {
                    src: $sce.trustAsResourceUrl("http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4#t=6,20"),
                    type: "video/mp4"
                }
            ]

        }
    ];

    this.config = {
        playsInline: false,
        nativeFullscreen: true,
        autoHide: false,
        autoHideTime: 3000,
        autoPlay: false,
        sources: this.media[0].sources,
        loop: false,
        preload: "auto",
        controls: false,
        startTime: 0,
        virtualDuration: 0,
        totalTime: 0,
        plugins: {
            poster: {
                url: ""
            },
        }
    };

    this.changeSource = function (index) {
        this.config.sources = this.media[index].sources;
        this.config.tracks = undefined;
        this.config.loop = false;
        this.config.preload = true;
        this.config.startTime = this.media[index].start;
        this.config.totalTime = this.media[index].stop;
        this.config.virtualDuration = this.media[index].stop;
        $scope.videoClip = this.media[index];
        currentId = index;
        $scope.isAdding = false;
    };

    var video = "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";

    $scope.isAdding = false;
    $scope.videoClip = this.media[0];
    $scope.clips = this.media;
    $scope.isCurrent = function(i){
        if(currentId == i) return 'selected';
    }

    var self = this;
    $scope.addClip = function(){
        currentId = self.media.length;
        $scope.isAdding = true;
        $scope.videoClip = {
            name: '',
            start: '',
            stop: ''
        }
    }
    $scope.saveClip = function(){
        $scope.isAdding = false;
        if(currentId != 0){
            self.media[currentId] = {
                name: $scope.videoClip.name,
                start: $scope.videoClip.start,
                stop: $scope.videoClip.stop,
                sources: [
                    {
                        src: $sce.trustAsResourceUrl(video+"#t="+$scope.videoClip.start+","+$scope.videoClip.stop),
                        type: "video/mp4"
                    }
                ]
            };
        }
    }
    $scope.removeClip = function(){
        if(currentId != 0){
          self.media.splice(currentId, 1);  
          self.changeSource(0)
        }
        
    }

}]);