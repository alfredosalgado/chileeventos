// Funcionalidad principal de Chile Eventos
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar header en scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animación especial para contadores o elementos específicos
                if (entry.target.classList.contains('value-item')) {
                    animateValueItems(entry.target);
                }
                
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCards(entry.target);
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    animateTestimonials(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const elementsToAnimate = document.querySelectorAll('.value-item, .service-card, .testimonial-card, .about-text, .mission, .vision, .contact-item');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Función para animar elementos de valores
    function animateValueItems(element) {
        const icon = element.querySelector('.value-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 600);
            }, 200);
        }
    }
    
    // Función para animar tarjetas de servicios
    function animateServiceCards(element) {
        const icon = element.querySelector('.service-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
            }, 300);
        }
    }
    
    // Función para animar testimonios
    function animateTestimonials(element) {
        const quote = element.querySelector('.testimonial-quote');
        if (quote) {
            setTimeout(() => {
                quote.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    quote.style.transform = 'scale(1)';
                }, 400);
            }, 200);
        }
    }
    
    // Función para manejar el video del hero
    function handleHeroVideo() {
        const video = document.querySelector('.hero-video video');
        if (video) {
            // Configurar video para mejor rendimiento
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('playsinline', 'true');
            
            // Pausar video en dispositivos móviles para ahorrar batería
            if (window.innerWidth < 768) {
                video.pause();
                video.style.display = 'none';
                // Mostrar fallback en móviles
                const fallback = document.querySelector('.video-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                }
            } else {
                // Reanudar/pausar según visibilidad usando Intersection Observer
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => {
                                console.log('Error al reproducir video:', e);
                                // Mostrar fallback si hay error
                                const fallback = document.querySelector('.video-fallback');
                                if (fallback) {
                                    fallback.style.display = 'block';
                                }
                            });
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.25 });
                
                videoObserver.observe(video);
            }
            
            // Manejar errores de carga del video
            video.addEventListener('error', function() {
                console.log('Error al cargar el video, mostrando fallback');
                const fallback = document.querySelector('.video-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                }
                video.style.display = 'none';
            });
            
            // Optimizar rendimiento del video
            video.addEventListener('loadeddata', function() {
                console.log('Video cargado correctamente');
            });
        }
    }
    
    // Inicializar manejo del video
    handleHeroVideo();
    
    // Función para manejar el video de la sección servicios
    function handleServicesVideo() {
        const video = document.querySelector('.services-video video');
        if (video) {
            // Configurar video para mejor rendimiento
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('playsinline', 'true');
            
            // Pausar video en dispositivos móviles para ahorrar batería
            if (window.innerWidth < 768) {
                video.pause();
                video.style.display = 'none';
                // Mostrar fallback en móviles
                const fallback = document.querySelector('.services-video-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                }
            } else {
                // Reanudar/pausar según visibilidad usando Intersection Observer
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => {
                                console.log('Error al reproducir video de servicios:', e);
                                // Mostrar fallback si hay error
                                const fallback = document.querySelector('.services-video-fallback');
                                if (fallback) {
                                    fallback.style.display = 'block';
                                }
                            });
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.3 });
                
                videoObserver.observe(video);
            }
            
            // Manejar errores de carga del video
            video.addEventListener('error', function() {
                console.log('Error al cargar el video de servicios, mostrando fallback');
                const fallback = document.querySelector('.services-video-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                }
                video.style.display = 'none';
            });
            
            // Optimizar rendimiento del video
            video.addEventListener('loadeddata', function() {
                console.log('Video de servicios cargado correctamente');
            });
        }
    }
    
    // Inicializar manejo del video de servicios
    handleServicesVideo();
    
    // Efecto parallax sutil en el hero (solo para contenido, no video)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = hero ? hero.querySelector('.hero-content') : null;
        
        if (heroContent && scrolled < window.innerHeight) {
            // Solo aplicar parallax al contenido del hero, no al video
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
        }
    });
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Función para manejar el redimensionamiento de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Cerrar menú móvil si se redimensiona a desktop
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // Función para mejorar la accesibilidad del teclado
    document.addEventListener('keydown', function(e) {
        // Cerrar menú móvil con Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.focus();
        }
        
        // Navegación con teclado en el menú
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Función para detectar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Deshabilitar animaciones si el usuario prefiere movimiento reducido
        document.documentElement.style.setProperty('--transition', 'none');
    }
    
    // Función para manejar errores de carga de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Error al cargar imagen:', this.src);
        });
    });
    
    // Función para optimizar el rendimiento en dispositivos móviles
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Mejorar el rendimiento del scroll en móviles
        let ticking = false;
        
        function updateScrollEffects() {
            // Aquí se pueden agregar efectos de scroll optimizados para móvil
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    // Función para precargar recursos críticos
    function preloadCriticalResources() {
        const criticalImages = [
            'assets/img/logo.jpg'
        ];
        
        // Precargar videos solo en desktop
        if (window.innerWidth >= 768) {
            // Precargar video del hero
            const heroVideoLink = document.createElement('link');
            heroVideoLink.rel = 'preload';
            heroVideoLink.as = 'video';
            heroVideoLink.href = 'assets/img/hero.mp4';
            heroVideoLink.type = 'video/mp4';
            document.head.appendChild(heroVideoLink);
            
            // Precargar video de servicios
            const servicesVideoLink = document.createElement('link');
            servicesVideoLink.rel = 'preload';
            servicesVideoLink.as = 'video';
            servicesVideoLink.href = 'assets/img/section.mp4';
            servicesVideoLink.type = 'video/mp4';
            document.head.appendChild(servicesVideoLink);
        }
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    preloadCriticalResources();
    
    // Función para manejar la carga diferida de contenido no crítico
    function loadNonCriticalContent() {
        // Aquí se puede cargar contenido adicional después de la carga inicial
        console.log('Contenido no crítico cargado');
    }
    
    // Cargar contenido no crítico después de que la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(loadNonCriticalContent, 1000);
    });
    
    // Función para analytics y tracking (placeholder)
    function trackUserInteraction(action, element) {
        // Aquí se pueden agregar llamadas a Google Analytics, Facebook Pixel, etc.
        console.log('Interacción rastreada:', action, element);
    }
    
    // Rastrear clicks en botones importantes
    document.querySelectorAll('.btn, .service-btn, .contact-link').forEach(button => {
        button.addEventListener('click', function() {
            trackUserInteraction('click', this.textContent.trim());
        });
    });
    
    // Función para mostrar mensajes de estado (accesibilidad)
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Agregar estilos para elementos solo para lectores de pantalla
    const srOnlyStyles = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = srOnlyStyles;
    document.head.appendChild(styleSheet);
    
    console.log('Chile Eventos - Sitio web cargado correctamente');
});