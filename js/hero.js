/* ==========================================================
   HERO ENGINE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    HeroEngine.init();

});

const HeroEngine = {

    init() {

        this.cache();

        this.typing();

        this.parallax();

        this.profileTilt();

        this.buttonEffects();

        this.socialHover();

        this.scrollReveal();

    },

    cache() {

        this.hero = document.querySelector("#hero");

        this.profile = document.querySelector(".profile-wrapper");

        this.aiCore = document.querySelector(".ai-core");

        this.buttons = document.querySelectorAll(".primary-btn,.secondary-btn");

        this.icons = document.querySelectorAll(".floating-icons div");

    },

/* ==========================================================
   TYPING
========================================================== */

typing() {

    if(typeof Typed === "undefined") return;

    new Typed("#typed",{

        strings:[

            "Cyber Security Engineer",

            "Security Researcher",

            "SOC Analyst",

            "Bug Hunter",

            "Founder of VulnXploit"

        ],

        typeSpeed:55,

        backSpeed:30,

        backDelay:1800,

        smartBackspace:true,

        loop:true

    });

},
/* ==========================================================
   PARALLAX
========================================================== */

parallax(){

    document.addEventListener("mousemove",(e)=>{

        const x=(e.clientX/window.innerWidth)-0.5;

        const y=(e.clientY/window.innerHeight)-0.5;

        if(this.aiCore){

            this.aiCore.style.transform=

            `translate(-50%,-50%)
             rotate(${x*12}deg)
             scale(1.02)`;

        }

    });

},

/* ==========================================================
   PROFILE TILT
========================================================== */

profileTilt(){
    // Handled cleanly by smooth CSS transitions
    return;
},
/* ==========================================================
   AI CORE FOLLOW
========================================================== */

aiCoreFollow(){

    if(!this.aiCore) return;

    document.addEventListener("mousemove",(e)=>{

        const x=(e.clientX/window.innerWidth-.5)*35;

        const y=(e.clientY/window.innerHeight-.5)*35;

        gsap.to(this.aiCore,{

            x:x,

            y:y,

            duration:1.2,

            ease:"power3.out"

        });

    });

},

/* ==========================================================
   FLOATING ICONS
========================================================== */

floatingIcons(){

    if(!this.icons.length) return;

    this.icons.forEach((icon,index)=>{

        gsap.to(icon,{

            y:-20,

            duration:2+index,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut",

            delay:index*.2

        });

        gsap.to(icon,{

            rotate:360,

            duration:20+(index*2),

            repeat:-1,

            ease:"none"

        });

    });

},

/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */

buttonEffects(){

    this.buttons.forEach(btn=>{

        btn.addEventListener("mousemove",(e)=>{

            const rect=btn.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const moveX=(x-rect.width/2)/5;

            const moveY=(y-rect.height/2)/5;

            gsap.to(btn,{

                x:moveX,

                y:moveY,

                duration:.3,

                ease:"power2.out"

            });

        });

        btn.addEventListener("mouseleave",()=>{

            gsap.to(btn,{

                x:0,

                y:0,

                duration:.5,

                ease:"elastic.out(1,0.4)"

            });

        });

    });

},

/* ==========================================================
   SOCIAL ICON HOVER
========================================================== */

socialHover(){

    document.querySelectorAll(".hero-social a").forEach(icon=>{

        icon.addEventListener("mouseenter",()=>{

            gsap.to(icon,{

                scale:1.2,

                rotation:12,

                duration:.4

            });

        });

        icon.addEventListener("mouseleave",()=>{

            gsap.to(icon,{

                scale:1,

                rotation:0,

                duration:.4

            });

        });

    });

},
/* ==========================================================
   HERO REVEAL
========================================================== */

scrollReveal(){

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-title",{

        y:80,

        opacity:0,

        duration:1.2,

        ease:"power4.out"

    });

    gsap.from(".hero-description",{

        y:50,

        opacity:0,

        delay:.4,

        duration:1

    });

    gsap.from(".hero-buttons",{

        y:40,

        opacity:0,

        delay:.7,

        duration:1

    });

    gsap.from(".profile-wrapper",{

        scale:.5,

        opacity:0,

        duration:1.6,

        ease:"back.out(1.7)"

    });

}

};

/* ==========================================================
   START EXTRA EFFECTS
========================================================== */

window.addEventListener("load",()=>{

    HeroEngine.aiCoreFollow();

    HeroEngine.floatingIcons();

});
/* ==========================================================
   MOUSE SPOTLIGHT
========================================================== */

