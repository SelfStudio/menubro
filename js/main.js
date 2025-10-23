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
  
  // 获取App Store版本信息
  fetchAppStoreVersion()
})

// 获取App Store版本信息 - 使用JSONP方式避免CORS问题
function fetchAppStoreVersion() {
  // 创建script标签
  const script = document.createElement('script')
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random())
  
  // 设置全局回调函数
  window[callbackName] = function(data) {
    try {
      if (data.results && data.results.length > 0) {
        const appInfo = data.results[0]
        const versionInfoElement = document.querySelector('.version-info')
        
        if (versionInfoElement) {
          // 格式化日期
          const releaseDate = new Date(appInfo.currentVersionReleaseDate || appInfo.releaseDate)
          const formattedDate = releaseDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
          
          versionInfoElement.innerHTML = `Current Version: ${appInfo.version} | Release Date: ${formattedDate}`
        }
      }
    } catch (error) {
      console.error('Failed to process App Store version info:', error)
    } finally {
      // 清理
      document.head.removeChild(script)
      delete window[callbackName]
    }
  }
  
  // 设置script标签的src属性
  script.src = `https://itunes.apple.com/lookup?id=6745024185&callback=${callbackName}`
  script.onerror = function() {
    console.error('Failed to fetch App Store version info')
    // 清理
    document.head.removeChild(script)
    delete window[callbackName]
  }
  
  // 添加script标签到页面
  document.head.appendChild(script)
}

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