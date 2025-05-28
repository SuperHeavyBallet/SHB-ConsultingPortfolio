document.addEventListener("DOMContentLoaded", () =>
{
    const videosInCarousel = document.getElementsByClassName("video-wrapper");
    let youtubePlayers = [];

    nextButton = document.getElementById("nextButton");
    prevButton = document.getElementById("prevButton");

    let currentIndexVideoToShow = [0,1];

    console.log(videosInCarousel);

    nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Next"); 
        ShiftVideosShown(+2);    
    });

    prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("PRevious");
        ShiftVideosShown(-2); 
    });

    function ShiftVideosShown(shift)
    {
        //pauseAllYouTubeVideos();

        stopAllIframes();

        let array = Array.from(document.getElementsByClassName("video-wrapper"));
        const totalVideos = array.length;
        
        // Normalize new indices using modulus to loop around
        let newIndex1 = (currentIndexVideoToShow[0] + shift + totalVideos) % totalVideos;
        let newIndex2 = (currentIndexVideoToShow[1] + shift + totalVideos) % totalVideos;

        // Special case: prevent newIndex1 and newIndex2 from being the same if array.length == 1
        if (newIndex1 === newIndex2 && totalVideos > 1) {
            newIndex2 = (newIndex1 + 1) % totalVideos;
        }

        for (let i = 0; i < array.length; i++) {
            if (i === newIndex1 || i === newIndex2) {
                videosInCarousel[i].classList.remove("hidden");
            } else {
                videosInCarousel[i].classList.add("hidden");
            }
        }
    
        currentIndexVideoToShow = [newIndex1, newIndex2];

    }

    function stopAllIframes() {
        const iframes = document.querySelectorAll("iframe");
    
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = src; // Reset the src to stop playback
        });
    }

    function pauseAllYouTubeVideos(){
        youtubePlayers.forEach(player => {
            if(player.pauseVideo) {
                player.pauseVideo();
            }
        })
    }
})

function onYouTubeIframeAPIReady() {
    const iframes = document.querySelectorAll(".youtube-player");
    iframes.forEach((iframe, index) => {
        const player = new YT.Player(iframe.id);
        youtubePlayers.push(player);
    });
}