/**
 * GSAP Smooth Animation Orchestrator
 * Integrates GreenSock GSAP 3, ScrollTrigger, and Canvas Confetti
 * Uses native buttery smooth browser scrolling (zero jitter, zero freeze)
 */

declare const gsap: any;
declare const ScrollTrigger: any;
declare const confetti: any;

export class AnimationOrchestrator {
  private static isGsapReady: boolean = false;

  public static init(): void {
    this.initGSAP();
    this.initMagneticButtons();
    this.initHeroParallax();
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

      // Hero headline entrance with clearProps: "all" so elements never stay hidden
      gsap.fromTo(
        ".hero-headline-word",
        { y: 18, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.05,
          clearProps: "all",
          onComplete: () => {
            document.querySelectorAll<HTMLElement>(".hero-headline-word").forEach(el => {
              el.style.opacity = "1";
              el.style.transform = "none";
            });
          }
        }
      );

      // Hero Spotlight entrance with clearProps: "all"
      const spotlight = document.getElementById("spotlight-card");
      if (spotlight) {
        gsap.fromTo(
          spotlight,
          { y: 25, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.15,
            clearProps: "all"
          }
        );
      }

      // Safety fallback: guarantee 100% full opacity on hero words after 300ms
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>(".hero-headline-word").forEach(el => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }, 300);

      // Section titles reveal on scroll
      if (typeof ScrollTrigger !== "undefined") {
        gsap.utils.toArray(".gsap-fade-up").forEach((el: any) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "all"
            }
          );
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

    try {
      gsap.to(img, {
        scrollTrigger: {
          trigger: "#featured-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        },
        yPercent: 8,
        scale: 1.04,
        ease: "none"
      });
    } catch (e) {
      console.warn("Parallax setup skipped", e);
    }
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
            x: x * 0.25,
            y: y * 0.25,
            rotation: x * 0.03,
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
            duration: 0.5,
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

    try {
      gsap.fromTo(cards, 
        { opacity: 0.4, y: 25, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.45, 
          stagger: 0.04, 
          ease: "power2.out",
          overwrite: "auto",
          clearProps: "all"
        }
      );
    } catch (e) {
      console.warn("Card animation fallback", e);
    }
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
