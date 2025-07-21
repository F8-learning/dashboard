document.querySelectorAll(".tabs-wrapper").forEach((wrapper) => {
  const tabs = wrapper.querySelectorAll(".tabs-nav button");
  const contents = wrapper.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabIndex = tab.getAttribute("data-tab");

      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update content
      contents.forEach((content, i) => {
        content.classList.toggle("active", i == tabIndex);
      });
    });
  });
});
