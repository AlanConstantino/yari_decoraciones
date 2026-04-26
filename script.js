/* ============================================================
   Yari Decorations - Main JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Dynamic copyright year ---------- */
  document.getElementById("copyrightYear").textContent =
    new Date().getFullYear();

  /* ---------- Smooth scrolling for all anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href").slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      var navbarHeight = document.getElementById("navbar").offsetHeight;
      var targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });

      // Close mobile menu if open
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  /* ---------- Navbar style on scroll ---------- */
  var navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinkElements = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < bottom) {
        navLinkElements.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  /* ---------- Gallery carousel ---------- */
  var carousel = document.getElementById("galleryCarousel");
  if (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = carousel.querySelectorAll(".carousel-slide");
    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    var dotsContainer = carousel.querySelector(".carousel-dots");
    var currentSlide = 0;
    var totalSlides = slides.length;
    var autoplayTimer;

    // Build dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Slide " + (i + 1));
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
    var dots = dotsContainer.querySelectorAll(".carousel-dot");

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
      dots.forEach(function (d) { d.classList.remove("active"); });
      dots[currentSlide].classList.add("active");
    }

    prevBtn.addEventListener("click", function () {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener("click", function () {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });

    dotsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("carousel-dot")) {
        goToSlide(parseInt(e.target.dataset.index));
        resetAutoplay();
      }
    });

    // Touch/swipe support
    var touchStartX = 0;

    carousel.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (diff > 40) {
        goToSlide(currentSlide + 1);
        resetAutoplay();
      } else if (diff < -40) {
        goToSlide(currentSlide - 1);
        resetAutoplay();
      }
    });

    // Autoplay
    function startAutoplay() {
      autoplayTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    startAutoplay();
  }

  /* ---------- Scroll animations with IntersectionObserver ---------- */
  var animatedElements = document.querySelectorAll(".animate-on-scroll");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach(function (el) {
      el.classList.add("animated");
    });
  }
})();
