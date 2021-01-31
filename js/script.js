document.addEventListener("DOMContentLoaded", () => {
  const descriptionItems = document.querySelectorAll("div[data-show]")
  const discussedItems = document.querySelectorAll("li[data-show]")
  discussedItems.forEach((el) => {
    el.addEventListener("click", (e) => {
      const listAttrValue = e.target.getAttribute("data-show")
      descriptionItems.forEach((el) => {
        if (listAttrValue === el.getAttribute("data-show")) {
          el.classList.add("active")
        } else {
          el.classList.remove("active")
        }
      })
      discussedItems.forEach((el) => {
        el.classList.remove("active")
      })
      e.target.classList.add("active")
    })
  })
})
