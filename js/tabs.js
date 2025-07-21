// Globální proměnné pro uložení stavu každého containeru
let containerStates = {
  tabs1: "home",
  tabs2: "dashboard",
}

// Počkej, až se elementy načtou do DOM
function waitForElements(callback) {
  let checkInterval = setInterval(function () {
    let containers = document.querySelectorAll("[data-container]")

    if (containers.length > 0) {
      clearInterval(checkInterval)
      console.log("Tabs elementy nalezeny, inicializuji...")
      callback()
    }
  }, 50) // Check check check :D

  // After 5sec kill the checking
  setTimeout(function () {
    clearInterval(checkInterval)
    console.log("Timeout - tabs elementy nenalezeny")
  }, 5000)
}

// Načtení stavu z URL při načtení stránky
function loadStateFromURL() {
  let params = new URLSearchParams(window.location.search)
  console.log(params)

  let containers = ["tabs1", "tabs2"]
  for (let i = 0; i < containers.length; i++) {
    let containerName = containers[i]
    let tabFromURL = params.get(containerName)

    if (tabFromURL) {
      containerStates[containerName] = tabFromURL
    }
  }
}

// Aktualizace URL s aktuálním stavem
function updateURL() {
  let params = new URLSearchParams()

  for (let containerName in containerStates) {
    params.set(containerName, containerStates[containerName])
  }

  let newURL = window.location.pathname + "?" + params.toString()
  window.history.pushState({}, "", newURL)

  updateURLDisplay()
}

// Aktualizace zobrazení aktuální URL
function updateURLDisplay() {
  let currentUrlElement = document.getElementById("current-url")
  if (currentUrlElement) {
    currentUrlElement.textContent = window.location.search
  }

  for (let containerName in containerStates) {
    let displayElement = document.getElementById(containerName + "-current")
    if (displayElement) {
      displayElement.textContent = containerStates[containerName]
    }
  }
}

// Přepnutí záložky v konkrétním containeru
function switchTab(containerName, newTabName) {
  let container = document.querySelector(
    '[data-container="' + containerName + '"]'
  )
  if (!container) {
    console.log("Container " + containerName + " nenalezen!")
    return
  }

  let buttons = container.querySelectorAll(".tab-button")
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active")
  }

  let panels = container.querySelectorAll(".tab-panel")
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.remove("active")
  }

  let newButton = container.querySelector('[data-tab="' + newTabName + '"]')
  if (newButton) {
    newButton.classList.add("active")
  }

  let newPanel = container.querySelector('[data-panel="' + newTabName + '"]')
  if (newPanel) {
    newPanel.classList.add("active")
  }

  containerStates[containerName] = newTabName
  updateURL()
}

// Inicializace při načtení stránky
function initializeTabs() {
  console.log("Inicializuji tabs...")

  loadStateFromURL()

  for (let containerName in containerStates) {
    let activeTab = containerStates[containerName]
    switchTab(containerName, activeTab)
  }

  updateURLDisplay()
}

// Event listener pro kliknutí na záložky
function setupEventListeners() {
  let allButtons = document.querySelectorAll(".tab-button")
  console.log("Nalezeno " + allButtons.length + " tab tlačítek")

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      let container = this.closest("[data-container]")
      let containerName = container.getAttribute("data-container")
      let tabName = this.getAttribute("data-tab")

      switchTab(containerName, tabName)
    })
  }
  /* 
  window.addEventListener("popstate", function () {
    initializeTabs()
  })

  window.addEventListener("resize", function () {
    let containers = document.querySelectorAll("[data-container]")
    for (let i = 0; i < containers.length; i++) {
      let container = containers[i]
      let activeButton = container.querySelector(".tab-button.active")
    }
  }) */
}

// Hlavní inicializační funkce
function startTabs() {
  console.log("Startuji tabs...")

  waitForElements(function () {
    setupEventListeners()
    initializeTabs()
    console.log("Tabs úspěšně inicializovány!")
  })
}

// Spusť tabs
console.log("tabs.js načten")
startTabs()
