document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const website = document.getElementById("website");
  const container = document.querySelector(".text-container");

  if (container) {
    const text = window.innerWidth < 480 ? "LOADING..." : "LOADING.....";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char;
      span.style.animationDelay = `${index * 0.15}s`;
      container.appendChild(span);
    });

    setTimeout(() => {
      loader?.classList.add("fade-out");

      setTimeout(() => {
        if (loader) loader.style.display = "none";
        website?.classList.remove("d-none");
      }, 1000);
    }, 2800);
  }
  const carouselEl = document.querySelector("#heroCarousel");
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: "carousel",
      pause: false,
      wrap: true
    });
  }
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.25 }
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach(el => revealObserver.observe(el));

  const skillsSection = document.querySelector(".skills-section");
  let skillsAnimated = false;

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;

            // Animate bars
            document.querySelectorAll(".skill-progress").forEach(bar => {
              const value = bar.dataset.progress;
              bar.style.width = value + "%";
            });

            // Animate counters
            document.querySelectorAll(".skill-percent").forEach(counter => {
              const target = +counter.dataset.target;
              let current = 0;

              const step = () => {
                if (current < target) {
                  current++;
                  counter.textContent = current + "%";
                  requestAnimationFrame(step);
                }
              };
              step();
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    skillsObserver.observe(skillsSection);
  }

});
const statsSection = document.querySelector(".stats-section");
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;

          document.querySelectorAll(".stat-number").forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;

            const step = () => {
              if (current < target) {
                current += Math.ceil(target / 80);
                if (current > target) current = target;
                counter.textContent = current;
                requestAnimationFrame(step);
              }
            };
            step();
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  statsObserver.observe(statsSection);
}
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.25 }
);

revealElements.forEach(el => revealObserver.observe(el));

const testimonialCarouselEl = document.querySelector("#testimonialCarousel");

if (testimonialCarouselEl) {
  const carousel = new bootstrap.Carousel(testimonialCarouselEl, {
    interval: 5000,
    pause: false,
    ride: "carousel",
    wrap: true
  });
  testimonialCarouselEl.addEventListener("mouseenter", () => carousel.pause());
  testimonialCarouselEl.addEventListener("mouseleave", () => carousel.cycle());
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") carousel.next();
    if (e.key === "ArrowLeft") carousel.prev();
  });
}

