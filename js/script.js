const navLinks = document.querySelectorAll("header nav a");
const logoLinks = document.querySelector(".logo-nama");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");
const loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  loader.style.display = "none";
  document.querySelector(".logo-nama").classList.add("popup");
  // preloader.classList.add("hidden");
});

// window.addEventListener("load", () => {
//   const preloader = document.getElementById("preloader");
//   preloader.classList.add("hidden"); // Tambahkan class untuk menyembunyikan preloader
// });

//toggle menu untuk mobile
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

const activePage = () => {
  const header = document.querySelector("header");

  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 500);
  8;

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

navLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      activePage();
      link.classList.add("active");

      setTimeout(() => {
        sections[idx].classList.add("active");
      });
    }
  });
});

logoLinks.addEventListener("click", () => {
  if (!navLinks[0].classList.contains("active")) {
    activePage();
    navLinks[0].classList.add("active");

    setTimeout(() => {
      sections[0].classList.add("active");
    });
  }
});

const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});

//create arrow button
const arrowRight = document.querySelector(
  ".portfolio-box .navigation-img .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation-img .arrow-left"
);

let index = 0;

arrowLeft.classList.add("disable");

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll(".portfolio-detail");
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < 3) {
    index++;
    arrowLeft.classList.remove("disable");
  } else {
    index = 4;
    arrowRight.classList.add("disable");
  }
  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disable");
  } else {
    index = 0;
    arrowLeft.classList.add("disable");
  }
  activePortfolio();
});

document
  .querySelectorAll(".services-box .icon .bx-arrow-back")
  .forEach((arrow) => {
    arrow.addEventListener("click", (event) => {
      event.preventDefault();

      activePage(); // Reset halaman
      navLinks[4].classList.add("active"); // Tambahkan class "active" ke "Contact"

      setTimeout(() => {
        sections[4].classList.add("active"); // Tampilkan section "Contact"
      });
    });
  });

// menangani pengiriman form contact
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        window.location.href = "/pages/thanks.html";
        form.reset();
      } else {
        status.innerHTML = "❌ Error sending message. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.innerHTML = "❌ Network error. Please check your connection.";
      status.style.color = "red";
    }
  });
});
