// ===== DESIGN DATA (Sample) =====
const designs = [
    {
        id: 1,
        title: "Elegant Summer Dress Collection",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
        designer: "Sarah Chen",
        designerAvatar: "https://i.pravatar.cc/150?img=1",
        price: 199,
        category: "dresses",
        likes: 234
    },
    {
        id: 2,
        title: "Urban Streetwear Pattern",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
        designer: "Mike Davis",
        designerAvatar: "https://i.pravatar.cc/150?img=2",
        price: 149,
        category: "streetwear",
        likes: 189
    },
    {
        id: 3,
        title: "Floral Print Design",
        image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=550&fit=crop",
        designer: "Emma Wilson",
        designerAvatar: "https://i.pravatar.cc/150?img=3",
        price: 99,
        category: "patterns",
        likes: 456
    },
    {
        id: 4,
        title: "Modern Business Suit",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=520&fit=crop",
        designer: "James Park",
        designerAvatar: "https://i.pravatar.cc/150?img=4",
        price: 299,
        category: "formal",
        likes: 167
    },
    {
        id: 5,
        title: "Athletic Performance Wear",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=480&fit=crop",
        designer: "Lisa Johnson",
        designerAvatar: "https://i.pravatar.cc/150?img=5",
        price: 179,
        category: "sportswear",
        likes: 298
    },
    {
        id: 6,
        title: "Bohemian Summer Collection",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
        designer: "Sarah Chen",
        designerAvatar: "https://i.pravatar.cc/150?img=1",
        price: 229,
        category: "dresses",
        likes: 512
    },
    {
        id: 7,
        title: "Minimalist Accessory Line",
        image: "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=400&h=450&fit=crop",
        designer: "Anna Lee",
        designerAvatar: "https://i.pravatar.cc/150?img=6",
        price: 89,
        category: "accessories",
        likes: 145
    },
    {
        id: 8,
        title: "Vintage Denim Collection",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=580&fit=crop",
        designer: "Tom Brown",
        designerAvatar: "https://i.pravatar.cc/150?img=7",
        price: 199,
        category: "streetwear",
        likes: 378
    }
];

// ===== CART MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(design) {
    cart.push(design);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!');
}

function removeFromCart(designId) {
    cart = cart.filter(item => item.id !== designId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item__info">
                <h4>${item.title}</h4>
                <p>by ${item.designer}</p>
                <span class="cart-item__price">$${item.price}</span>
            </div>
            <button onclick="removeFromCart(${item.id})" class="cart-item__remove">&times;</button>
        </div>
    `).join('');
    
    if (cartTotal) {
        cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;
    }
}

// ===== LOAD DESIGNS =====
function loadDesigns(filter = 'all') {
    const grid = document.getElementById('designs-grid');
    if (!grid) return;
    
    let filteredDesigns = designs;
    
    if (filter !== 'all') {
        filteredDesigns = designs.filter(d => d.category === filter);
    }
    
    grid.innerHTML = filteredDesigns.map(design => `
        <div class="design-card" data-id="${design.id}">
            <div class="design-card__image">
                <img src="${design.image}" alt="${design.title}" loading="lazy">
                <div class="design-card__overlay">
                    <div class="design-card__actions">
                    <button class="btn btn--primary" onclick="handlePayment(${design.id}, '${design.title}', ${design.price})">
                        Buy License
                    </button>
                        <button class="design-card__action" onclick="toggleLike(${design.id})">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <button class="design-card__action" onclick='addToCart(${JSON.stringify(design).replace(/'/g, "\\'")})'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="design-card__info">
                <h3 class="design-card__title">${design.title}</h3>
                <div class="design-card__meta">
                    <div class="design-card__designer">
                        <img src="${design.designerAvatar}" alt="${design.designer}">
                        <span>${design.designer}</span>
                    </div>
                    <span class="design-card__price">$${design.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #E11D48 0%, #7C3AED 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 999px;
        font-weight: 600;
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== CART SIDEBAR TOGGLE =====
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');

if (cartBtn && cartSidebar) {
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        renderCartItems();
    });
    
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    };
    
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

