// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const sidebarNav = document.querySelector('.sidebar-nav');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebarNav.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebarNav.classList.remove('active');
        }
    });
});

// Set active link
function setActiveLink() {
    const currentPage = window.location.pathname;
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            link.getAttribute('href').includes(currentPage.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

setActiveLink();

// Print functionality
const printBtn = document.getElementById('printBtn');
if (printBtn) {
    printBtn.addEventListener('click', () => {
        window.print();
    });
}
