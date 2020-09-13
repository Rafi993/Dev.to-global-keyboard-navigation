const keyboardButton = document.createElement("button");

const getPath = () => {
  if (window.location.pathname === "/new") {
    return "newPost";
  }
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
  }
};

const closeCommandView = () => {
  const modal = document.getElementById("commandView");
  if (modal) {
    modal.remove();
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
       <kbd>Alt</kbd> + <kbd>m</kbd> <span>Toggle keyboard shortcuts</span>
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
      <li>
        <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>p</kbd> <span>Command menu</span>
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
           <kbd>Alt</kbd> + <kbd>c</kbd><span> Revet changes</span>
          </li>
          <li>
           <kbd>Alt</kbd> + <kbd>s</kbd><span> Save Changes</span>
          </li>
          <li>
          <kbd>Alt</kbd> + <kbd>p</kbd><span> View preview</span>
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

const clickElement = (query) => {
  document.querySelector(query).click();
};

const commands = [
  {
    title: "Go to home",
    command: "goToHome",
  },
  {
    title: "View listing",
    command: "goToListing",
  },
  {
    title: "Show keyboard shortcuts",
    command: "showKeyboard",
  },
  {
    title: "View notifications",
    command: "goToNotifications",
  },
  {
    title: "Wrote new post",
    command: "goToNewPost",
  },
  {
    title: "View reading list",
    command: "goToReadingList",
  },
  {
    title: "View tags",
    command: "goToTags",
  },
  {
    title: "View videos",
    command: "goToVideos",
  },
  {
    title: "Save post",
    command: "savePost",
  },
  {
    title: "Preview post",
    command: "previewPost",
  },
  {
    title: "Reset post",
    command: "clearPost",
  },
];

const showCommandView = () => {
  // Show command view if it is not shown before
  if (!document.getElementById("commandView")) {
    const commandView = document.createElement("div");
    commandView.id = "commandView";
    document.documentElement.appendChild(commandView);
    console.log(document.getElementsByTagName("body"));
    commandView.innerHTML = `
      <input type="search" id="search-command" placeholder="Search for what commands" autofocus />
      <ul>
        ${commands
          .map((command) => {
            return `<li onclick="executeCommand(${command.command})">${command.title}</li>`;
          })
          .join("")}
      </ul>
  `;
  }

  // Focus on the search
  document.getElementById("search-command").focus();
};

keyboardButton.innerText = "⌨";
keyboardButton.addEventListener("click", () => {
  // Toggle modal state when keyboard button is clicked
  toggleModal();
});

keyboardButton.classList.add("keyboardMenu");

document.documentElement.appendChild(keyboardButton);

const executeCommand = (command) => {
  switch (command) {
    case "goToHome":
      navigateTo("/");
      break;
    case "goToListing":
      navigateTo("/listings");
      break;
    case "showKeyboard":
      toggleModal();
      break;
    case "goToNotifications":
      navigateTo("/notifications");
      break;
    case "goToNewPost":
      navigateTo("/new");
      break;
    case "goToReadingList":
      navigateTo("/readinglist");
      break;
    case "goToTags":
      navigateTo("/tags");
      break;
    case "goToVideos":
      navigateTo("/videos");
      break;
    case "commandView":
      closeModal();
      showCommandView();
      break;
    case "savePost":
      clickElement(
        ".crayons-btn.crayons-btn--ghost.crayons-btn--s.whitespace-nowrap.fw-normal"
      );
      break;
    case "previewPost":
      clickElement(
        "#article-form > div.crayons-article-form__header > div.crayons-article-form__tabs.crayons-tabs.ml-auto > button.crayons-tabs__item.false"
      );
      break;
    case "clearPost":
      clickElement(
        ".crayons-btn.crayons-btn--ghost.crayons-btn--s.whitespace-nowrap.fw-normal"
      );
      break;
    default:
      break;
  }
};

// Handle all keyboard events
document.addEventListener("keydown", (event) => {
  // Common keys
  if (event.key === "Escape") {
    closeModal();
    closeCommandView();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "P") {
    event.preventDefault();
    executeCommand("commandView");
  }

  if (event.altKey) {
    switch (event.key) {
      case "h":
        executeCommand("goToHome");
        return;
      case "l":
        executeCommand("goToListing");
        return;
      case "m":
        executeCommand("showKeyboard");
        return;
      case "n":
        executeCommand("goToNotifications");
        return;
      case "w":
        executeCommand("goToNewPost");
        return;
      case "r":
        executeCommand("goToReadingList");
        return;
      case "t":
        executeCommand("goToTags");
        return;
      case "v":
        executeCommand("goToVideos");
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
          executeCommand("clearPost");
          break;
        case "s":
          executeCommand("savePost");
          break;
        case "p":
          executeCommand("previewPost");
          break;
        default:
          break;
      }
    }
  }
});
