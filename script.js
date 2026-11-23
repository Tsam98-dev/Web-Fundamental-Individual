// Select all required DOM elements and store them as constants to reduce query repetition
const cover = document.querySelector('.cover');
const coverLeft = document.querySelector('.cover-left');
const coverRight = document.querySelector('.cover-right');
const content = document.querySelector('.content-page');
const profileBtn = document.querySelector('.profile-button');
const skillsBtn = document.querySelector('.skills-button');
const projectsBtn = document.querySelector('.projects-button');
const contactBtn = document.querySelector('.contact-button');
const profile = document.querySelector('.profile-page');
const skills = document.querySelector('.skills-page');
const projects = document.querySelector('.projects-page');
const contact = document.querySelector('.contact-page');
const crightBtn = document.querySelector('.cright-button');
const cleftBtn = document.querySelector('.cleft-button');
const proleftBtn = document.querySelector('.proleft-button');
const srightBtn = document.querySelector('.sright-button');
const pleftBtn = document.querySelector('.pleft-button');
const conrightBtn = document.querySelector('.conright-button')
const leftBtn = document.querySelector('.left-button button');
const rightBtn = document.querySelector('.right-button button');
// Detect screen width on load for responsive behavior
let currentWidth = window.innerWidth;
let wasMobile = currentWidth <= 1024;
let wasSmallest = currentWidth <= 400;

// Reload page if screen size changes category (mobile to desktop or vice versa)
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const isMobile = newWidth <= 1024;
  const isSmallest = newWidth <= 400;
  if (isMobile !== wasMobile || isSmallest !== wasSmallest) {
    location.reload();
  }

  wasMobile = isMobile;
  wasSmallest = isSmallest;
});
// Utility functions for managing animation classes
function showPages(...pages) {
      pages.forEach(p => p.classList.add('flip'));
}
function flipPages(...pages) {
      pages.forEach(p => p.classList.add('flipped'));
}
function foldPage(...pages){
      pages.forEach(p => p.classList.add('fold'));
}
function showf(...pages){
      pages.forEach(p => p.classList.add('f'));
}
function hidePages(...pages) {
      pages.forEach(p=> p.classList.remove('flip'))
}
function flipBackPages(...pages) {
      pages.forEach(p => p.classList.remove('flipped'));
}

