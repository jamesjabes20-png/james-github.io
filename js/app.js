document.addEventListener("DOMContentLoaded", () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = mobileBtn.querySelector("i");
        if(navLinks.classList.contains("active")){
            icon.classList.remove("ph-list");
            icon.classList.add("ph-x");
        } else {
            icon.classList.remove("ph-x");
            icon.classList.add("ph-list");
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileBtn.querySelector("i").classList.remove("ph-x");
            mobileBtn.querySelector("i").classList.add("ph-list");
        });
    });

    // Contact Form Logic
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button[type='submit']");
        const originalText = btn.innerHTML;
        btn.innerHTML = "Enviando...";
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            contactForm.reset();
            formMessage.style.display = "block";
            formMessage.style.color = "var(--sage-green-dark)";
            formMessage.innerHTML = "¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.";
            
            setTimeout(() => {
                formMessage.style.display = "none";
            }, 5000);
        }, 1500);
    });

    // Animations with GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Number Counter Animation
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute("data-target");
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = "+" + Math.round(this.targets()[0].innerHTML);
                    }
                });
            }
        });
    });

    // General Reveal Animations
    function animateFrom(elem, direction) {
        direction = direction || 1;
        let x = 0, y = direction * 100;
        
        if(elem.classList.contains("gs_left")) {
            x = -100;
            y = 0;
        } else if(elem.classList.contains("gs_right")) {
            x = 100;
            y = 0;
        } else if(elem.classList.contains("gs_reveal_up")) {
            x = 0;
            y = 50;
        }

        elem.style.transform = `translate(${x}px, ${y}px)`;
        elem.style.opacity = "0";

        gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
            duration: 1.25, 
            x: 0,
            y: 0, 
            autoAlpha: 1, 
            ease: "expo", 
            overwrite: "auto"
        });
    }

    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }

    // Apply Reveal Animations
    gsap.utils.toArray(".gs_reveal, .gs_reveal_up").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view
        
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%", // Trigger when element's top hits 85% of viewport height
            once: true,
            onEnter: function() { animateFrom(elem) }
        });
    });
});
