// ============================================
// COUNTER ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const counters = document.querySelectorAll('.counter-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const start = 0;
                    const increment = target / (duration / 16); // 60fps
                    let current = start;
                    
                    // Store suffix for later
                    counter.setAttribute('data-suffix-display', suffix);
                    
                    function updateCounter() {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    }
                    
                    updateCounter();
                    
                    // Unobserve after animation starts
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of element is visible
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const suffix = counter.getAttribute('data-suffix') || '';
            counter.textContent = target + suffix;
        });
    }
});