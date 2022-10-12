document.addEventListener("DOMContentLoaded", () => {
  // 기기 높이 맞추기
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const header = document.querySelector("header");

  main.addEventListener("scroll", () => {
    if (main.scrollTop > 50) {
      container.classList.add("scroll");
    } else {
      container.classList.remove("scroll");
    }
  });

  /* =====================================================
       Dropdown Menu
  ===================================================== */
  const mainMenus = document.querySelectorAll(".main-menu");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  container.insertBefore(overlay, container.firstChild);

  mainMenus.forEach((mainMenu) => {
    mainMenu.addEventListener("click", () => {
      const aside = mainMenu.closest("aside");
      aside.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  /* =====================================================
       Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  const activeSection = (e) => {
    e.stopPropagation();

    let menuIndex = [...tabs].indexOf(e.target);

    tabs.forEach((tab) => {
      [...tabs].indexOf(tab) === menuIndex
        ? tab.classList.add("active")
        : tab.classList.remove("active");
    });

    tabContents.forEach((content) => {
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("active")
        : content.classList.remove("active");
    });
  };

  if (tabs) {
    tabs.forEach((tab) => {
      [...tabs][0].classList.add("active");
      [...tabContents][0].classList.add("active");
      tab.addEventListener("click", activeSection);
    });
  }

  /* =====================================================
       Toggle Menu
  ===================================================== */
  const toggleMenu = document.querySelector(".toggle-menu");
  const globalNavigationMenu = document.querySelector(
    ".global-navigation-menu"
  );
  const localToggleMenu = document.querySelector(".local-toggle-menu");
  const localNavigationMenu = document.querySelector(".local-navigation-menu");

  if (toggleMenu) {
    const openNavigationMenu = (menu) => {
      menu.classList.add("active");
      overlay.classList.add("active");
    };

    const closeNavigationMenu = (toggleButton, menu) => {
      toggleButton.classList.remove("active");
      menu.classList.remove("active");
    };

    toggleMenu.addEventListener("click", () => {
      openNavigationMenu(globalNavigationMenu);
    });

    if (localToggleMenu) {
      localToggleMenu.addEventListener("click", () => {
        openNavigationMenu(localNavigationMenu);
      });
    }

    // dim 영역 눌러도 메뉴창 닫기
    overlay.addEventListener("click", () => {
      closeNavigationMenu(toggleMenu, globalNavigationMenu);

      if (localToggleMenu) {
        closeNavigationMenu(localToggleMenu, localNavigationMenu);
      }
    });
  }

  /* =====================================================
       Bottom Sticky Menu
  ===================================================== */
  const bottomStickyMenu = document.querySelector(".bottom-sticky-menu");

  if (bottomStickyMenu) {
    const subButtons = bottomStickyMenu.querySelector(".buttons");
    const delta = 5;
    let lastScrollTop = 0;

    main.addEventListener("scroll", () => {
      // scroll이 감지될 떄, 하단 sticky menu의 활성화 여부
      let currentScrollTop = main.scrollTop;
      if (Math.abs(lastScrollTop - currentScrollTop) <= delta) {
        return;
      }
      if (currentScrollTop > lastScrollTop) {
        //Scroll down
        bottomStickyMenu.classList.remove("active");
      } else {
        //Scroll up
        bottomStickyMenu.classList.add("active");
      }

      lastScrollTop = currentScrollTop;
    });

    // 하단 sticky menu를 누르면 sub menu들이 펼쳐지도록
    const mainButton = bottomStickyMenu.querySelector(".btn-main");
    mainButton.addEventListener("click", () => {
      subButtons.classList.toggle("active");
      overlay.classList.toggle("active");
      overlay.addEventListener("click", () => {
        subButtons.classList.remove("active");
      });

      const searchButton = subButtons.querySelector(".btn-search");

      // 검색버튼을 누르면 검색창, dim, sub menu 숨김 처리
      searchButton.addEventListener("click", () => {
        searchArea.classList.add("active");
        container.classList.remove("scroll");
        subButtons.classList.remove("active");
        overlay.classList.remove("active");

        if (searchArea.classList.contains("active")) {
          searchArea.classList.remove("active");
        }
      });

      const scrollToTopButton = subButtons.querySelector(".btn-top");
      scrollToTopButton.addEventListener("click", () => {
        subButtons.classList.remove("active");
        overlay.classList.remove("active");
        main.scrollTop = 0;
      });
    });
  }

  /* =====================================================
       Modal
  ===================================================== */
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".btn-close, .btn-cancel");

  const visibleOverlay = (modal) => {
    overlay.classList.add("active");
    modal.classList.add("active");
    if (bottomStickyMenu.classList.contains("active")) {
      bottomStickyMenu.classList.remove("active");
    }
  };

  const hiddenOverlay = () => {
    overlay.classList.remove("active");
  };

  overlay.addEventListener("click", () => {
    hiddenOverlay();

    if (modals) {
      modals.forEach((modal) => modal.classList.remove("active"));
    }
  });

  if (closeButtons) {
    closeButtons.forEach((close) => {
      close.addEventListener("click", () => {
        hiddenOverlay();
        modals.forEach((modal) => modal.classList.remove("active"));
      });
    });
  }

  // confirm type의 modal일 때, 2중 모달 띄우기
  modals.forEach((modal) => {
    const modalButtonSubmit = modal.querySelector(".btn-submit");
    if (modalButtonSubmit) {
      modalButtonSubmit.addEventListener("click", () => {
        const modalDone = document.querySelector(".modal-done");
        visibleOverlay(modalDone);
      });
    }
  });

  const btnNavigation = document.querySelector(".btn-navigation");
  const modalNavigation = document.querySelector(".modal-navigation");
  if (btnNavigation) {
    btnNavigation.addEventListener("click", () => {
      visibleOverlay(modalNavigation);
    });
  }

  /* =====================================================
       Header Search Area
  ===================================================== */
  const btnHeaderSearch = document.querySelectorAll("header .btn-search");
  const searchArea = document.querySelector(".search-area");
  const modalSearch = document.querySelector(".modal-search");
  const workspaceList = document.querySelector(".workspace.list");
  const equipmentsPage = document.querySelector(".equipments");

  // 스크롤시, 헤더 고정
  if (searchArea) {
    main.addEventListener("scroll", () => {
      if (searchArea.classList.contains("active")) {
        container.classList.remove("scroll");
      }
    });

    btnHeaderSearch.forEach((button) => {
      button.addEventListener("click", () => {
        searchArea.classList.toggle("active");
      });
    });

    const close = searchArea.querySelector(".btn-close");
    close.addEventListener("click", () => {
      searchArea.classList.remove("active");
    });
  }

  if (workspaceList) {
    // 검색영역이 열려있을 때
    if (searchArea.classList.contains("active")) {
      // 검색버튼을 누르면 검색영역 닫힘
      searchButton.addEventListener("click", () => {
        searchArea.classList.remove("active");
      });
    }

    const rows = document.querySelectorAll(".row");

    rows.forEach((row) => {
      const tag = row.querySelector(".tag.importance");
      if (row.classList.contains("emergency")) {
        tag.classList.add("emergency");
        tag.classList.add("bg-red");
        tag.textContent = "긴급";
      }
      if (row.classList.contains("high")) {
        tag.classList.add("high");
        tag.classList.add("bg-orange");
        tag.textContent = "높음";
      }
      if (row.classList.contains("normal")) {
        tag.classList.add("normal");
        tag.classList.add("bg-blue");
        tag.textContent = "보통";
      }
      if (row.classList.contains("low")) {
        tag.classList.add("low");
        tag.classList.add("bg-green");
        tag.textContent = "낮음";
      }
    });
  }

  if (equipmentsPage) {
    if (equipmentsPage.classList.contains("list")) {
      btnHeaderSearch.forEach((button) => {
        button.addEventListener("click", () => {
          searchArea.classList.toggle("active");
        });
      });
    }
  }

  /* =====================================================
       Add: textarea
  ===================================================== */
  const addPage = document.querySelector(".add");
  if (addPage) {
    const textareas = document.querySelectorAll("textarea");
    const editTextarea = document.querySelector(".edit-textarea");
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => {
        if (textarea.value !== "") {
          console.log(textarea.value);
          textarea.focus();
          editTextarea.classList.add("active");
        } else {
          editTextarea.classList.remove("active");
        }
      });
    });

    var selectionText = "";
    if (document.getSelection) {
      selectionText = document.getSelection();
    } else if (document.selection) {
      selectionText = document.selection.createRange().text;
    }
    console.log(selectionText);
  }

  /* =====================================================
       Modal: Marker Details
  ===================================================== */
  const modalMarker = document.querySelector(".modal-marker");
  const moveDown = document.querySelector(".move-down");

  if (moveDown) {
    moveDown.addEventListener("click", () => {
      modalMarker.classList.remove("active");
    });
  }

  const marker = document.querySelector(".marker");

  if (marker) {
    marker.addEventListener("click", () => {
      modalMarker.classList.add("active");
    });
  }

  /* =====================================================
       Modal: New Comments
  ===================================================== */
  const newComment = document.querySelector(".comments .new");

  if (newComment) {
    const button = newComment.querySelector(".btn-submit");
    const modalConfirm = document.querySelector(".modal-confirm");

    button.addEventListener("click", () => {
      visibleOverlay(modalConfirm);
    });
  }

  if (main.classList.contains("add")) {
    const button = document.querySelector(".btn-main");
    const modalConfirm = document.querySelector(".modal-confirm");
    //작성화면에서는 하단메뉴 숨김처리
    bottomStickyMenu.style.transform = "translateY(4rem)";

    button.addEventListener("click", () => {
      visibleOverlay(modalConfirm);
    });

    const inputSearch = document.querySelector(".input-search");
    if (inputSearch) {
      inputSearch.addEventListener("click", () => {
        visibleOverlay(modalSearch);
      });
    }
  }

  /* =====================================================
       Modal: Zoom In Images
  ===================================================== */
  const images = document.querySelectorAll(".images");
  const modalImage = document.querySelector(".modal-image");
  if (images) {
    // const modalImage = document.createElement("div")
    // modalImage.classList.add("modal", "modal-image")
    // container.append(modalImage)

    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        e.preventDefault();
        const imagePath = e.target.src;

        modalImage.classList.add("active");
        modalImage.innerHTML += `
        <img src="${imagePath}" alt="" />`;
        visibleOverlay(modalImage);
      });
    });
  }

  /* =====================================================
       Loader
  ===================================================== */
  const loader = document.querySelector(".loader");
  if (loader) {
  }
});
