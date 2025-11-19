document.getElementById("mobile-btn").addEventListener("click", function () {
  document.getElementById("mobile-menu").style.display =
    document.getElementById("mobile-menu").style.display === "block"
      ? "none"
      : "block";
});
const slider = document.querySelector(".brands-slider");
if (slider) {
  slider.addEventListener("mouseenter", () => {
    document.querySelectorAll(".brand-item").forEach((item) => {
      item.style.animationPlayState = "paused";
    });
    slider.style.animationPlayState = "paused";
  });
  slider.addEventListener("mouseleave", () => {
    document.querySelectorAll(".brand-item").forEach((item) => {
      item.style.animationPlayState = "running";
    });
    slider.style.animationPlayState = "running";
  });
}

// شمارنده خودکار
const counters = document.querySelectorAll(".stat-number");
const options = { threshold: 0.7 };

const startCounter = (entry) => {
  if (entry.isIntersecting) {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (target === 24) {
            counter.textContent = "۲۴/";
          } else if (target > 100) {
            counter.textContent =
              Math.ceil(current) + (target >= 1000 ? "+" : "");
          } else {
            counter.textContent = Math.ceil(current);
          }
          setTimeout(updateCounter, 20);
        } else {
          if (target >= 1000) counter.textContent = target + "+";
          else if (target === 24) counter.textContent = "۲۴/";
          else counter.textContent = target;
        }
      };
      updateCounter();
    });
    observer.unobserve(entry.target);
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(startCounter);
}, options);

observer.observe(document.querySelector(".stats-section"));

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".stat-number");
  const options = { threshold: 0.5 };
  let counted = false;

  const startCounting = () => {
    if (counted) return;
    counted = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let count = 0;
      const increment = target / 80; // سرعت شمارش

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          clearInterval(timer);
          if (target === 1200 || target === 850) {
            counter.innerHTML = target + "<span>+</span>";
          } else if (target === 24) {
            counter.innerHTML = "۲۴<span>/۷</span>";
          } else {
            counter.textContent = target;
          }
        } else {
          if (target === 24) {
            counter.innerHTML = "۲۴<span>/۷</span>";
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(count);
          }
        }
      }, 25);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  }, options);

  observer.observe(document.querySelector(".stats-section"));
});
