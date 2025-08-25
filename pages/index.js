import React, { useEffect } from 'react';
import Head from 'next/head';

const HomePage = () => {
  useEffect(() => {
    // Mercado Pago
    if (window.MercadoPago) {
      const mp = new window.MercadoPago('APP_USR-3c94edbb-1634-44f4-b8d5-826ed4c7fa11');

      const handleCheckout = async (title, price) => {
        try {
          const response = await fetch('/api/create-preference', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title,
              price: price,
            }),
          });
          const preference = await response.json();
          window.location.href = preference.init_point;
        } catch (error) {
          console.error(error);
          alert('Error al crear la preferencia de pago');
        }
      };

      document.getElementById('checkout-btn-15-semanas').addEventListener('click', () => {
          handleCheckout('Transformación Acelerada', 2999);
      });

      document.getElementById('checkout-btn-30-semanas').addEventListener('click', () => {
          handleCheckout('Metamorfosis Completa', 4299);
      });
    }

    // Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Particles
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray;

    let mouse = { x: null, y: null, radius: (canvas.height/120) * (canvas.width/120) };
    window.addEventListener('mousemove', e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(207, 35, 35, 0.5)';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
    
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height/120) * (canvas.width/120);
        initParticles();
    });

  }, []);

  return (
    <>
      <Head>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Head>
      <canvas id="particle-canvas"></canvas>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      <header className="header">
        <div className="container">
          <a href="#" className="logo">Umbra Coaching</a>
          <nav className="nav-links">
            <a href="#filosofia">Filosofía</a>
            <a href="#planes">Planes</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="container">
            <h1 className="hero-title glitch" data-text="TRANSFORMA TU FÍSICO">TRANSFORMA TU FÍSICO</h1>
            <p className="hero-subtitle reveal">Planes de entrenamiento y nutrición personalizados para resultados reales. Deja de adivinar y empieza a construir la mejor versión de ti.</p>
            <a href="#planes" className="button reveal" style={{transitionDelay: '0.2s'}}>Ver Planes</a>
          </div>
        </section>

        <section id="filosofia" className="section">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-title">El Método Umbra Coaching</h2>
              <p className="section-subtitle">Creemos en un enfoque inteligente y basado en la ciencia. Cada plan de entrenamiento y nutrición es una herramienta de precisión, diseñada para optimizar tu progreso y eliminar las conjeturas. Dejamos atrás las rutinas genéricas para enfocarnos en lo que realmente funciona para ti.</p>
            </div>
          </div>
        </section>

        <section id="planes" className="section">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-title">Elige Tu Plan</h2>
              <p className="section-subtitle">Planes diseñados para adaptarse a tu nivel de compromiso y tus objetivos. Ya sea que busques perder grasa, ganar músculo o mejorar tu rendimiento, aquí comienza tu transformación.</p>
            </div>

            <div className="pricing-grid">
              <div className="pricing-card reveal">
                <div className="card-content">
                  <p className="tag">Acceso Total</p>
                  <h3 className="plan-name">Satori</h3>
                  <p className="price">$1,020 <span className="price-term">MXN/mes</span></p>
                  <ul className="features">
                    <li>El ecosistema completo de Umbra Coaching</li>
                    <li>Supervisión y personalización continua</li>
                    <li>Acceso a la App y Soporte 1-a-1</li>
                    <li>Comunidad cifrada en Discord</li>
                    <li>Análisis de ejecución mensual</li>
                    <li>Acceso a todo el conocimiento arcano</li>
                  </ul>
                  <div className="checkout-btn-container">
                    <a href="https://www.patreon.com/c/user/membership?u=23723781" target="_blank" className="button">Unirme en Patreon</a>
                  </div>
                </div>
              </div>

              <div className="pricing-card reveal" style={{transitionDelay: '0.2s'}}>
                <div className="card-content">
                  <p className="tag">Plan de 15 Semanas</p>
                  <h3 className="plan-name">Transformación Acelerada</h3>
                  <p className="price">$2999 <span className="price-term">MXN</span></p>
                  <ul className="features">
                    <li>Protocolo de nutrición y entrenamiento</li>
                    <li>Estrategia de suplementación</li>
                    <li>Acceso completo a la App</li>
                    <li>Soporte 1-a-1 por Telegram</li>
                    <li><b>Sincronización quincenal por videollamada</b></li>
                  </ul>
                  <div className="checkout-btn-container">
                    <button id="checkout-btn-15-semanas" className="button">Forjar Pacto</button>
                    <div id="wallet_container_15_semanas"></div>
                  </div>
                </div>
              </div>

              <div className="pricing-card reveal" style={{transitionDelay: '0.4s'}}>
                <div className="card-content">
                  <p className="tag">Plan de 30 Semanas</p>
                  <h3 className="plan-name">Metamorfosis Completa</h3>
                  <p className="price">$4299 <span className="price-term">MXN</span></p>
                  <ul className="features">
                    <li>Todos los elementos del plan de 15 semanas</li>
                    <li>Planificación a largo plazo</li>
                    <li>Ajustes prioritarios del sistema</li>
                    <li><b>La transformación más profunda</b></li>
                  </ul>
                  <div className="checkout-btn-container">
                    <button id="checkout-btn-30-semanas" className="button">Forjar Pacto</button>
                    <div id="wallet_container_30_semanas"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="footer">
        <div className="container">
          <p>&copy; 2025 Umbra Coaching // El Santuario es eterno.</p>
          <p>Las comunicaciones se inician a través del nexo en <a href="https://t.me/kojicoachbot" target="_blank">Telegram</a>.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
