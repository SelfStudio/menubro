// MenuBro Website JavaScript

// 全局变量，用于轮播
let slideIndex = 1

document.addEventListener("DOMContentLoaded", function () {
  // 初始化轮播
  showSlides(slideIndex)

  // 自动轮播
  setInterval(function () {
    plusSlides(1)
  }, 5000) // 每5秒切换一次

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })

  // Check for dark mode preference
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")

  // Function to update theme based on system preference
  function updateTheme(e) {
    if (e.matches) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }

  // Initial check
  updateTheme(prefersDarkMode)

  // Listen for changes
  prefersDarkMode.addEventListener("change", updateTheme)
})

// 下一张/上一张幻灯片
function plusSlides(n) {
  showSlides((slideIndex += n))
}

// 控制当前幻灯片
function currentSlide(n) {
  showSlides((slideIndex = n))
}

// 显示幻灯片
function showSlides(n) {
  let i
  let slides = document.getElementsByClassName("slide")
  let dots = document.getElementsByClassName("dot")

  // 处理边界情况
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // 隐藏所有幻灯片
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
    slides[i].classList.remove("active")
  }

  // 移除所有导航点的激活状态
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active")
  }

  // 显示当前幻灯片和激活对应的导航点
  slides[slideIndex - 1].style.display = "block"
  slides[slideIndex - 1].classList.add("active")
  dots[slideIndex - 1].classList.add("active")
}
