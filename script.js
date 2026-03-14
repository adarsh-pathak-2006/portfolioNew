// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------
// 1. ANIMATED MESH GRADIENT BACKGROUND
// -------------------------------------------------------
const blobs = document.querySelectorAll('.gradient-blob');

blobs.forEach((blob) => {
  // Define the animation function
  function moveBlob() {
    gsap.to(blob, {
      duration: "random(20, 40)", // Random time between 20s and 40s
      x: "random(-400, 400)",     // Random X translation
      y: "random(-400, 400)",     // Random Y translation
      scale: "random(0.8, 1.2)",  // Random Scale
      rotation: "random(-180, 180)", // Random Rotation
      ease: "none",               // Linear smooth movement
      onComplete: moveBlob        // Repeat indefinitely
    });
  }
  
  // Start the loop
  moveBlob();
});


// -------------------------------------------------------
// 2. CUSTOM CURSOR
// -------------------------------------------------------
const cursor = document.getElementById('cursor');
const hoverables = document.querySelectorAll('a, button, .skill-card, .project-card, .btn');

// Only run cursor logic on desktop
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener('mousemove', e => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15, 
      ease: "power2.out"
    });
  });

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
} else {
  if(cursor) cursor.style.display = 'none';
}

// -------------------------------------------------------
// 3. MAGNETIC EFFECT
// -------------------------------------------------------
const magneticItems = document.querySelectorAll('.magnetic-wrap');
magneticItems.forEach(item => {
  const inner = item.querySelector('button, a, i');
  if (!inner) return;

  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(inner, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(inner, {
      x: 0, y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
});

// -------------------------------------------------------
// 4. MENU TOGGLE
// -------------------------------------------------------
const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('overlay');
const overlayLinks = document.querySelectorAll('.overlay-menu a');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  overlay.classList.toggle('open');
  
  if(menuOpen) {
    menuBtn.querySelector('.menu-text').textContent = "Close";
    gsap.fromTo(overlayLinks, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  } else {
    menuBtn.querySelector('.menu-text').textContent = "Menu";
  }
});

overlayLinks.forEach(link => {
  link.addEventListener('click', () => {
    overlay.classList.remove('open');
    menuBtn.querySelector('.menu-text').textContent = "Menu";
    menuOpen = false;
  });
});

// -------------------------------------------------------
// 5. TYPED EFFECT
// -------------------------------------------------------
const typedStrings = ["Developer", "Creator", "Problem Solver"];
let typeIndex = 0;
const typedEl = document.getElementById('typed-text');

function typeText() {
  if(!typedEl) return;
  const currentStr = typedStrings[typeIndex];
  let charIndex = 0;
  typedEl.textContent = '';
  
  const typing = setInterval(() => {
    typedEl.textContent += currentStr[charIndex];
    charIndex++;
    if(charIndex === currentStr.length) {
      clearInterval(typing);
      setTimeout(eraseText, 2000);
    }
  }, 100);
}

function eraseText() {
  if(!typedEl) return;
  const erase = setInterval(() => {
    typedEl.textContent = typedEl.textContent.substring(0, typedEl.textContent.length - 1);
    if(typedEl.textContent.length === 0) {
      clearInterval(erase);
      typeIndex = (typeIndex + 1) % typedStrings.length;
      typeText();
    }
  }, 50);
}
if(typedEl) typeText();

// -------------------------------------------------------
// 6. HORIZONTAL SCROLL LOGIC
// -------------------------------------------------------
ScrollTrigger.matchMedia({
  "(min-width: 901px)": function() {
    const container = document.getElementById('projContainer');
    const wrapper = document.getElementById('scrollWrapper');
    
    let scrollWidth = container.scrollWidth - window.innerWidth;
    scrollWidth = Math.max(0, scrollWidth);
    
    gsap.to(container, {
      x: () => -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  },
  "(max-width: 900px)": function() {
    gsap.set("#projContainer", { clearProps: "all" });
  }
});

// -------------------------------------------------------
// 7. REVEAL ANIMATIONS
// -------------------------------------------------------
gsap.utils.toArray('.section-title, .about-text, .about-stats, .skill-card, .contact-form, .contact-info').forEach(elem => {
  gsap.from(elem, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});
