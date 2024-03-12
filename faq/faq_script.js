function openNav() {
    document.getElementById("mySidepanel").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  const toggles = document.querySelectorAll('.faq-toggle')

  toggles.forEach(toggle => { 
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active')
    })
  })
  