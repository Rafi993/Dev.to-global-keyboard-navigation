const keyboardButton = document.createElement("button");

const getPath = () => {
  if (window.location.pathname === "/new") {
    return "newPost";
  }
};

const toggleModal = () => {
  const route = getPath();
  const modal = document.getElementById("modal");
  if (modal) {
    // Remove modal if it is there
    modal.remove();
  } else {
    const commonKeys = `
    <h3> Navigation </h3>
    <ul class="keyboard-shortcuts">
      <li>
       <kbd>Alt</kbd> + <kbd>h</kbd><span>Go to home</span>
      </li>
      <li>
        <kbd>Alt</kbd> + <kbd>l</kbd><span>Navigate to listing</span>
      </li>
      <li>
       <kbd>Alt</kbd> + <kbd>m</kbd> <span>Toggle keyboard shortcuts modal</span>
      </li>
      <li>
       <kbd>Alt</kbd> + <kbd>n</kbd> <span>View notifications</span>
      </li>
      <li>
       <kbd>Alt</kbd> + <kbd>w</kbd> <span>Write new post</span>
      </li>
      <li>
       <kbd>Alt</kbd> + <kbd>r</kbd> <span>Read listing</span>
      </li>
      <li>
       <kbd>Alt</kbd> + <kbd>t</kbd><span> View all tags</span>
      </li>
      <li>
      <kbd>Alt</kbd> + <kbd>v</kbd> <span>View videos</span>
     </li>
    </ul>
`;

    const modal = document.createElement("div");
    modal.id = "modal";
    document.documentElement.appendChild(modal);
    console.log(document.getElementsByTagName("body"));

    // Show modal
    switch (route) {
      case "newPost":
        modal.innerHTML =
          commonKeys +
          `
         <h3>Post</h3>
         <ul class="keyboard-shortcuts">
          <li>
           <kbd>Ctrl</kbd> + <kbd>c</kbd><span> Revet changes</span>
          </li>
          <li>
           <kbd>Ctrl</kbd> + <kbd>s</kbd><span> Save Changes</span>
          </li>
          <li>
          <kbd>Ctrl</kbd> + <kbd>p</kbd><span> View preview</span>
         </li>
         </ul>
        `;
        break;
      default:
        modal.innerHTML = commonKeys;
        break;
    }
  }
};

const navigateTo = (path) => {
  window.location.href = window.location.origin + path;
};

keyboardButton.innerText = "⌨";
keyboardButton.addEventListener("click", () => {
  // Toggle modal state when keyboard button is clicked
  toggleModal();
});

keyboardButton.classList.add("keyboardMenu");

document.documentElement.appendChild(keyboardButton);

// Handle all keyboard events
document.addEventListener("keydown", (event) => {
  // Keyboard shortcut for home feed

  // Common keys
  if (event.altKey) {
    switch (event.key) {
      case "h":
        navigateTo("/");
        return;
      case "l":
        navigateTo("/listings");
        return;
      case "m":
        toggleModal();
        return;
      case "n":
        navigateTo("/notifications");
        return;
      case "w":
        navigateTo("/new");
        return;
      case "r":
        navigateTo("/readinglist");
        return;
      case "t":
        navigateTo("/tags");
        return;
      case "v":
        navigateTo("/videos");
        return;
      default:
        break;
    }
  }

  // Keys specific to newPost
  if (getPath() === "newPost") {
    // Alt keys
    if (event.altKey) {
      switch (event.key) {
        case "c":
          document
            .querySelector(
              ".crayons-btn.crayons-btn--ghost.crayons-btn--s.whitespace-nowrap.fw-normal"
            )
            .click();
          break;
        case "s":
          document.querySelector(".crayons-btn.mr-2.whitespace-nowrap").click();
          break;
        case "p":
          document
            .querySelector(
              "#article-form > div.crayons-article-form__header > div.crayons-article-form__tabs.crayons-tabs.ml-auto > button.crayons-tabs__item.false"
            )
            .click();
          break;
        default:
          break;
      }
    }
  }
});
