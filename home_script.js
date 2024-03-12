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

document.addEventListener('DOMContentLoaded', function() {
  var subscribeButton = document.getElementById('subscribeButton');
  var subscribeAudio = document.getElementById('subscribeAudio');

  subscribeButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Try to play the audio
      subscribeAudio.play().then(() => {
          console.log('Audio played successfully');
      }).catch(error => {
          console.error('Error playing the audio:', error);
          // Handle browsers that block autoplay here
          // For example, you could show a message to the user asking them to manually play the audio
      });
      subscribeForm.reset();
  });
});