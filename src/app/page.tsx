'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const IMAGE_PATH_ARRAY = [
    '/assets/splash/left.svg',
    '/assets/splash/center.svg',
    '/assets/splash/right.svg',
    '/assets/splash/extra-1.svg',
    '/assets/splash/extra-1-1.svg',
    '/assets/splash/extra-2.svg',
    '/assets/splash/extra-2-1.svg',
    '/assets/splash/extra-3.svg',
    '/assets/splash/center.svg',
  ];

  // fast-looping overlay text (use state so React re-renders)
  const [overlayText, setOverlayText] = useState(IMAGE_PATH_ARRAY[0]);
  const indexRef = useRef(0);
  const loopCountRef = useRef(0);

  let tl = gsap.timeline();

  useEffect(() => {
    tl.fromTo(
      '#image-overlay',
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        duration: 1,
        ease: 'elastic.out(1,0.3)',
        opacity: 1,
      },
      'first-image'
    )
      .fromTo(
        '#image-overlay-left',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1,0.3)',
        },
        'first-image+=2.5'
      )
      .fromTo(
        '#image-overlay-right',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1,0.3)',
        },
        'first-image+=2.75'
      )
      .to('#image-overlay-left', {
        opacity: 0,
        top: 0,
        left: 0,
        rotate: -12,
        duration: 0.5,
      })
      .to('#image-overlay-right', {
        opacity: 0,
        top: 0,
        right: 0,
        rotate: 12,
        duration: 0.5,
      })
      .to('#image-overlay', {
        opacity: 0,
        duration: 0.5,
      })
      .to('.circle-reveal', {
        clipPath: 'circle(100% at 50% 50%)',
        ease: 'power2.inOut',
        duration: 1,
      })
      .fromTo(
        '.hero-img-4',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        },
        'hero-images'
      )
      .fromTo(
        '.hero-img-1',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        },
        'hero-images+=0.2'
      )
      .fromTo(
        '.hero-img-2',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        },
        'hero-images+=0.4'
      )
      .fromTo(
        '.hero-img-3',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        },
        'hero-images+=0.6'
      )
      .fromTo(
        '.hero-img-5',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        },
        'hero-images+=0.8'
      );
  }, []);

  // quick loop to cycle overlay text
  useEffect(() => {
    const SPEED_MS = 120; // fast loop interval
    const LOOP_COUNT = 2; // number of times to loop through the array (adjustable)
    const lastIndex = IMAGE_PATH_ARRAY.length - 1;
    const id = setInterval(() => {
      const prevIndex = indexRef.current;
      indexRef.current = (indexRef.current + 1) % IMAGE_PATH_ARRAY.length;
      setOverlayText(IMAGE_PATH_ARRAY[indexRef.current]);

      // increment loop count when we complete a full cycle (wrap from lastIndex to 0)
      if (prevIndex === lastIndex && indexRef.current === 0) {
        loopCountRef.current += 1;
      }

      // stop the interval when we've completed the specified number of loops
      // (stop at lastIndex after completing LOOP_COUNT loops)
      if (
        loopCountRef.current === LOOP_COUNT - 1 &&
        indexRef.current === lastIndex
      ) {
        clearInterval(id);
      }
    }, SPEED_MS);

    return () => {
      clearInterval(id);
    };
  }, []);

  // section 1 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    gsap.set(
      '.section-1-img-1, .section-1-img-2, .section-1-img-3, .section-1-img-4, .section-1-img-5',
      {
        y: 100,
        opacity: 0,
        immediateRender: true,
      }
    );

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-1-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 1 elements not found');
        return;
      }

      const section1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'bottom 20%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: true, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section1Tl
        .addLabel('start')
        .to('.section-1-img-1', {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        })
        .addLabel('img2')
        .to(
          '.section-1-img-2',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img4')
        .to(
          '.section-1-img-4',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img3')
        .to(
          '.section-1-img-3',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img5')
        .to(
          '.section-1-img-5',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-1-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // section 2 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    gsap.set(
      '.section-2-img-1, .section-2-img-2, .section-2-img-3, .section-2-img-4, .section-2-text',
      {
        y: 100,
        opacity: 0,
        immediateRender: true,
      }
    );

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-2-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 2 elements not found');
        return;
      }

      const section2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'bottom 80%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: false, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section2Tl
        .addLabel('start')
        .to('.section-2-img-1', {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        })
        .addLabel('img4')
        .to(
          '.section-2-img-4',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img3')
        .to(
          '.section-2-img-3',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img2')
        .to(
          '.section-2-img-2',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('text')
        .to(
          '.section-2-text',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-2-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // section 3 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    gsap.set(
      '.section-3-img-1, .section-3-img-2, .section-3-img-3, .section-3-img-4, .section-3-img-5, .section-3-text',
      {
        y: 100,
        opacity: 0,
        immediateRender: true,
      }
    );

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-3-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 3 elements not found');
        return;
      }

      const section3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'bottom 100%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: false, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section3Tl
        .addLabel('start')
        .to('.section-3-img-1', {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        })
        .addLabel('img2')
        .to(
          '.section-3-img-2',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img3')
        .to(
          '.section-3-img-3',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img4')
        .to(
          '.section-3-img-4',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img5')
        .to(
          '.section-3-img-5',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('text')
        .to(
          '.section-3-text',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-3-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // section 4 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    gsap.set(
      '.section-4-img-1, .section-4-img-2, .section-4-img-3, .section-4-img-4, .section-4-img-5, .section-4-text',
      {
        y: 100,
        opacity: 0,
        immediateRender: true,
      }
    );

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-4-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 4 elements not found');
        return;
      }

      const section4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'top 20%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: false, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section4Tl
        .addLabel('start')
        .to('.section-4-img-1', {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        })
        .addLabel('img2')
        .to(
          '.section-4-img-2',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img3')
        .to(
          '.section-4-img-3',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img4')
        .to(
          '.section-4-img-4',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img5')
        .to(
          '.section-4-img-5',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('text')
        .to(
          '.section-4-text',
          {
            y: 0,
            opacity: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-4-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // section 5 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    // First and third images start from left, second from right
    gsap.set('.section-5-img-1, .section-5-img-3', {
      x: -200,
      opacity: 0,
      immediateRender: true,
    });
    gsap.set('.section-5-img-2', {
      x: 200,
      opacity: 0,
      immediateRender: true,
    });

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-5-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 5 elements not found');
        return;
      }

      const section5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'top 80%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: false, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section5Tl
        .addLabel('start')
        .to('.section-5-img-1', {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
        })
        .addLabel('img2')
        .to(
          '.section-5-img-2',
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('img3')
        .to(
          '.section-5-img-3',
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-5-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // section 6 images animation with ScrollTrigger
  useEffect(() => {
    // Set initial state immediately to prevent flash
    // All elements start from bottom
    gsap.set('.section-6-img-1, .section-6-img-2', {
      y: 100,
      opacity: 0,
      immediateRender: true,
    });

    // Wait a bit for the DOM to be ready and circle reveal to complete
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('.circle-reveal');
      const triggerContainer = document.querySelector('.section-6-container');

      if (!scrollContainer || !triggerContainer) {
        console.warn('Section 6 elements not found');
        return;
      }

      const section6Tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerContainer,
          scroller: scrollContainer,
          start: 'top 80%',
          end: '+=500',
          toggleActions: 'play none none none',
          once: true,
          markers: false, // Set to true for debugging
        },
      });

      // Add animations and labels to the timeline
      section6Tl
        .addLabel('start')
        .to('.section-6-img-1', {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
        })
        .addLabel('img2')
        .to(
          '.section-6-img-2',
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          '-=0.8'
        )
        .addLabel('end');

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 500); // Wait 500ms for circle reveal animation to start

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (triggerEl && triggerEl.classList.contains('section-6-container')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="font-sans w-screen h-screen flex justify-center bg-gray-900">
      <div
        id="overlay"
        className="bg-white fixed top-0 left-0 w-full h-full z-10 grid place-items-center"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <div className="relative">
          <img
            id="image-overlay"
            src={overlayText}
            alt="Overlay Image"
            className="z-200 w-[140px] h-[200px] object-cover rounded-md opacity-0 shadow shadow-white"
          />
          <img
            id="image-overlay-left"
            src={IMAGE_PATH_ARRAY[0]}
            alt="Overlay Image"
            className="absolute -rotate-12 -z-10 -left-30 top-4 w-[140px] h-[200px] object-cover rounded-md  shadow shadow-white opacity-0"
          />
          <img
            id="image-overlay-right"
            src={IMAGE_PATH_ARRAY[2]}
            alt="Overlay Image"
            className="absolute rotate-12 -z-10 -right-30 top-4 w-[140px] h-[200px] object-cover rounded-md  shadow shadow-white opacity-0"
          />
        </div>

        {/* stagger reveal */}
        <div className="stagger-reveal absolute top-0 left-0 w-full h-full  grid grid-rows-1 grid-cols-4">
          <div className="stagger-item bg-gray-950 translate-y-[100vh]"></div>
          <div className="stagger-item bg-gray-950 translate-y-[100vh]"></div>
          <div className="stagger-item bg-gray-950 translate-y-[100vh]"></div>
          <div className="stagger-item bg-gray-950 translate-y-[100vh]"></div>
        </div>

        {/* circle reveal */}
        <div
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
          className="circle-reveal absolute z-50 top-0 left-0 w-full h-full bg-gray-900 p-4 overflow-scroll overflow-x-hidden"
        >
          <div className="w-full relative max-w-md mx-auto min-h-[4000px] overflow-x-hidden overflow-y-auto">
            {/* hero */}
            <img
              className="hero-img-4 absolute top-0 scale-125 left-[20px] opacity-0"
              src="/assets/hero/4.svg"
              alt=""
            />
            <img
              className="hero-img-1 absolute top-[120px] w-[130px] opacity-0"
              src="/assets/hero/1.svg"
              alt=""
            />
            <img
              className="hero-img-2 absolute top-[290px] right-[10px] w-[250px] opacity-0"
              src="/assets/hero/2.svg"
              alt=""
            />
            <img
              className="hero-img-3 absolute top-[80px] right-[20px] w-[200px] opacity-0"
              src="/assets/hero/3.svg"
              alt=""
            />
            <img
              className="hero-img-5 absolute top-[450px] w-[400px] opacity-0"
              src="/assets/hero/5.svg"
              alt=""
            />

            {/* section 1 */}
            <div
              className="section-1-container relative "
              style={{ minHeight: '500px' }}
            >
              <img
                className="section-1-img-1 absolute top-[560px] w-[270px] right-[-20px] opacity-0"
                src="/assets/section-1/1.svg"
                alt=""
              />
              <img
                className="section-1-img-2 absolute top-[600px] w-[220px] left-[-50px] opacity-0"
                src="/assets/section-1/2.svg"
                alt=""
              />
              <img
                className="section-1-img-4 absolute top-[730px] w-[280px] left-[-30px] opacity-0"
                src="/assets/section-1/4.svg"
                alt=""
              />
              <img
                className="section-1-img-3 absolute top-[840px] w-[260px] right-[-20px] rotate-12 opacity-0"
                src="/assets/section-1/3.svg"
                alt=""
              />
              <img
                className="section-1-img-5 absolute top-[940px] w-[180px] left-[-20px] opacity-0"
                src="/assets/section-1/5.svg"
                alt=""
              />
            </div>

            {/* section 2 */}
            <div
              className="section-2-container relative "
              style={{ minHeight: '1000px' }}
            >
              <img
                className="section-2-img-1 absolute top-[640px] scale-100 left-[-60px] opacity-0"
                src="/assets/section-2/1.svg"
                alt=""
              />
              <img
                className="section-2-img-4 absolute top-[760px] w-[250px] left-[20px] opacity-0"
                src="/assets/section-2/4.svg"
                alt=""
              />
              <img
                className="section-2-img-3 absolute top-[850px] w-[180px] left-[190px] opacity-0"
                src="/assets/section-2/3.svg"
                alt=""
              />
              <img
                className="section-2-img-2 absolute top-[980px] w-[240px] left-[0px] opacity-0"
                src="/assets/section-2/2.svg"
                alt=""
              />
              <p className="section-2-text absolute top-[1230px] w-[320px] left-[20px] text-white text-sm font-mono opacity-0">
                ciyeee pertama jalan bareng,event pertama, cf masih belum banyak
                foto foto wkwkwkwkk <br /> <br /> asiq keliling liat animek,
                10ribu langkahhh :0 <br />
                <br /> bahas wuwa, jomok, banyak sihh asiqqq
              </p>
            </div>

            {/* section 3 */}
            <div
              className="section-3-container relative"
              style={{ minHeight: '1000px' }}
            >
              <img
                className="section-3-img-1 absolute top-[470px] scale-90 left-[-20px] opacity-0"
                src="/assets/section-3/1.svg"
                alt=""
              />
              <img
                className="section-3-img-2 absolute top-[650px] w-[220px] left-[20px] opacity-0"
                src="/assets/section-3/2.svg"
                alt=""
              />
              <img
                className="section-3-img-3 absolute top-[640px] w-[300px] right-[-20px] z-10 opacity-0"
                src="/assets/section-3/3.svg"
                alt=""
              />
              <img
                className="section-3-img-4 absolute top-[770px] w-[150px] left-[20px] opacity-0"
                src="/assets/section-3/4.svg"
                alt=""
              />
              <img
                className="section-3-img-5 absolute top-[870px] w-[] left-[-20px] opacity-0"
                src="/assets/section-3/5.svg"
                alt=""
              />
              <p className="section-3-text absolute top-[960px] w-[320px] left-[20px] text-white text-sm font-mono opacity-0">
                ini mumpung tanggal merah keknya hehehee <br />
                <br /> feel matcha, blok m izakaya, sama taman literasii tapi ga
                sempet fotoo <br /> <br /> first time ke jalan siyaridin no 3
              </p>
            </div>

            {/* section 4 */}
            <div
              className="section-4-container relative "
              style={{ minHeight: '1000px' }}
            >
              <img
                className="section-4-img-1 absolute top-[180px] scale-90 left-[-20px] opacity-0"
                src="/assets/section-4/1.svg"
                alt=""
              />
              <img
                className="section-4-img-2 absolute top-[340px] w-[200px] left-[0px] opacity-0"
                src="/assets/section-4/2.svg"
                alt=""
              />
              <img
                className="section-4-img-3 absolute top-[400px] w-[180px] right-[20px] opacity-0"
                src="/assets/section-4/3.svg"
                alt=""
              />
              <img
                className="section-4-img-4 absolute top-[500px] w-[200px] left-[0px] opacity-0"
                src="/assets/section-4/4.svg"
                alt=""
              />
              <img
                className="section-4-img-5 absolute top-[570px] w-[180px] right-[20px] opacity-0"
                src="/assets/section-4/5.svg"
                alt=""
              />
              <p className="section-4-text absolute top-[760px] w-[320px] left-[20px] text-white text-sm font-mono opacity-0">
                mulai sering jalan cihuyyyy
                <br /> <br />
                kongser, kota tua, ngemall, ketemuan after office, ayam geprek
                ketoprakk <br /> <br />
                asiqnyoooooo, OIYAA banyak photobooth jugaaaa hehehee
                <br /> <br />
                bogos binted?
              </p>
            </div>
          </div>
          {/* section 5 */}
          <div
            className="section-5-container relative"
            style={{ minHeight: '1000px' }}
          >
            <img
              className="section-5-img-1 absolute top-[40px] scale-200 z-20 left-[-80px] rotate-6 opacity-0"
              src="/assets/section-5/1.svg"
              alt=""
            />
            <img
              className="section-5-img-2 absolute top-[160px] scale-200 z-20 right-[-100px] -rotate-6 opacity-0"
              src="/assets/section-5/3.svg"
              alt=""
            />
            <img
              className="section-5-img-3 absolute top-[280px] scale-200 z-20 left-[-80px] rotate-6 opacity-0"
              src="/assets/section-5/2.svg"
              alt=""
            />
          </div>

          {/* section 6 */}
          <div
            className="section-6-container relative  -translate-y-[600px]"
            style={{ minHeight: '1000px' }}
          >
            <img
              className="section-6-img-1 w-[380px] absolute top-[150px] z-20 left-[10px] rotate-3 opacity-0"
              src="/assets/section-6/1.svg"
              alt=""
            />
            <img
              className="section-6-img-2 absolute top-[100px] w-[200px] z-20 -left-[60px] -rotate-6 opacity-0"
              src="/assets/section-6/3.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
