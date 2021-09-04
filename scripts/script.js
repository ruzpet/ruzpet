// pure javascript
let object;
let httpRequest = new XMLHttpRequest(); // asynchronous request
httpRequest.open("GET", "scripts/data.json", true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      	// when the request has completed

        object = JSON.parse(this.response);

        const imgList = object.sliderImg;  //get Array
        let imgCard = '';                  // empaty string

        for (let i = 0; i < imgList.length; i++) {
            imgCard += `
                <div class="slide">
                    <img class="image" src="${imgList[i]}" />
                </div>
            `;
        }
        

        
        const container = document.getElementById("img-container").innerHTML += imgCard;
        
        let slideIndex = 0;
        showSlides();

        function showSlides() {

            let slides = document.getElementsByClassName("slide"); // get div

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slideIndex++;

            if (slideIndex > slides.length) {slideIndex = 1}
            
            slides[slideIndex-1].style.display = "block";                
            setTimeout(showSlides, 3000); // Change image every 3 seconds
        }
    }
});