function removeFold(...pages){
      pages.forEach(p=> p.classList.remove('fold'));
}
function removeF(...pages){
      pages.forEach(p => p.classList.remove('f'));
}
// Event listeners for desktop (>1024px)
if(window.innerWidth > 1024) {
      // Opening the book
      crightBtn.addEventListener('click', () => {
            coverLeft.classList.add('flip');
            coverRight.classList.add('flip');
            cover.classList.add('flip');
            showPages(content);
      });
      // Navigate forward through sections
      conrightBtn.addEventListener('click',() =>{
            coverLeft.classList.add('inactive');
            flipPages(content);
            showPages(profile,skills);
      });
      // Navigate forward through sections
      srightBtn.addEventListener('click', () => {
            flipPages(profile,skills);
            showPages(projects,contact);
      });
      // Return to cover
      cleftBtn.addEventListener('click',() => {
            hidePages(content);
            cover.classList.remove('flip');
            coverLeft.classList.remove('flip');
            coverRight.classList.remove('flip');
      });
      // Navigate backward through sections
      proleftBtn.addEventListener('click', () => {
            coverLeft.classList.remove('inactive');
            flipBackPages(content);
            hidePages(profile,skills);
            showf(skills);
            foldPage(profile,content);
      setTimeout(() => {
            removeF(skills);
            removeFold(profile,content);
      }, 1000);
      });
      // Navigate backward through sections
      pleftBtn.addEventListener('click', () => {
            flipBackPages(profile,skills);
            hidePages(projects,contact);
            foldPage(skills,projects,contact);
      setTimeout(() => {
            removeFold(skills,projects,contact);
      }, 1000); 
      });
      
      // Navigation using content buttons
      profileBtn.addEventListener('click', () => {
            coverLeft.classList.add('inactive');
            flipPages(content);
            showPages(profile, skills);
      });
      skillsBtn.addEventListener('click', () => {
            coverLeft.classList.add('inactive');
            flipPages(content);
            showPages(profile,skills);
      });
      projectsBtn.addEventListener('click', () => {
            coverLeft.classList.add('inactive');
            flipPages(content,profile,skills);
            showPages(profile,skills,projects,contact);
      });
      contactBtn.addEventListener('click', () => {
            coverLeft.classList.add('inactive');
            flipPages(content,profile,skills);
            showPages(profile,skills,projects,contact);
      });   
}
// Mobile view
else if(window.innerWidth <= 1024) {
      const pages = document.querySelectorAll(".page");
      // Dynamically add left/right nav buttons
  pages.forEach((page) => {
    const hasLeft = page.querySelector("button.left-button");
    const hasRight = page.querySelector("button.right-button");
    const isProfile = page.classList.contains("profile-page");
    const isSkills = page.classList.contains("skills-page");
    const isProjects = page.classList.contains("projects-page");
    const isContact = page.classList.contains("contact-page");
    const isContent = page.classList.contains("content-page");
    // Left buttons
    if (!hasLeft) {
      const leftBtn = document.createElement("button");
      leftBtn.classList.add("left-button");
      const leftImg = document.createElement("img");
      leftImg.src = "left.png";
      leftImg.alt = "Left";
      leftImg.style.width = "20px";
      leftImg.style.height = "20px";
      leftBtn.appendChild(leftImg);
      page.appendChild(leftBtn);
      leftBtn.style.gridColumn="1/2";
      leftBtn.style.gridRow="3/4";
      if (isContent){
            leftBtn.addEventListener('click',() => {
                  hidePages(content);
                  cover.classList.remove('flip');
            });
      }
      else if (isSkills){
            leftBtn.addEventListener('click',() => {
                  hidePages(skills);
                  flipBackPages(profile);
                  showf(skills);
                  foldPage(profile);
            setTimeout(() => {
                  removeF(skills);
                  removeFold(profile);
            }, 1000); 
            });
      }
      else if (isContact){
            leftBtn.addEventListener('click',() => {
                  hidePages(contact);
                  flipBackPages(projects);
                  showf(contact);
                  foldPage(projects);
            setTimeout(() => {
                  removeF(contact);
                  removeFold(projects);
            }, 1000); 
            });
      }
    }
    // Right buttons
    if (!isContact && !hasRight){
            const rightBtn = document.createElement("button");
            rightBtn.classList.add("right-button");
            const rightImg = document.createElement("img");
            rightImg.src = "right.png";
            rightImg.alt = "Right";
            rightImg.style.width = "20px";
            rightImg.style.height = "20px";
            rightBtn.appendChild(rightImg);
            page.appendChild(rightBtn);
            rightBtn.style.gridColumn ="3/4";
            rightBtn.style.gridRow="3/4";
            if (isProfile){
                  rightBtn.addEventListener('click',() => {
                        flipPages(profile);
                        showPages(skills);
                  });
            }
            else if (isProjects){
                  rightBtn.addEventListener('click',() => {
                        flipPages(projects);
                        showPages(contact);
                  });
            }
      }
});
      // Main right button opens the book
      crightBtn.addEventListener('click', () => {
            cover.classList.add('flip');
            showPages(content);
      });
      // Navigation handlers for content buttons
      conrightBtn.addEventListener('click',() =>{
            flipPages(content);
            showPages(profile);
      });
      srightBtn.addEventListener('click', () => {
            flipPages(skills);
            showPages(projects);
      });
      pleftBtn.addEventListener('click', () => {
            hidePages(projects);
            flipBackPages(skills);
            showf(projects);
            foldPage(skills);
            setTimeout(() => {
                  removeF(projects);
                  removeFold(skills);
            }, 1000); 
      });
      proleftBtn.addEventListener('click', () => {
            hidePages(profile);
            flipBackPages(content);
            showf(profile);
            foldPage(content);

            setTimeout(() => {
                  removeF(profile);
                  removeFold(content);
            }, 1000);
      });
      // Main nav buttons
      profileBtn.addEventListener('click', () => {
            flipPages(content);
            showPages(profile);
      });
      skillsBtn.addEventListener('click', () => {
            flipPages(content,profile);
            showPages(profile,skills);
      });
      projectsBtn.addEventListener('click', () => {
            flipPages(content,profile,skills);
            showPages(profile,skills,projects);
      });
      contactBtn.addEventListener('click', () => {
            flipPages(content,profile,skills,projects);
            showPages(profile,skills,projects,contact);
      });
}