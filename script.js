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