mouseSpotlight(){

    const spotlight=document.querySelector(".mouse-light");

    if(!spotlight) return;

    document.addEventListener("mousemove",(e)=>{

        gsap.to(spotlight,{

            left:e.clientX,

            top:e.clientY,

            duration:.6,

            ease:"power2.out"

        });

    });

},

/* ==========================================================
   AI CORE ENERGY PULSE
========================================================== */

corePulse(){

    if(!this.aiCore) return;

    gsap.timeline({

        repeat:-1

    })

    .to(this.aiCore,{

        scale:1.04,

        duration:2,

        ease:"power1.inOut"

    })

    .to(this.aiCore,{

        scale:1,

        duration:2,

        ease:"power1.inOut"

    });

},

/* ==========================================================
   PROFILE GLOW
========================================================== */

profileGlow(){

    const glow=document.querySelector(".profile-glow");

    if(!glow) return;

    gsap.to(glow,{

        opacity:.9,

        scale:1.15,

        duration:3,

        repeat:-1,

        yoyo:true,

        ease:"sine.inOut"

    });

},

/* ==========================================================
   RIPPLE EFFECT
========================================================== */

clickRipple(){

    document.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="click-ripple";

        ripple.style.left=e.clientX+"px";

        ripple.style.top=e.clientY+"px";

        document.body.appendChild(ripple);

        gsap.fromTo(

            ripple,

            {

                scale:0,

                opacity:.8

            },

            {

                scale:8,

                opacity:0,

                duration:1,

                ease:"power2.out",

                onComplete(){

                    ripple.remove();

                }

            }

        );

    });

},
/* ==========================================================
   FLOATING SHAPES PARALLAX
========================================================== */

shapeParallax(){

    const shapes=document.querySelectorAll(".floating-shapes span");

    document.addEventListener("mousemove",(e)=>{

        const x=(e.clientX/window.innerWidth-.5);

        const y=(e.clientY/window.innerHeight-.5);

        shapes.forEach((shape,index)=>{

            gsap.to(shape,{

                x:x*(25+(index*10)),

                y:y*(25+(index*10)),

                duration:2,

                ease:"power2.out"

            });

        });

    });

},

/* ==========================================================
   HERO INITIALIZATION
========================================================== */

start(){

    this.aiCoreFollow();

    this.floatingIcons();

    this.mouseSpotlight();

    this.corePulse();

    this.profileGlow();

    this.clickRipple();

    this.shapeParallax();

}

};

/* ==========================================================
   START ENGINE
========================================================== */

window.addEventListener("load",()=>{

    HeroEngine.start();

});
/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

navbarScroll(){

    const navbar=document.getElementById("navbar");

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>60){

            navbar.classList.add("nav-scrolled");

        }else{

            navbar.classList.remove("nav-scrolled");

        }

    });

},

/* ==========================================================
   HERO PARALLAX
========================================================== */

heroParallax(){

    const hero=document.querySelector("#hero");

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        const offset=window.scrollY;

        hero.style.transform=`translateY(${offset*0.12}px)`;

    });

},

/* ==========================================================
   ORBIT SPEED CONTROL
========================================================== */

orbitControl(){

    const rings=document.querySelectorAll(".orbit");

    let speed=0;

    window.addEventListener("mousemove",(e)=>{

        speed=((e.clientX/window.innerWidth)-0.5)*5;

    });

    function animate(){

        rings.forEach((ring,index)=>{

            ring.style.filter=
            `drop-shadow(0 0 ${15+Math.abs(speed*3)}px rgba(0,245,160,.25))`;

        });

        requestAnimationFrame(animate);

    }

    animate();

},

/* ==========================================================
   PROFILE HOVER
========================================================== */

profileHover(){
    // Handled cleanly by CSS transitions
    return;
},

/* ==========================================================
   BUTTON GLOW
========================================================== */

buttonGlow(){

    document.querySelectorAll(".primary-btn,.secondary-btn")

    .forEach(btn=>{

        btn.addEventListener("mouseenter",()=>{

            gsap.to(btn,{

                boxShadow:"0 0 35px rgba(0,245,160,.45)",

                duration:.3

            });

        });

        btn.addEventListener("mouseleave",()=>{

            gsap.to(btn,{

                boxShadow:"0 0 0 rgba(0,245,160,0)",

                duration:.4

            });

        });

    });

},
