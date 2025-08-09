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
        const video = document.querySelector('.hero-video-desktop');
        const gif = document.querySelector('.hero-gif-mobile');
        const fallback = document.querySelector('.video-fallback');
        
        const isMobile = window.innerWidth < 768;
        
        // En móviles, usar GIFs (más simple y confiable)
        if (isMobile) {
            console.log('Dispositivo móvil detectado, usando GIF');
            if (gif) {
                gif.style.display = 'block';
                gif.style.zIndex = '2';
            }
            if (fallback) {
                fallback.style.display = 'none';
            }
            return; // Salir temprano para móviles
        }
        
        // Lógica para desktop con videos
        console.log('Dispositivo desktop detectado, usando video');
        if (video && fallback) {
            // Configurar video para mejor rendimiento
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('playsinline', 'true');
            
            let videoCanPlay = false;
            
            // Función para mostrar fallback
            function showFallback() {
                console.log('Mostrando fallback del hero (desktop)');
                video.style.display = 'none';
                fallback.style.display = 'block';
                fallback.style.zIndex = '2';
            }
            
            // Función para mostrar video
            function showVideo() {
                console.log('Mostrando video del hero (desktop)');
                video.style.display = 'block';
                video.style.zIndex = '2';
                fallback.style.display = 'none';
            }
            
            // Función para intentar reproducir video
            function tryPlayVideo() {
                if (!videoCanPlay) {
                    console.log('Video no está listo para reproducir');
                    return;
                }
                
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Video del hero reproduciéndose correctamente (desktop)');
                        showVideo();
                    }).catch(e => {
                        console.log('Error al reproducir video del hero (desktop):', e);
                        showFallback();
                    });
                } else {
                    console.log('Play promise no disponible, mostrando fallback');
                    showFallback();
                }
            }
            
            // Detectar si el video puede reproducirse
            video.addEventListener('canplay', function() {
                videoCanPlay = true;
                console.log('Video del hero puede reproducirse (desktop)');
                tryPlayVideo();
            });
            
            // Manejar errores de carga
            video.addEventListener('error', function() {
                console.log('Error al cargar video del hero (desktop)');
                showFallback();
            });
            
            // Intersection Observer para pausar/reanudar
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && videoCanPlay) {
                        tryPlayVideo();
                    } else if (!entry.isIntersecting) {
                        video.pause();
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            videoObserver.observe(video);
        }
    }
    
    // Inicializar manejo del video
    handleHeroVideo();
    
    // Función para manejar el video de la sección servicios
    function handleServicesVideo() {
        const video = document.querySelector('.services-video-desktop');
        const gif = document.querySelector('.services-gif-mobile');
        const fallback = document.querySelector('.services-video-fallback');
        
        const isMobile = window.innerWidth < 768;
        
        // En móviles, usar GIFs (más simple y confiable)
        if (isMobile) {
            console.log('Dispositivo móvil detectado para servicios, usando GIF');
            if (gif) {
                gif.style.display = 'block';
                gif.style.zIndex = '1';
            }
            if (fallback) {
                fallback.style.display = 'none';
            }
            return; // Salir temprano para móviles
        }
        
        // Lógica para desktop con videos
        if (video) {
            // Configurar video para mejor rendimiento
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('playsinline', 'true');
            
            // Configurar video para todos los dispositivos con optimizaciones específicas
            const isMobile = window.innerWidth < 768;
            
            // Reanudar/pausar según visibilidad usando Intersection Observer
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Intentar reproducir el video
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(e => {
                                console.log('Error al reproducir video de servicios:', e);
                                // Mostrar fallback si hay error
                                const fallback = document.querySelector('.services-video-fallback');
                                if (fallback) {
                                    fallback.style.display = 'block';
                                    video.style.display = 'none';
                                }
                            });
                        }
                    } else {
                        // Solo pausar si no es móvil o si el usuario no está interactuando
                        if (!isMobile) {
                            video.pause();
                        }
                    }
                });
            }, { 
                threshold: isMobile ? 0.2 : 0.3,
                rootMargin: isMobile ? '30px' : '0px'
            });
            
            videoObserver.observe(video);
            
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
        
        // Precargar videos para todos los dispositivos (optimizado)
        const heroVideoLink = document.createElement('link');
        heroVideoLink.rel = 'preload';
        heroVideoLink.as = 'video';
        heroVideoLink.href = 'assets/img/hero.mp4';
        heroVideoLink.type = 'video/mp4';
        document.head.appendChild(heroVideoLink);
        
        const servicesVideoLink = document.createElement('link');
        servicesVideoLink.rel = 'preload';
        servicesVideoLink.as = 'video';
        servicesVideoLink.href = 'assets/img/section.mp4';
        servicesVideoLink.type = 'video/mp4';
        document.head.appendChild(servicesVideoLink);
        
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
   // Función para inicializar la galería
    function initGallery() {
        // CONFIGURACIÓN PRINCIPAL
        const TOTAL_IMAGES = 31; // Número total de imágenes (1.jpg hasta 31.jpg)
        const AUTO_ADVANCE_INTERVAL = 4000; // Tiempo para avance automático (4 segundos)
        
        // Elementos DOM principales
        const galleryContainer = document.querySelector('.gallery-container');
        const modal = document.getElementById('galleryModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.modal-close');
        const prevModalBtn = document.querySelector('.modal-prev');
        const nextModalBtn = document.querySelector('.modal-next');
        const prevCarouselBtn = document.querySelector('.gallery-prev');
        const nextCarouselBtn = document.querySelector('.gallery-next');
        const indicators = document.querySelector('.gallery-indicators');
        
        // Variables de estado
        let currentCarouselIndex = 0;
        let currentModalIndex = 0;
        let imagesPerView = getImagesPerView();
        let totalSlides = Math.ceil(TOTAL_IMAGES / imagesPerView);
        let autoAdvanceTimer = null;
        let isUserInteracting = false;
        
        /**
         * Determina cuántas imágenes mostrar según el tamaño de pantalla
         */
        function getImagesPerView() {
            const width = window.innerWidth;
            if (width >= 1024) {
                return 4; // Desktop - mostrar 4 imágenes
            } else if (width >= 768) {
                return 3; // Tablet - mostrar 3 imágenes
            } else {
                return 2; // Mobile - mostrar 2 imágenes
            }
        }

        /**
         * Genera dinámicamente las imágenes para el slide actual
         */
        function generateGalleryImages() {
            if (!galleryContainer) return;
            
            galleryContainer.innerHTML = '';
            
            const startIndex = currentCarouselIndex * imagesPerView;
            const endIndex = Math.min(startIndex + imagesPerView, TOTAL_IMAGES);
            
            for (let i = startIndex; i < endIndex; i++) {
                const imageNumber = i + 1;
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="assets/img/galeria/${imageNumber}.jpg" alt="Evento Chile Eventos ${imageNumber}" loading="lazy">
                    <div class="gallery-overlay">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => {
                    openModal(i);
                });
                
                galleryContainer.appendChild(galleryItem);
            }
        }
        
        /**
         * Genera los indicadores del carrusel
         */
        function generateIndicators() {
            if (!indicators) return;
            
            indicators.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('span');
                indicator.className = 'gallery-indicator';
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    isUserInteracting = true;
                    goToSlide(i);
                    resetAutoAdvance();
                    setTimeout(() => { isUserInteracting = false; }, 500);
                });
                
                indicators.appendChild(indicator);
            }
        }

        /**
         * Actualiza la vista del carrusel
         */
        function updateCarousel() {
            generateGalleryImages();
            
            const allIndicators = document.querySelectorAll('.gallery-indicator');
            allIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentCarouselIndex);
            });
        }
        
        /**
         * Navega a un slide específico
         */
        function goToSlide(index) {
            currentCarouselIndex = index;
            updateCarousel();
        }
        
        /**
         * Inicia el avance automático del carrusel
         */
        function startAutoAdvance() {
            if (autoAdvanceTimer) {
                clearInterval(autoAdvanceTimer);
            }
            autoAdvanceTimer = setInterval(() => {
                if (!isUserInteracting && totalSlides > 1) {
                    nextSlide();
                }
            }, AUTO_ADVANCE_INTERVAL);
        }
        
        /**
         * Detiene el avance automático
         */
        function stopAutoAdvance() {
            if (autoAdvanceTimer) {
                clearInterval(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
        }
        
        /**
         * Reinicia el avance automático después de interacción
         */
        function resetAutoAdvance() {
            stopAutoAdvance();
            setTimeout(() => {
                if (!isUserInteracting) {
                    startAutoAdvance();
                }
            }, 1000);
        }
        
        /**
         * Avanza al siguiente slide
         */
        function nextSlide() {
            currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
            updateCarousel();
        }
        
        /**
         * Retrocede al slide anterior
         */
        function prevSlide() {
            currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        /**
         * Abre el modal con una imagen específica
         */
        function openModal(imageIndex) {
            if (!modal || !modalImg) return;
            
            currentModalIndex = imageIndex;
            modalImg.src = `assets/img/galeria/${imageIndex + 1}.jpg`;
            modalImg.alt = `Evento Chile Eventos ${imageIndex + 1}`;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Anunciar a lectores de pantalla
            announceToScreenReader(`Imagen ${imageIndex + 1} de ${TOTAL_IMAGES} abierta en galería`);
        }
        
        /**
         * Cierra el modal
         */
        function closeModalFunc() {
            if (!modal) return;
            
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            
            announceToScreenReader('Galería cerrada');
        }
        
        /**
         * Navega a la siguiente imagen en el modal
         */
        function nextModalImage() {
            currentModalIndex = (currentModalIndex + 1) % TOTAL_IMAGES;
            modalImg.src = `assets/img/galeria/${currentModalIndex + 1}.jpg`;
            modalImg.alt = `Evento Chile Eventos ${currentModalIndex + 1}`;
            
            announceToScreenReader(`Imagen ${currentModalIndex + 1} de ${TOTAL_IMAGES}`);
        }
        
        /**
         * Navega a la imagen anterior en el modal
         */
        function prevModalImage() {
            currentModalIndex = (currentModalIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
            modalImg.src = `assets/img/galeria/${currentModalIndex + 1}.jpg`;
            modalImg.alt = `Evento Chile Eventos ${currentModalIndex + 1}`;
            
            announceToScreenReader(`Imagen ${currentModalIndex + 1} de ${TOTAL_IMAGES}`);
        }
        
        // EVENT LISTENERS DEL CARRUSEL
        
        if (nextCarouselBtn) {
            nextCarouselBtn.addEventListener('click', () => {
                isUserInteracting = true;
                nextSlide();
                resetAutoAdvance();
                setTimeout(() => { isUserInteracting = false; }, 500);
            });
        }
        
        if (prevCarouselBtn) {
            prevCarouselBtn.addEventListener('click', () => {
                isUserInteracting = true;
                prevSlide();
                resetAutoAdvance();
                setTimeout(() => { isUserInteracting = false; }, 500);
            });
        }

        // EVENT LISTENERS DEL MODAL
        
        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        if (nextModalBtn) {
            nextModalBtn.addEventListener('click', nextModalImage);
        }
        
        if (prevModalBtn) {
            prevModalBtn.addEventListener('click', prevModalImage);
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });
        }
        
        // NAVEGACIÓN CON TECLADO
        document.addEventListener('keydown', (e) => {
            if (modal && modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModalFunc();
                } else if (e.key === 'ArrowRight') {
                    nextModalImage();
                } else if (e.key === 'ArrowLeft') {
                    prevModalImage();
                }
            }
        });
        
        // MANEJO DE CAMBIOS DE TAMAÑO DE VENTANA
        function handleResize() {
            const newImagesPerView = getImagesPerView();
            if (newImagesPerView !== imagesPerView) {
                imagesPerView = newImagesPerView;
                totalSlides = Math.ceil(TOTAL_IMAGES / imagesPerView);
                if (currentCarouselIndex >= totalSlides) {
                    currentCarouselIndex = totalSlides - 1;
                }
                generateIndicators();
                updateCarousel();
                resetAutoAdvance();
            }
        }
        
        // Debounce function para optimizar resize
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // CONTROL DE AUTO-AVANCE EN HOVER
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                isUserInteracting = true;
                stopAutoAdvance();
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                isUserInteracting = false;
                startAutoAdvance();
            });
        }
        
        // INICIALIZACIÓN
        generateIndicators();
        updateCarousel();
        
        // Inicia auto-avance si hay más de una imagen
        if (totalSlides > 1) {
            startAutoAdvance();
        }
        
        console.log('Galería de Chile Eventos inicializada correctamente');
    }
    
    // Inicializar galería cuando el DOM esté listo
    initGallery();