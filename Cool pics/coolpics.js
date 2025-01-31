const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", toggleMenu);
function toggleMenu() { 
  const menu = document.querySelector(".menu");
  console.log(menu);
  menu.classList.toggle("hide");
}





document.addEventListener('DOMContentLoaded', function () {
    function handleResize() {
      const button = document.querySelector(".menu");
      if (window.innerWidth > 1000) {
        button.classList.remove("hide");
      } else {
        button.classList.add("hide");
      }
    }
    
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    function viewerTemplate(pic, alt) {
      return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
      </div>`;
    }
  
    function viewHandler(event) {
      console.log(event);
      let body = document.querySelector('body');
      let html = viewerTemplate('norris-sm.jpeg', 'Review Image');
      body.insertAdjacentHTML('afterbegin', html);
  
      setTimeout(() => {
        document.querySelector('.close-viewer').addEventListener('click', (event) => {
          event.stopPropagation(); // Stop the click event from propagating
          document.querySelector('.viewer').remove();
        });
      }, 0);
    }
  
    document.querySelectorAll('.gallery img').forEach(img => {
      img.addEventListener('click', viewHandler);
    });
  });
  
  