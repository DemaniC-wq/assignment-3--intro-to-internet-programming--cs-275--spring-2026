// SELECT ELEMENTS
const modalTrigger = document.querySelector('#show-modal');
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#overlay');
const menuTrigger=document.querySelector('#show-menu');
let menuElement=null;
let menuOpen=false;

// FUNCTIONS
const openModal = () => {
    modal.classList.add('active');
    overlay.classList.add('active');
};

const closeModal = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
};


const showDropdown = () => {
    menuElement = document.createElement('div');
    menuElement.classList.add('dropdown');
    menuElement.textContent = "Dropdown Menu";

    document.body.appendChild(menuElement);

    const rect = menuTrigger.getBoundingClientRect();

    menuElement.style.position = "absolute";
    menuElement.style.top = `${rect.bottom + window.scrollY}px`;
    menuElement.style.left = `${rect.left}px`;

    requestAnimationFrame(() => {
        menuElement.classList.add('active');
    });

    menuOpen = true;
};
const closeMenu = () => {
    if (!menuElement) return;

    menuElement.classList.remove('active');

    setTimeout(() => {
        menuElement.remove();
        menuElement = null;
        menuOpen = false;
    }, 500);
};
const toggleMenu = (e) => {
    e.preventDefault();

    if (menuOpen) {
        closeMenu();
    } else {
        showDropdown();
    }
};

// EVENTS
modalTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

menuTrigger.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
    if (!menuElement) return;

    if (
        menuOpen &&
        !menuElement.contains(e.target) &&
        e.target !== menuTrigger
    ) {
        closeMenu();
    }
});

// click outside modal
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModal();
    }
});

// ESC key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
const closeBtn = document.querySelector('#close-modal');

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}
