// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';
// pure javascript
let object;
let httpRequest = new XMLHttpRequest(); // asynchronous request
httpRequest.open("GET", "scripts/data.json", true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      	// when the request has completed
        object = JSON.parse(this.response);

         /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
        |                         Header Slider                                       |
        *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
        const imgList = object.sliderImg;  //get Array
        let imgCard = '';                  // empaty string

        for (let i = 0; i < imgList.length; i++) {
            imgCard += `
                <div class="slide">
                    <img class="image" src="${imgList[i]}" />
                </div>
            `;
        }      

        
        document.getElementById("img-container").innerHTML += imgCard;
        let slides = document.getElementsByClassName("slide"); // get div       
        showSlides(slides);

        /*-------------------------------End Header Slider -----------------------------------*/

        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
        |                         Portfolio                                        |
        *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        /*-------------------------------Video Section /START-----------------------------------*/
        const videoItem = object.videos; 
        let videoCard = '';
        let shortcutItem = '';
            for(let x = 0; x < videoItem.length; x++) {
                let shortcuts = '';

                if (videoItem[x].shortcuts) {
                    shortcuts += "<div class='swiper-wrapper shortcut-item'> "

                    let shortcut_index = videoItem[x].shortcuts.small ? videoItem[x].shortcuts.small.length : 0;
                    while(shortcut_index--) {
                        shortcutItem = `<img class="shortcut-img w-100 h-100" src="${videoItem[x].shortcuts.small[shortcut_index]}" data-big="${videoItem[x].shortcuts.big ? videoItem[x].shortcuts.big[shortcut_index] : ''}">`; 
                        shortcuts += shortcutItem;
                    }
                    shortcuts += "</div>";
                }
                
                videoCard =  `
                    <div class="swiper-slide row mr-5 p-5">
                        <div class="inner details col-lg-6 col-md-12 col-sm-12">
                            <h1 class="h3"> ${videoItem[x].title} </h1>
                            <h5 class="h6 mb-4" style="color:#4F4F4F;">Year: ${videoItem[x].date}</h5>
                            <p class="h6">Description: ${videoItem[x].description} </p>
                        </div>
                        <div class="inner video col-lg-6 col-md-12 col-sm-12 col-sm-12"> 
                            <iframe class="w-100 h-100" src="${videoItem[x].src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="swiper shortcuts col-lg-6 col-md-12 col-sm-12 ml-0 mr-0 mt-5 mb-5 nested">
                            ${shortcuts}
                        </div> 
                    </div>
                `;
                
                document.getElementById("video-inner").innerHTML += videoCard;
            }
            /*-------------------------------Video Section / END-----------------------------------*/

            /*-------------------------------Photo Section / START-----------------------------------*/
            const photoItem = object.photo; 
            let photoCard = '';
                for(let x = 0; x < photoItem.length; x++) {
                    
                    photoCard =  `
                        <div class="swiper-slide row mr-5">
                            <div class="inner w-75" style="margin: 0 auto; height:80vh;">
                                <img class="w-100" style="object-fit:contain; height:inherit;" src="${photoItem[x].src}"  alt="Photos">
                                <p class="h5 text-center">${photoItem[x].title} </p>
                            </div>
                        </div>
                    `;
                    
                    document.getElementById("photo-inner").innerHTML += photoCard;
                }
            /*-------------------------------Photo Section / END-----------------------------------*/

            /*-------------------------------Drawing Section / START-----------------------------------*/
            const drawingItem = object.drawings; 
            let drawingCard = '';
                for(let x = 0; x < drawingItem.length; x++) {
                    
                    drawingCard =  `
                        <div class="swiper-slide row mr-5 pl-5 pr-5">
                            <div class="inner w-75" style="margin: 0 auto; height:90vh;">
                                <img class="w-100" style="object-fit:contain; height:inherit;" src="${drawingItem[x].src}"  alt="Photos">
                                <p class="h5 text-center">${drawingItem[x].title} </p>
                            </div>
                        </div>
                    `;
                    
                    document.getElementById("drawing-inner").innerHTML += drawingCard;
                }
            /*-------------------------------Drawing Section / END-----------------------------------*/
        /*End Portfolio Section -----------------------------------------------------------*/ 

        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
        |                         Exhibitions                                        |
        *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        const exhibitionItem = object.exhibitions; 
        let exhibitionCard = '';
        let exhibitionImg = '';

            for(let x = 0; x < exhibitionItem.length; x++) {
                let exhibitions = '';
                if (exhibitionItem[x].img) {

                    let exhibition_index = exhibitionItem[x].img ? exhibitionItem[x].img.length : 0;
                        while(exhibition_index--) {
                            
                            exhibitions += "<div class='swiper-slide exhibition-item' style='object-fit:contain; height: 90vh'> "
                                exhibitionImg = `<img class="exhibition-img w-100" style="object-fit:contain; height:100%" src="${exhibitionItem[x].img[exhibition_index]}">`
                                exhibitions += exhibitionImg;                          
                            exhibitions += "</div>";
                        }
                }
                
                exhibitionCard =  `
                    <div class="swiper-slide row p-5">
                        <div class="inner details col-lg-6 col-md-12 col-sm-12 mr-3">
                            <h1 class="h4"> ${exhibitionItem[x].title} </h1>
                            <h5 class="h6 mb-4" style="color:#4F4F4F;">Year: ${exhibitionItem[x].year}</h5>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12 nested-swiper">
                            <div class="nested-wrapper">
                                ${exhibitions}
                            </div>                            
                        </div>
                    </div>
                `;
                
                document.getElementById("exhibitions-inner").innerHTML += exhibitionCard;
            }

    }
});

const swiper = new Swiper('.swiper', {
    // Optional parameters
    spaceBetween: 100,
    centeredSlides: true,                
    loop: true,
    allowTouchMove: false,
   

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true
    },
    
});


let exhibitionItem = document.getElementsByClassName("exhibition-item");
showSlides(exhibitionItem);

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
|                                                                           |
*                        Custom  Functions                                  *
|                                                                           |
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

//AutoPlay slider
function showSlides(val) {                          
            
    let slidePosition = 0;
    if(val !== undefined) {      
        setInterval(function() {
            for (let i = 0; i < val.length; i++) {
              val[i].style.display = "none";
            }
            slidePosition = (slidePosition != val.length - 1) ? slidePosition + 1 : 0;
            val[slidePosition].style.display = "block";
        }, 3000);    
   }                   
}

   //portfolio menu
   (function(dom, window) {

    //header menu 
    window.addEventListener('click', function(event){
        let navbar = dom.getElementsByClassName('navbar');

        if (event.target !== navbar && event.target.parentNode != navbar){
            navbar.style.display = "none";
        }

    });
    

    //portfolio menu
    let links = dom.querySelectorAll('.nav-link');
    let all_containers = dom.querySelectorAll('.portfolio-item');
    

    let a = links.forEach(function(el) {
        el.addEventListener('click', function(event) {
            passive: true;

            event.preventDefault(); // prevent the default action of event
            
            let container_id = el.getAttribute('href');
            let container = dom.querySelector(container_id);
            let active_tab_list_item = dom.querySelector('.nav-item.active');
            
            all_containers.forEach(function(el) {
                el.classList.add('d-none');
            });

            active_tab_list_item.classList.remove('active');

            container.classList.remove('d-none');
            let a = el.parentElement.classList.add('active');

        });
    });
})(document, window);


