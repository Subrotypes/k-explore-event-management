/**
 * GSAP & Lenis Smooth Animation Orchestrator
 * Integrates GreenSock GSAP 3, ScrollTrigger, Lenis Smooth Scroll, and Canvas Confetti
 */

declare const gsap: any;
declare const ScrollTrigger: any;
declare const Lenis: any;
declare const confetti: any;

export class AnimationOrchestrator {
  private static lenis: any = null;
  private static isGsapReady: boolean = false;

  public static init(): void {
    this.initLenis();
    this.initGSAP();
    this.initMagneticButtons();
    this.initHeroParallax();
  }

  /**
   * Smooth Momentum Inertial Scrolling via Lenis
   */
  private static initLenis(): void {
    if (typeof Lenis === "undefined") return;

    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      });

      function raf(time: number) {
        AnimationOrchestrator.lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Connect Lenis to GSAP ScrollTrigger if available
      if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
        this.lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => {
          this.lenis?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    } catch (e) {
      console.warn("Lenis smooth scroll fallback", e);
    }
  }

  /**
   * GSAP ScrollTrigger Global Setup
   */
  private static initGSAP(): void {
    if (typeof gsap === "undefined") return;

    try {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }
      this.isGsapReady = true;

      // Hero headline entrance
      gsap.from(".hero-headline-word", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.15
      });

      // Hero Spotlight entrance
      gsap.from("#spotlight-card", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3
      });

      // Section titles reveal on scroll
      if (typeof ScrollTrigger !== "undefined") {
        gsap.utils.toArray(".gsap-fade-up").forEach((el: any) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
          });
        });
      }
    } catch (e) {
      console.warn("GSAP initialization note", e);
    }
  }

  /**
   * Hero Spotlight Subtle Parallax on Scroll
   */
  private static initHeroParallax(): void {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const img = document.getElementById("spotlight-img");
    if (!img) return;

    gsap.to(img, {
      scrollTrigger: {
        trigger: "#featured-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      },
      yPercent: 12,
      scale: 1.05,
      ease: "none"
    });
  }

  /**
   * Magnetic Button Cursor Physics
   */
  public static initMagneticButtons(): void {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.querySelectorAll<HTMLElement>(".magnetic-btn").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        if (typeof gsap !== "undefined") {
          gsap.to(btn, {
            x: x * 0.28,
            y: y * 0.28,
            rotation: x * 0.04,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }
      });

      btn.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(btn, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)"
          });
        } else {
          btn.style.transform = "translate(0px, 0px)";
        }
      });
    });
  }

  /**
   * Dynamic Event Cards GSAP Entrance Animation
   */
  public static animateCards(container: HTMLElement): void {
    if (typeof gsap === "undefined") return;

    const cards = container.querySelectorAll(".tilt-card-wrapper");
    if (cards.length === 0) return;

    gsap.fromTo(cards, 
      { opacity: 0, y: 40, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.65, 
        stagger: 0.06, 
        ease: "power3.out",
        overwrite: "auto"
      }
    );
  }

  /**
   * Celebratory Canvas Confetti Blast
   */
  public static triggerConfetti(): void {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#4f46e5", "#10b981", "#6366f1", "#f59e0b", "#3b82f6"]
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#4f46e5", "#10b981", "#3b82f6"]
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#4f46e5", "#10b981", "#3b82f6"]
        });
      }, 200);
    }
  }
}
