// Core State Management
const DEFAULT_SERVICES = [
    {
        id: 1,
        title: "GST Compliance",
        desc: "Expert end-to-end management of GST registration, monthly filings, and annual audits to ensure total regulatory adherence.",
        icon: "fa-certificate"
    },
    {
        id: 2,
        title: "Chartered Accounting",
        desc: "Professional auditing and assurance services designed to provide financial clarity and maintain stakeholder trust.",
        icon: "fa-calculator"
    },
    {
        id: 3,
        title: "Digital Signature",
        desc: "Prompt issuance of Class 3 Digital Signature Certificates (DSC) for secure and legal electronic document submissions.",
        icon: "fa-id-card"
    },
    {
        id: 4,
        title: "Tax Planning",
        desc: "Strategic income tax planning and filing for individuals and corporations, optimizing for maximum legal tax benefits.",
        icon: "fa-piggy-bank"
    },
    {
        id: 5,
        title: "MSME Registration",
        desc: "Specialized consultancy for Udyam registration, unlocking access to government subsidies and financial benefits.",
        icon: "fa-landmark"
    },
    {
        id: 6,
        title: "Import Export Code",
        desc: "Swift processing of IEC licenses for businesses looking to expand their operations into the international trade arena.",
        icon: "fa-ship"
    }
];

const DEFAULT_DOWNLOADS = [
    { id: 1, name: "New PAN Card Application", link: "#" },
    { id: 2, name: "GST Registration Form (PDF)", link: "#" },
    { id: 3, name: "Correction of PAN Data", link: "#" }
];

