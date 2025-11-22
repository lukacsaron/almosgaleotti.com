// ===== Animated Favicon =====
// Animate favicon with cooking emoji rotation
(function () {
    const frames = [
        "data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3e%3ctext y=%22.9em%22 font-size=%2290%22%3e🍝%3c/text%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3e%3ctext y=%22.9em%22 font-size=%2290%22%3e🍷%3c/text%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3e%3ctext y=%22.9em%22 font-size=%2290%22%3e🍽️%3c/text%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3e%3ctext y=%22.9em%22 font-size=%2290%22%3e👨‍🍳%3c/text%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3e%3ctext y=%22.9em%22 font-size=%2290%22%3e🍝%3c/text%3e%3c/svg%3e"
    ];

    let currentFrame = 0;
    const favicon = document.querySelector('link[rel="icon"]');

    setInterval(() => {
        if (favicon && frames[currentFrame]) {
            favicon.href = frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
        }
    }, 2000);
})();

// ===== Connected Dots Background Animation =====
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationFrameId;

    // Particle colors - warm, culinary-inspired palette
    const colors = [
        'hsl(20, 70%, 60%)',    // terracotta
        'hsl(40, 80%, 65%)',    // golden
        'hsl(140, 40%, 50%)',   // sage
        'hsl(10, 60%, 55%)',    // warm red
        'hsl(30, 75%, 58%)',    // amber
        'hsl(80, 50%, 60%)',    // olive
    ];

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    // Initialize particles
    function initParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 2 + 1,
            });
        }
    }

    // Mouse move handler
    function handleMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach((particle, i) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Subtle mouse interaction
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                particle.x -= (dx / dist) * force * 0.5;
                particle.y -= (dy / dist) * force * 0.5;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Draw connections
            particles.slice(i + 1).forEach((otherParticle) => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);

                    // Opacity based on distance
                    const opacity = (1 - distance / 150) * 0.3;

                    // Create gradient for line
                    const gradient = ctx.createLinearGradient(
                        particle.x,
                        particle.y,
                        otherParticle.x,
                        otherParticle.y
                    );

                    const particleColorWithOpacity = particle.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
                    const otherColorWithOpacity = otherParticle.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');

                    gradient.addColorStop(0, particleColorWithOpacity);
                    gradient.addColorStop(1, otherColorWithOpacity);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Scroll-based fade out
    function handleScroll() {
        const projectsSection = document.querySelector('#projects');
        if (!projectsSection) return;

        const projectsRect = projectsSection.getBoundingClientRect();
        const scrollProgress = 1 - Math.max(0, Math.min(1, projectsRect.top / window.innerHeight));

        // Fade out as the projects section comes into view
        const opacity = Math.max(0, 1 - scrollProgress * 2);
        canvas.style.opacity = opacity * 0.5;
    }

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
})();

