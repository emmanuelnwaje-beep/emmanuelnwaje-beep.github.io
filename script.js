document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const themeToggle = document.getElementById("theme-toggle");
    const backTop = document.getElementById("back-top");

    // Mobile navigation
    menuToggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });

    // Theme preference
    const savedTheme = localStorage.getItem("emmanuel-theme");
    if (savedTheme === "light") body.classList.add("light");

    const updateThemeIcon = () => {
        if (themeToggle) themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";
    };
    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("light");
        localStorage.setItem("emmanuel-theme", body.classList.contains("light") ? "light" : "dark");
        updateThemeIcon();
    });

    // Scroll reveal
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));

    // Project filters
    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project-card");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(button => button.classList.remove("active"));
            filter.classList.add("active");

            const category = filter.dataset.filter;

            projects.forEach(project => {
                const show = category === "all" || project.dataset.category === category;
                project.classList.toggle("hidden", !show);
            });
        });
    });

    // Back to top
    window.addEventListener("scroll", () => {
        backTop?.classList.toggle("show", window.scrollY > 650);
    }, { passive: true });

    backTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Active navigation section
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
                active?.classList.add("active");
            }
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => sectionObserver.observe(section));

    // Animated counters
    const counters = document.querySelectorAll("[data-count]");
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = Number(el.dataset.count);
            let current = 0;
            const duration = 900;
            const start = performance.now();

            const tick = now => {
                const progress = Math.min((now - start) / duration, 1);
                current = Math.floor(progress * target);
                el.textContent = current;
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target + "+";
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: .8 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Prevent accidental empty hash jumps
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener("click", event => event.preventDefault());
    });
});
