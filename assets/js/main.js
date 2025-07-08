/* OTHER ELEMENTS */
const app = document.querySelector("app")
const qSearchInput = document.querySelector("input.search")

/* MODALS */
const modal = document.querySelector(".modal")
const modalContents = document.querySelectorAll(".modal_content")
const modalContentWrap = document.querySelector(".modal_wrapper")
const modalClose = document.querySelector(".modal--close")

/* TRIGGERS */
const themeSwitcherTrigger = document.querySelector("#themeSwitcher")
const modalThemeSwitcher = document.querySelector(".themeSwitcher_body")

const modalSearchTrigger = document.querySelector(".search--icon")
const modalSearch = document.querySelector(".modal.search_body")

/* CHECKERS */
const isWindows = navigator.userAgentData.platform === "Windows"
const isMac = () => {
  const macPlatform = navigator.userAgentData.platform
  return macPlatform.toLowerCase().includes("mac")
}
/*


*/
// Add close icon in bulk to modals
const modalCloseIcon = `<svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon modal--close lucide-circle-x">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>`
modalContents.forEach((modalContent) => {
  modalContent.insertAdjacentHTML("afterbegin", modalCloseIcon)
})

/* THEMESWITCHER TRIGGER */
themeSwitcherTrigger.addEventListener("click", (e) => {
  app.style.filter = "blur(4px)"
  modalThemeSwitcher.style.display = "block" // show modal
  modalContentWrap.classList.remove("slide-out")
  requestAnimationFrame(() => {
    // Spusť tento kód, až budeš připraven vykreslovat další snímek. Zajistí, že se změny ve třídách (např. pro animace) skutečně vykreslí správně s přechody.

    modalThemeSwitcher.classList.remove("hide")
    modalThemeSwitcher.classList.add("show")
  })
})

/* SEARCH TRIGGER */
modalSearchTrigger.addEventListener("click", (e) => {
  modalSearch.style.display = "block" // show modal
  modalContentWrap.classList.remove("slide-out")
  requestAnimationFrame(() => {
    modalSearch.classList.remove("hide")
    modalSearch.classList.add("show")
  })
})

// CLOSE A MODAL
document.addEventListener("click", (e) => {
  const _modalCloseIcon = e.target.closest(".modal--close")
  const modal = e.target.closest(".modal")

  if (!modal) return // Fix lỗi console, khi modal chưa đc khởi tạo
  const modalContent = modal.querySelector(".modal_content")

  // Nếu ấn vào element của modalContent kết thúc hàm, ko làm gì nữa
  if (modalContent.contains(e.target) && !_modalCloseIcon) return

  const modalWrapper = modal.querySelector(".modal_wrapper")

  //console.log("close:", modal);

  // Animation
  app.style.removeProperty("filter")
  modalWrapper.classList.add("slide-out")
  modal.classList.remove("show")
  modal.classList.add("hide")

  // Fade out and cleanup
  setTimeout(() => {
    //console.log("zavřeno");
    modal.style.display = "none"
    modal.classList.remove("hide")
    modalWrapper.classList.remove("slide-out")
  }, 1000)
})

// SHORTCUTS
// Search input placeholder
if (isWindows) {
  qSearchInput.placeholder = "Search (CTRL + K)..."
} else if (isMac()) {
  qSearchInput.placeholder = "Search (CMD + K)..."
}

document.addEventListener("keydown", (e) => {
  //console.log(e.key)
  const pressed =
    (e.ctrlKey && e.key.toLowerCase() === "k") ||
    (e.metaKey && e.key.toLowerCase() === "k")

  if (pressed) {
    e.preventDefault()
    qSearchInput.focus()
    const _qSearchInput = (qSearchInput.style.boxShadow = "var(--box-shadow)")
  }
})

setTimeout(() => {
  qSearchInput.addEventListener("blur", () => {
    qSearchInput.style.removeProperty("box-shadow")
  })
}, 300)

/*
 **************
 * FUNCTIONS  *
 **************
 */
// Search

// AJAX các bài tập
const menuItems = document.querySelectorAll(".menu_item")
const ajaxContent = document.querySelector(".ajax-content")
const tabHome = document.querySelector("#home")
const mainContentDefault = document.querySelector(".main_content--default")

/* 
tabToDo.addEventListener("click", () => {
  if (tabToDo.classList.contains("onhover")) {
    console.log("Load r")
    return
  } else {
    // on click hide the default content
    mainContentDefault.classList.add("hidden")
    // COPY trên mạng ạ
    fetch("to-do.html")
      .then((response) => {
        if (!response.ok) throw new Error("Ko thể load file html")
        return response.text()
      })
      .then((html) => {
        const main = document.querySelector(".ajax-content")
        main.insertAdjacentHTML("beforeend", html)

        // Để có thể chạy file .js, nếu ko nó chỉ inject vào DOM mà không đc chạy
        const script = document.createElement("script")
        script.src = "./assets/js/to-do.js"
        script.onload = () => console.log("to-do.js is run")
        document.body.appendChild(script)
      })
      .catch((error) => {
        console.error("Error on loading:", error)
      })
  }
}) */

function ajaxPageContent(item) {
  /*
  - Mỗi bài tập e chia ra thành separate PAGES và chỉ load content của chính nó (HTML, JS) mà ko phải lặp lại GLOBAL content của web.
  - Các files [id]html, [id].js của từng bài tập e đặt tên = với id của từng menu_item để dễ quản lý & sử lý code.
  - Đoạn fetch e copy trên mạng và tối ưu lại để ko lặp lại code cho mỗi menu_item khi đc clicked và action phải thực thi.
  */
  return fetch(`${item.id}.html`) // ID name should be same as .js files names
    .then((response) => {
      if (!response.ok) throw new Error(`Ko thể load file html: ${item.id}.js`)
      return response.text()
    })
    .then((html) => {
      const main = document.querySelector(".ajax-content")
      main.insertAdjacentHTML("beforeend", html)
      const currentPageContent = document.querySelectorAll("article")

      // Để có thể chạy file .js, nếu ko nó chỉ inject vào DOM mà ko đc call
      const script = document.createElement("script")
      script.src = `./assets/js/${item.id}.js`
      script.onload = () => console.log(`${item.id}.js is run`)
      document.body.appendChild(script)
    })
    .catch((error) => {
      console.error("Error on loading:", error)
    })
}

menuItems.forEach((item) => {
  item.onclick = () => {
    if (
      item.classList.contains("onhover") ||
      ajaxContent.classList.contains(`${item.id}`)
    ) {
      console.log(`${item.id}.js already loaded`)

      return
    }

    // When click - remove onhover class of every item element ò menuItems
    menuItems.forEach((item) => {
      item.classList.remove("onhover")
      ajaxContent.classList.remove("hidden")
    })
    item.classList.add("onhover") // Thanks to item.onclick add onhover only on clicked item
    ajaxContent.setAttribute("data-set", item.id)

    // In case mainContentDefault not exists
    if (mainContentDefault) {
      mainContentDefault.classList.add("hidden")
    }

    // Run the page content - load by ajax
    ajaxPageContent(item)
  }
})

tabHome.addEventListener("click", () => {
  mainContentDefault.classList.remove("hidden")
  ajaxContent.innerHTML = "" // Chỉ để xoá content nên ko sợ XSS phải ko ạ?
})