// ===== AUTH MODAL =====
const userBtn = document.getElementById('user-btn');
const authModal = document.getElementById('auth-modal');
const modalClose = document.getElementById('modal-close');

if (userBtn && authModal) {
    userBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            authModal.classList.remove('active');
        });
    }
    
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal || e.target.classList.contains('modal__overlay')) {
            authModal.classList.remove('active');
        }
    });
}

// Auth Tab Switching
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-form`).classList.add('active');
    });
});

// ===== FILTER TABS =====
const filterTabs = document.querySelectorAll('.filter-tab');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.dataset.filter;
        loadDesigns(filter);
    });
});

// ===== HOW IT WORKS TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tabs__content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('search-input');

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const filtered = designs.filter(d => 
                d.title.toLowerCase().includes(searchTerm) ||
                d.designer.toLowerCase().includes(searchTerm) ||
                d.category.toLowerCase().includes(searchTerm)
            );
            console.log('Search results:', filtered);
            // Implement search results display
        }
    });
}

// ===== LOAD MORE =====
const loadMoreBtn = document.getElementById('load-more');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more designs
        showNotification('Loading more designs...');
        setTimeout(() => {
            loadDesigns();
            showNotification('New designs loaded!');
        }, 1000);
    });
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
    }
    
    .cart-item {
        display: flex;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .cart-item img {
        width: 60px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .cart-item__info {
        flex: 1;
    }
    
    .cart-item__info h4 {
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 4px;
    }
    
    .cart-item__info p {
        font-size: 0.75rem;
        color: #6B7280;
        margin-bottom: 4px;
    }
    
    .cart-item__price {
        font-weight: 700;
        color: #E11D48;
    }
    
    .cart-item__remove {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: #6B7280;
        transition: 0.2s;
    }
    
    .cart-item__remove:hover {
        background: #F3F4F6;
        color: #111827;
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadDesigns();
    updateCartCount();
    
    console.log('DesignVault initialized!');
    console.log('Cart items:', cart.length);
});

// ===== FORM SUBMISSIONS =====
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simulate login
        console.log('Login:', { email, password });
        showNotification('Logged in successfully!');
        authModal.classList.remove('active');
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            firstName: document.getElementById('register-firstname').value,
            lastName: document.getElementById('register-lastname').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value,
            accountType: document.getElementById('account-type').value
        };
        
        // Simulate registration
        console.log('Register:', formData);
        showNotification('Account created successfully!');
        authModal.classList.remove('active');
    });
}

// ===== LIKE FUNCTIONALITY =====
function toggleLike(designId) {
    const likedDesigns = JSON.parse(localStorage.getItem('liked') || '[]');
    
    if (likedDesigns.includes(designId)) {
        const index = likedDesigns.indexOf(designId);
        likedDesigns.splice(index, 1);
        showNotification('Removed from favorites');
    } else {
        likedDesigns.push(designId);
        showNotification('Added to favorites');
    }
    
    localStorage.setItem('liked', JSON.stringify(likedDesigns));
}

// Function to handle the payment
async function handlePayment(designId, title, price) {
    console.log("1. Button clicked for design:", designId); // DEBUG

    // Make sure Stripe is loaded
    if (typeof Stripe === 'undefined') {
        console.error("ERROR: Stripe library not loaded! Check index.html");
        return;
    }

    // REPLACE THIS with your actual pk_test_... key from Stripe
    const stripe = Stripe('pk_test_PASTE_YOUR_PUBLISHABLE_KEY_HERE');
    console.log("2. Stripe initialized"); // DEBUG

    try {
        console.log("3. Sending request to server..."); // DEBUG
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                designId: designId,
                title: title,
                price: price,
            }),
        });

        const session = await response.json();
        console.log("4. Server responded with session ID:", session.id); // DEBUG

        if (session.error) {
            console.error("Server Error:", session.error);
            return;
        }

        console.log("5. Redirecting to Stripe..."); // DEBUG
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error("Stripe Redirect Error:", result.error.message);
        }
    } catch (error) {
        console.error("6. Critical Error in handlePayment:", error);
    }
}