// ===== Copy Email to Clipboard =====
document.addEventListener('DOMContentLoaded', function () {
    const copyIcon = document.getElementById('copy-email');
    const tooltip = document.getElementById('email-tooltip');

    if (copyIcon && tooltip) {
        copyIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Copy email to clipboard
            navigator.clipboard.writeText('almos.galeotti@gmail.com').then(() => {
                // Show tooltip
                tooltip.classList.add('show');

                // Remove class after animation
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    }
});



// ===== Intro Page Load Animations =====
document.addEventListener('DOMContentLoaded', function () {
    // Intro animation timeline
    const introTimeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

    introTimeline
        // Hero heading
        .to('.intro-heading-hero', {
            x: 0,
            opacity: 1,
            duration: 0.9,
        })
        // Secondary heading
        .to('.intro-heading-secondary', {
            x: 0,
            opacity: 1,
            duration: 0.9,
        }, '-=0.5')
        // Rest of content
        .to('.intro-subheading-large, .intro-body-small, .intro-cta', {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
        }, '-=0.5');
});

// ===== Main Application Code =====
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section-header[id], #intro');
    const navDots = document.querySelectorAll('.scroll-nav-dot');

    // Create a map of section IDs to nav dots for faster lookup
    const navDotMap = new Map();
    navDots.forEach(dot => {
        const href = dot.getAttribute('href');
        if (href && href.startsWith('#')) {
            navDotMap.set(href.substring(1), dot);
        }
    });

    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -80% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    // Track all intersecting sections
    const intersectingSections = new Map();
    let currentActiveId = null;

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.isIntersecting) {
                intersectingSections.set(id, {
                    element: entry.target,
                    ratio: entry.intersectionRatio,
                    boundingRect: entry.boundingClientRect
                });
            } else {
                intersectingSections.delete(id);
            }
        });

        let newActiveId = null;

        if (intersectingSections.size > 0) {
            let closestToTop = null;
            let smallestDistance = Infinity;

            intersectingSections.forEach((data, id) => {
                const distance = Math.abs(data.boundingRect.top);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestToTop = id;
                }
            });

            newActiveId = closestToTop;
        } else {
            let closestSection = null;
            let smallestTopPosition = Infinity;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const topPosition = Math.abs(rect.top);
                if (topPosition < smallestTopPosition) {
                    smallestTopPosition = topPosition;
                    closestSection = section.getAttribute('id');
                }
            });

            newActiveId = closestSection;
        }

        if (newActiveId && newActiveId !== currentActiveId) {
            navDots.forEach(dot => dot.classList.remove('active'));
            const activeDot = navDotMap.get(newActiveId);
            if (activeDot) {
                activeDot.classList.add('active');
                currentActiveId = newActiveId;
            }
        }
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Set first dot as active on page load
    const firstDot = navDotMap.get('intro');
    if (firstDot) {
        firstDot.classList.add('active');
        currentActiveId = 'intro';
    }

    // Handle click events for smooth scrolling with offset
    navDots.forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== GSAP Scroll Reveal Animation System =====

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Animate section intros
        const sections = document.querySelectorAll('.section-intro');
        sections.forEach(section => {
            const headingsInSection = section.querySelectorAll('.intro-heading-medium');
            headingsInSection.forEach((heading, index) => {
                gsap.to(heading, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'expo.out',
                    delay: index * 0.2,
                });
            });

            const bodySpans = section.querySelectorAll('.intro-body');
            bodySpans.forEach((span, index) => {
                gsap.to(span, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 0.85,
                    duration: 0.8,
                    ease: 'expo.out',
                    delay: 0.4 + (index * 0.15),
                    onComplete: () => {
                        span.classList.add('animated');
                    }
                });
            });
        });

        // Scroll-reveal for bento items
        const bentoItems = gsap.utils.toArray('.bento-item:not(.section-intro)');

        bentoItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemTop = rect.top + window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = docHeight - windowHeight;

            const canCompleteAnimation = (itemTop - windowHeight * 0.4) < maxScroll;

            if (!canCompleteAnimation) {
                gsap.set(item, {
                    scale: 1,
                    opacity: 1,
                });
            } else {
                gsap.fromTo(item,
                    {
                        scale: 0.8,
                        opacity: 0.6,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 95%',
                            end: 'top 40%',
                            scrub: 0,
                        },
                    }
                );
            }
        });
    } else {
        const bentoItems = document.querySelectorAll('.bento-item:not(.section-intro)');
        bentoItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateZ(0)';
        });
    }

    // ===== Achievement Ticker Animation =====

    function initializeTicker(tickerElement) {
        const items = tickerElement.querySelectorAll('.ticker-item');

        if (items.length <= 1) {
            if (items.length === 1) {
                gsap.set(items[0], { opacity: 1, x: 0, force3D: true });
            }
            return;
        }

        gsap.set(items, { opacity: 1, force3D: true });

        gsap.set(items[0], { x: '0%' });
        for (let i = 1; i < items.length; i++) {
            gsap.set(items[i], { x: '100%' });
        }

        let currentIndex = 0;

        function showNext() {
            const current = items[currentIndex];
            const nextIndex = (currentIndex + 1) % items.length;
            const next = items[nextIndex];

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(current, { x: '100%' });
                    currentIndex = nextIndex;
                    gsap.delayedCall(3, showNext);
                }
            });

            tl.to(current, {
                x: '-100%',
                duration: 0.6,
                ease: 'power2.inOut',
                force3D: true
            }, 0)
                .to(next, {
                    x: '0%',
                    duration: 0.6,
                    ease: 'power2.inOut',
                    force3D: true
                }, 0);
        }

        gsap.delayedCall(3, showNext);
    }

    document.querySelectorAll('.achievement-ticker').forEach(initializeTicker);
});

// ===== Endorsement Card Navigation =====
document.addEventListener('DOMContentLoaded', function () {
    const stack = document.querySelector('.endorsement-stack');
    const cards = document.querySelectorAll('.endorsement-card');
    const prevBtn = document.querySelector('.endorsement-nav-prev');
    const nextBtn = document.querySelector('.endorsement-nav-next');
    const dots = document.querySelectorAll('.endorsement-nav-dot');

    if (!stack || cards.length === 0) return;

    let currentIndex = 0;

    function updateCards(newIndex) {
        if (newIndex === currentIndex) return;

        const direction = newIndex > currentIndex ? 1 : -1;

        // Update active states
        cards[currentIndex].classList.remove('active');
        cards[newIndex].classList.add('active');
        dots[currentIndex].classList.remove('active');
        dots[newIndex].classList.add('active');

        // Animate with GSAP
        const timeline = gsap.timeline();

        timeline.to(cards[currentIndex], {
            x: direction * -100 + '%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        }).fromTo(cards[newIndex], {
            x: direction * 100 + '%',
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0);

        currentIndex = newIndex;
    }

    // Navigation click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            updateCards(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            updateCards(newIndex);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCards(index);
        });
    });

    // Initialize first card
    cards[0].classList.add('active');
});
