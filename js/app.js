if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  let observer = new IntersectionObserver(entries => {
    let navBar = document.querySelector('nav[aria-label*=Main]');
    if (window.innerWidth > 960) {
      if (entries[0].boundingClientRect.y < 0) {
      
        navBar.classList.add("dark");
      } else {
        navBar.classList.remove("dark");
      }
    }
});
observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
}

// Get all sections that have an ID defined
const sections = document.querySelectorAll("article[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY = window.pageYOffset;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
  
    // Original:
    // const sectionTop = current.offsetTop - 50;
    //  
    // Alex Turnwall's update:
    // Updated original line (above) to use getBoundingClientRect instead of offsetTop, based on:
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // https://newbedev.com/difference-between-getboundingclientrect-top-and-offsettop
    // This allows the use of sections inside a relative parent, which I'm not using here, but needed for a project
    //
    const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 160;
    sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (scrollY < document.querySelector('#home').offsetHeight - 130) {
      document.querySelector(".navigation a[href*=home-link]").classList.add("active");
      document.querySelector(".navigation a[href*=" + sectionId + "-link]").classList.remove("active");
    } else if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navigation a[href*=" + sectionId + "-link]").classList.add("active");
    } else {
      document.querySelector(".navigation a[href*=" + sectionId + "-link]").classList.remove("active");
      document.querySelector(".navigation a[href*=home-link]").classList.remove("active");
    }
  });
}
