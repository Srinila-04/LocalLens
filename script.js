// Wait for the DOM content to fully load before executing scripts
document.addEventListener("DOMContentLoaded", function () {

  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 1. Mobile Menu Toggle
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");

  // Toggle mobile navigation menu
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu when a navigation link is clicked
    navLinkItems.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu when clicking outside the navbar
    document.addEventListener("click", function (event) {
      const isClickInside = navLinks.contains(event.target) || menuButton.contains(event.target);
      if (!isClickInside && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Sticky Header on Scroll
  const header = document.getElementById("header");

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  // 3. Category Filter for Destination Cards
  const categoryButtons = document.querySelectorAll(".category-btn");
  const destinationCards = document.querySelectorAll(".destination-card");

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // 1. Update active button styling
      categoryButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      // 2. Get selected category name
      const selectedCategory = button.getAttribute("data-category");

      // 3. Show or hide destination cards
      destinationCards.forEach(function (card) {
        const cardCategories = card.getAttribute("data-category") || "";

        if (selectedCategory === "all" || cardCategories.includes(selectedCategory)) {
          card.classList.remove("hidden");
          // Re-trigger subtle reveal animation
          card.classList.add("active");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 4. Highlight Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");

  function highlightCurrentSection() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinkItems.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightCurrentSection);

  // 5. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add("active");
    });
  }

 });
