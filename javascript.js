document.addEventListener("DOMContentLoaded", () =>
{
    const videosInCarousel = document.getElementsByClassName("video-wrapper");
    let youtubePlayers = [];

    nextButton = document.getElementById("nextButton");
    prevButton = document.getElementById("prevButton");

    let currentIndexVideoToShow = [0,1];

   ActivateBackToTopButton();
   AutoSelectService();

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

    

    function ActivateBackToTopButton()
    {
        const target = document.getElementById('hero-section');
        const backToTopButton = document.getElementById('return-to-top-button');

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                backToTopButton.classList.add('hidden');
            } else {
                backToTopButton.classList.remove('hidden');
            }
            });
        },
        {
            threshold: 0.5, // Trigger when 80% of the element is visible
        }
        );

        observer.observe(target);
    }

    function AutoSelectService()
    {
        

        const service_StrategyCall = document.getElementById("service_StratCall");
        const service_FreeConsult = document.getElementById("service_FreeConsult")
        const service_StrategyConsulting = document.getElementById("service_StratConsult");
        const service_VideoCreateEdit = document.getElementById("service_VideoCreateEdit");
        const service_LongTermDirect = document.getElementById("service_LongTermDirect");

        AddServiceEvent(service_StrategyCall);
        AddServiceEvent(service_FreeConsult);
        AddServiceEvent(service_StrategyConsulting);
        AddServiceEvent(service_VideoCreateEdit);
        AddServiceEvent(service_LongTermDirect);
    }

    function AddServiceEvent(element)
    {
        const serviceSelection = document.getElementById("serviceSelection");

        element.addEventListener("click", (e) => {
      

            switch(element.id){
                case "service_StratCall":
                    serviceSelection.value = "strategy-call";
                    break;
                    case "service_FreeConsult":
                    serviceSelection.value = "free-consultation"; 
                    break;
                    case "service_StratConsult":
                    serviceSelection.value = "strategy-consulting";
                    break;
                    case "service_VideoCreateEdit":
                    serviceSelection.value = "video-creation-editing";
                    break;
                    case "service_LongTermDirect":
                    serviceSelection.value = "creative-direction";
                    break;
                    default : break;
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