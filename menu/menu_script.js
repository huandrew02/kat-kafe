function openNav() {
    document.getElementById("mySidepanel").style.width = "100%";
  }
  
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

/*
  THIS SECTION HANDLE THE UP AND DOWN BUTTONS OF THE MENU
*/


const menuContainer = document.querySelector('.menu-container')
const itemTypeTab = document.querySelector('.item-type-tab')
const menuList = document.querySelector('.menulist')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slideLength = itemTypeTab.querySelectorAll('div').length
const itemType = itemTypeTab.querySelectorAll('div')

// NOTE: be sure to change colors if need be here

let activeSlideIndex = 0;

itemType[activeSlideIndex].style.color = `black`;
itemType[activeSlideIndex].getElementsByTagName('h2')[0].style.fontSize = `2em`

upButton.addEventListener('click', ()=> changeMenuList('up'))
downButton.addEventListener('click', ()=> changeMenuList('down'))

const changeMenuList = (direction) =>{
  const containerHeight = menuContainer.clientHeight
  itemType[activeSlideIndex].style.color = `gray`;
  itemType[activeSlideIndex].getElementsByTagName('h2')[0].style.fontSize = `1.5em`
  if (direction==='down'){
    activeSlideIndex++;
    if (activeSlideIndex>slideLength-1){
      activeSlideIndex=0;
    }
    
    console.log(itemType)
  }else if (direction==='up'){
    activeSlideIndex--;
    if (activeSlideIndex<0){
      activeSlideIndex=slideLength-1;
    }
    
    console.log(itemType)
  }
  itemType[activeSlideIndex].style.color = `black`;
  itemType[activeSlideIndex].getElementsByTagName('h2')[0].style.fontSize = `2em`
  menuList.style.transform = `translateY(-${activeSlideIndex*containerHeight}px)`

}