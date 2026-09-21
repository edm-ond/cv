document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       THEME TOGGLE (DARK/LIGHT MODE)
    ========================================= */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector(".theme-icon");
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            htmlElement.setAttribute("data-theme", "dark");
            updateThemeIcon("dark");
        }
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            // Sun icon for dark mode (to switch back to light)
            themeIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        } else {
            // Moon icon for light mode (to switch to dark)
            themeIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        }
    }


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