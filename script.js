document.addEventListener("DOMContentLoaded", () => {
    


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */
    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.textContent = isOpen ? "✕" : "☰";
        });

        // Close menu when clicking navigation links
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }


    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */
    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a:not(.nav-download-btn)");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.id;
                
                navigationLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentSection}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: "-10% 0px -50% 0px"
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       CONTACT FORM VALIDATION
    ========================================= */
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        // Clear a field's error state as soon as the user edits it
        contactForm.querySelectorAll("input, textarea").forEach(field => {
            field.addEventListener("input", () => {
                field.parentElement.classList.remove("error");
            });
        });

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById("name");
            const nameGroup = nameInput.parentElement;
            if (!nameInput.value.trim()) {
                nameGroup.classList.add("error");
                isValid = false;
            } else {
                nameGroup.classList.remove("error");
            }
            
            // Validate Email
            const emailInput = document.getElementById("email");
            const emailGroup = emailInput.parentElement;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                emailGroup.classList.add("error");
                isValid = false;
            } else {
                emailGroup.classList.remove("error");
            }
            
            // Validate Message
            const messageInput = document.getElementById("message");
            const messageGroup = messageInput.parentElement;
            if (!messageInput.value.trim()) {
                messageGroup.classList.add("error");
                isValid = false;
            } else {
                messageGroup.classList.remove("error");
            }
            
            const formStatus = document.getElementById("form-status");
            
            if (isValid) {
                // Simulate form submission
                formStatus.textContent = "Sending message...";
                formStatus.className = "form-status";
                
                // Simulate network request
                setTimeout(() => {
                    formStatus.textContent = "Message sent successfully! (Simulated)";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);
                }, 1500);
            } else {
                formStatus.textContent = "Please fix the errors in the form.";
                formStatus.className = "form-status error";
            }
        });
    }

    /* =========================================
       DYNAMIC FOOTER YEAR
    ========================================= */
    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = `&copy; ${currentYear} Edmond Otieno. All Rights Reserved.`;
    }

    /* =========================================
       KEYBOARD ACCESSIBILITY FOR MOBILE MENU
    ========================================= */
    if (menuButton && navLinks) {
        menuButton.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
                menuButton.focus();
            }
        });
    }

    console.log("Edmond Otieno | Premium Portfolio Loaded Successfully.");
});