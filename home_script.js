const panels = document.querySelectorAll('.panel')

function openNav() {
  document.getElementById("mySidepanel").style.width = "100%";
}
  
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
  
// for loop
panels.forEach((panel) => {
  //console.log(panel);
  panel.addEventListener('click', () => {
      removeActiveClasses()
      panel.classList.add('active')
  })
})

function removeActiveClasses() {
  panels.forEach(panel => { //do not need () b/c 1 argument
      panel.classList.remove('active')
  })
}
// TODO: make the newsletter work

document.getElementById('subscribeButton').addEventListener('click', function(event) {
  var audio = document.getElementById('subscribeAudio');
  audio.play();
  // You can add further actions here if needed
});