const DEFAULT_SLIDES = [
    { id: 1, url: "vision.png" },
    { id: 2, url: "https://images.unsplash.com/photo-1454165833744-9654353a8522?auto=format&fit=crop&w=1920&q=80" },
    { id: 3, url: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=1920&q=80" }
];

// Initialize Data
const initializeApp = () => {
    let services = localStorage.getItem('yogiraj_services');
    if (!services) {
        localStorage.setItem('yogiraj_services', JSON.stringify(DEFAULT_SERVICES));
        services = DEFAULT_SERVICES;
    } else {
        services = JSON.parse(services);
    }

    let downloads = localStorage.getItem('yogiraj_downloads');
    if (!downloads) {
        localStorage.setItem('yogiraj_downloads', JSON.stringify(DEFAULT_DOWNLOADS));
        downloads = DEFAULT_DOWNLOADS;
    } else {
        downloads = JSON.parse(downloads);
    }

    let slides = localStorage.getItem('yogiraj_slides');
    if (!slides) {
        localStorage.setItem('yogiraj_slides', JSON.stringify(DEFAULT_SLIDES));
        slides = DEFAULT_SLIDES;
    } else {
        slides = JSON.parse(slides);
    }

    renderServices(services);
    renderDownloads(downloads);
    renderSlider(slides);
};

// Render Services to Grid
const renderServices = (services) => {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = services.map(s => `
        <div class="premium-card animate-reveal" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem;">
            <div style="width: 65px; height: 65px; background: rgba(167, 63, 0, 0.08); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.8rem;">
                <i class="fas ${s.icon}"></i>
            </div>
            <div>
                <h3 style="margin-bottom: 0.8rem; font-size: 1.5rem;">${s.title}</h3>
                <p style="color: var(--text-light); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">${s.desc}</p>
                <a href="#contact" style="color: var(--primary); text-decoration: none; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; letter-spacing: 1px; text-transform: uppercase;">Inquire Details <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
};

// Render Downloads
const renderDownloads = (downloads) => {
    const list = document.getElementById('downloads-list');
    if (!list) return;

    list.innerHTML = downloads.map(d => `
        <a href="${d.link}" class="premium-card" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; padding: 1.25rem 2rem; background: white;">
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <div style="width: 40px; height: 40px; background: #fee2e2; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #ef4444;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <span style="font-weight: 700; color: var(--text-dark);">${d.name}</span>
            </div>
            <i class="fas fa-download" style="color: var(--primary);"></i>
        </a>
    `).join('');
};

// Slider System
let currentSlide = 0;
const renderSlider = (slides) => {
    const track = document.getElementById('hero-slider-track');
    const pagination = document.getElementById('slider-pagination');
    if (!track || !pagination) return;

    track.innerHTML = slides.map(s => `
        <div class="slide" style="background-image: url('${s.url}')">
            <div class="slide-overlay"></div>
        </div>
    `).join('');

    pagination.innerHTML = slides.map((_, i) => `
        <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
    `).join('');

    const autoPlay = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 5000);

    window.goToSlide = (index) => {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };
};

// Admin Panel Logic
const setupAdmin = () => {
    const adminTable = document.getElementById('admin-services-list');
    if (!adminTable) return;

    const renderAdminList = () => {
        const services = JSON.parse(localStorage.getItem('yogiraj_services'));
        adminTable.innerHTML = services.map(s => `
            <div class="data-row">
                <div style="width: 45px; height: 45px; background: #f1f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                    <i class="fas ${s.icon}"></i>
                </div>
                <div style="font-weight: 700; color: var(--text-dark);">${s.title}</div>
                <div style="color: #64748b; font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.desc}</div>
                <button onclick="deleteService(${s.id})" class="btn btn-outline" style="padding: 0.4rem 0.8rem; border-color: #fca5a5; color: #ef4444; font-size: 0.75rem; border-radius: 0.5rem;">Remove</button>
            </div>
        `).join('');
    };

    window.deleteService = (id) => {
        let services = JSON.parse(localStorage.getItem('yogiraj_services'));
        services = services.filter(s => s.id !== id);
        localStorage.setItem('yogiraj_services', JSON.stringify(services));
        renderAdminList();
    };

    const addForm = document.getElementById('add-service-form');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('s-title').value;
        const desc = document.getElementById('s-desc').value;
        const icon = document.getElementById('s-icon').value || 'fa-briefcase';

        const services = JSON.parse(localStorage.getItem('yogiraj_services'));
        services.push({ id: Date.now(), title, desc, icon });
        localStorage.setItem('yogiraj_services', JSON.stringify(services));
        renderAdminList();
        addForm.reset();
    });

    const renderAdminDownloads = () => {
        const downloads = JSON.parse(localStorage.getItem('yogiraj_downloads'));
        const list = document.getElementById('admin-downloads-list');
        if (!list) return;

        list.innerHTML = downloads.map(d => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f1f5f9;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-file-alt" style="color: #94a3b8;"></i>
                    <span style="font-weight: 600; font-size: 0.9rem;">${d.name}</span>
                </div>
                <button onclick="deleteDownload(${d.id})" style="border: none; background: none; color: #f87171; cursor: pointer;"><i class="fas fa-trash-alt"></i></button>
            </div>
        `).join('');
    };

    window.deleteDownload = (id) => {
        let downloads = JSON.parse(localStorage.getItem('yogiraj_downloads'));
        downloads = downloads.filter(d => d.id !== id);
        localStorage.setItem('yogiraj_downloads', JSON.stringify(downloads));
        renderAdminDownloads();
    };

    const addDownloadForm = document.getElementById('add-download-form');
    if (addDownloadForm) {
        addDownloadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('d-name').value;
            const link = document.getElementById('d-link').value;
            const downloads = JSON.parse(localStorage.getItem('yogiraj_downloads'));
            downloads.push({ id: Date.now(), name, link });
            localStorage.setItem('yogiraj_downloads', JSON.stringify(downloads));
            renderAdminDownloads();
            addDownloadForm.reset();
        });
    }

    renderAdminList();
    renderAdminDownloads();

    // Slider Management
    const renderAdminSlider = () => {
        const slides = JSON.parse(localStorage.getItem('yogiraj_slides') || '[]');
        const preview = document.getElementById('admin-slider-preview');
        if (!preview) return;

        preview.innerHTML = slides.map(s => `
            <div class="preview-item" style="background-image: url('${s.url}')">
                <button onclick="deleteSlide(${s.id})" class="preview-remove"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    };

    window.deleteSlide = (id) => {
        let slides = JSON.parse(localStorage.getItem('yogiraj_slides') || '[]');
        slides = slides.filter(s => s.id !== id);
        localStorage.setItem('yogiraj_slides', JSON.stringify(slides));
        renderAdminSlider();
    };

    const addSliderForm = document.getElementById('add-slider-form');
    if (addSliderForm) {
        addSliderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const url = document.getElementById('slide-url').value;
            const slides = JSON.parse(localStorage.getItem('yogiraj_slides') || '[]');
            slides.push({ id: Date.now(), url });
            localStorage.setItem('yogiraj_slides', JSON.stringify(slides));
            renderAdminSlider();
            addSliderForm.reset();
        });
    }

    renderAdminSlider();
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    if (window.location.pathname.includes('admin.html')) {
        setupAdmin();
    }
});
