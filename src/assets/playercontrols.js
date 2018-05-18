function playYouTube() {
    console.log("hello");
    var div = document.createElement('DIV');
    div.id = 'player';

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

    // var onPlayerReady = function (event){
    // var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
    // event.target.a.contentWindow.postMessage(youtube_command, 'https://www.youtube.com');
}
    //if (event.target.getPlayerState() !== 3 || event.target.getPlayerState() === -1 && event.target.getPlayerState() !== 1) {
      // let iframe = document.getElementsByTagName('iframe')[0];
      // var youtube_command = JSON.stringify({ event: 'command', func: 'pauseVideo' });

      // iframe.contentWindow.postMessage(youtube_command, '*');
      // console.log("pause: ", event.target.getPlayerState());
      // const player = _window.document.getElementById('player') as HTMLIFrameElement;
      // setTimeout(() => {
        // let iframe1 = document.getElementById('player');
        // var youtube_command1 = JSON.stringify({ event: 'command', func: 'playVideo' });
        // iframe1.contentWindow.postMessage(youtube_command1, '*');
        // event.target.playVideo();
        //console.log("play: ", event.target.getPlayerState());
      // }, 2000);
    //}

//(()=>{console.log('run this')})();
// function start(){
// setTimeout(function()
// {console.log('myplay');
//     // var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
//     // var myplayer = player.contentWindow;
//     // myplayer.postMessage(youtube_command, 'https://www.youtube.com');
//     document.getElementById('myplay').click();
//     //setTimeout(function(){console.log('mypause');
// },5000);
//M7lc1UVf-VE

        // // 4. The API will call this function when the video player is ready.
        // function onPlayerReady(event) {
        //     console.log('Player!!!');
        //     event.target.playVideo();
        // }

        // // 5. The API calls this function when the player's state changes.
        // //    The function indicates that when playing a video (state=1),
        // //    the player should play for six seconds and then stop.
        // var done = false;
        // function onPlayerStateChange(event) {
        //     if (event.data == YT.PlayerState.PLAYING && !done) {
        //         setTimeout(stopVideo, 6000);
        //         done = true;
        //     }
        // }
        // function stopVideo() {
        //     player.stopVideo();
        // }
        // //console.log(player.contentWindow);

        // console.log('start from js');
//     }
// }, 1000);


// }