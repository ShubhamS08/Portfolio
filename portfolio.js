// active hamburger menu 

let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});




// remove navlist
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code 

let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char, i) =>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");





// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});





// portfolio fillter 

// var mixer = mixitup('.portfolio-gallery', {
//     selectors: {
//         target: '.portfolio-box'
//     },
//     animation: {
//         duration: 500
//     }
// });




// circle skill ///////////////////////////////////////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;


    for(let i = 0; i < dots; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i<percent; i++){
        pointsMarked[i].classList.add('marked')
    }
});





//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed)
        skillsCounter();
})


function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12)
    }
}


let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}









// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);




// scroll reveal

ScrollReveal({
    distance: "90px",
    duration: 2000,
    delay: 200,
    reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info,.A,.skills', { origin: "left" });
// ScrollReveal().reveal('.A', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.projects-gallery,.blog-box,footer,.img-hero,.contact', { origin: "bottom" });

// =================== email js ==============
const contactForm = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    // ServiceID - templateID - #form - publicKey
    emailjs.sendForm('service_x5v44ps', 'template_p87r1ng', '#contact-form', '9Ni_N4aLfkbzAe3UU')
        .then(() =>{
            // Show send Message
            contactMessage.textContent = 'Message send successfully ✅'
            setTimeout(() =>{
                contactMessage.textContent = ''
            }, 5000)

            contactForm.reset()

        }, () =>{
            // Show Error Message
            contactMessage.textContent = 'Message not send (service error) ❌'
        });
}

contactForm.addEventListener('submit',  sendEmail)