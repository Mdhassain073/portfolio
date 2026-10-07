/* ==========================================================
   GITHUB MISSION CONTROL
========================================================== */

const GitHub = {

    username: "Mdhassain073",

    api: "https://api.github.com/users/",

    repositories: [],

    init(){

        this.loadProfile();

        this.loadRepositories();

    },

/* ==========================================================
   PROFILE
========================================================== */

async loadProfile(){

    try{

        const response = await fetch(

            this.api + this.username

        );

        const user = await response.json();

        this.renderProfile(user);

    }

    catch(error){

        console.error(error);

    }

},

/* ==========================================================
   REPOSITORIES
========================================================== */

async loadRepositories(){

    try{

        const response = await fetch(

            this.api +

            this.username +

            "/repos?sort=updated&per_page=100"

        );

        const repos = await response.json();

        this.repositories = repos;

        this.renderRepositories(repos);

    }

    catch(error){

        console.error(error);

    }

},
/* ==========================================================
   PROFILE UI
========================================================== */

renderProfile(user){

    const githubName =

    document.querySelector(".github-name");

    const githubFollowers =

    document.querySelector(".github-followers");

    const githubRepos =

    document.querySelector(".github-repos");

    const githubAvatar =

    document.querySelector(".github-avatar");

    if(githubName)

        githubName.innerHTML=user.name;

    if(githubFollowers)

        githubFollowers.innerHTML=

        user.followers+" Followers";

    if(githubRepos)

        githubRepos.innerHTML=

        user.public_repos+" Repositories";

    if(githubAvatar)

        githubAvatar.src=user.avatar_url;

},
/* ==========================================================
   REPOSITORY CARDS
========================================================== */

renderRepositories(repositories){

    const container=

    document.querySelector(".projects-grid");

    if(!container) return;

    container.innerHTML="";

    repositories

    .sort((a,b)=>{

        return new Date(b.updated_at)

        -

        new Date(a.updated_at);

    })

    .slice(0,8)

    .forEach(repo=>{

        const card=

        document.createElement("div");

        card.className="mission-card";

        card.innerHTML=`

        <div class="mission-header">

        <span class="status">

        ● ACTIVE

        </span>

        </div>

        <h3>${repo.name}</h3>

        <p>

        ${repo.description||"Cyber Security Project"}

        </p>

        <div class="mission-tech">

        <span>${repo.language||"Unknown"}</span>

        </div>

        <div class="mission-footer">

        <span>

        ⭐ ${repo.stargazers_count}

        </span>

        <span>

        🍴 ${repo.forks_count}

        </span>

        </div>

        <a

        href="${repo.html_url}"

        target="_blank"

        class="launch-btn">

        Launch Repository →

        </a>

        `;

        container.appendChild(card);

    });

}

};

GitHub.init();
/* ==========================================================
   MISSION ANALYZER
========================================================== */

analyzeRepositories(){

    const stats={

        total:0,

        security:0,

        ai:0,

        web:0,

        research:0,

        languages:{}

    };

    this.repositories.forEach(repo=>{

        stats.total++;

        const name=repo.name.toLowerCase();

        const desc=(repo.description||"").toLowerCase();

        const lang=repo.language||"Unknown";

        stats.languages[lang]=(stats.languages[lang]||0)+1;

        if(
            name.includes("vuln") ||
            name.includes("security") ||
            name.includes("zap") ||
            name.includes("scanner") ||
            desc.includes("security")
        ){

            stats.security++;

        }

        if(

            name.includes("ai") ||

            name.includes("ml") ||

            desc.includes("machine learning")

        ){

            stats.ai++;

        }

        if(

            name.includes("web") ||

            name.includes("portfolio") ||

            desc.includes("website")

        ){

            stats.web++;

        }

        if(

            name.includes("research") ||

            name.includes("lab")

        ){

            stats.research++;

        }

    });

    this.renderStatistics(stats);

},
/* ==========================================================
   STATISTICS
========================================================== */

renderStatistics(stats){

    const total=document.querySelector(".stat-total");

    const security=document.querySelector(".stat-security");

    const ai=document.querySelector(".stat-ai");

    const web=document.querySelector(".stat-web");

    if(total) total.innerHTML=stats.total;

    if(security) security.innerHTML=stats.security;

    if(ai) ai.innerHTML=stats.ai;

    if(web) web.innerHTML=stats.web;

    const languageContainer=

    document.querySelector(".language-grid");

    if(languageContainer){

        languageContainer.innerHTML="";

        Object.entries(stats.languages)

        .sort((a,b)=>b[1]-a[1])

        .forEach(language=>{

            const item=document.createElement("div");

            item.className="language-chip";

            item.innerHTML=`

            <span>${language[0]}</span>

            <strong>${language[1]}</strong>

            `;

            languageContainer.appendChild(item);

        });

    }

},
/* ==========================================================
   FILTER
========================================================== */

filter(category){

    const cards=document.querySelectorAll(".mission-card");

    cards.forEach(card=>{

        if(category==="all"){

            card.style.display="block";

            return;

        }

        const text=card.innerText.toLowerCase();

        if(text.includes(category)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}
/* ==========================================================
   START
========================================================== */

async init(){

    await this.loadProfile();

    await this.loadRepositories();

    this.analyzeRepositories();

}

};

window.addEventListener("DOMContentLoaded",()=>{

    GitHub.init();

});
/* ==========================================================
   ANIMATED COUNTERS
========================================================== */

animateCounter(selector,target){

    const element=document.querySelector(selector);

    if(!element) return;

    let count=0;

    const increment=Math.max(1,Math.ceil(target/80));

    const timer=setInterval(()=>{

        count+=increment;

        if(count>=target){

            count=target;

            clearInterval(timer);

        }

        element.textContent=count;

    },20);

},

/* ==========================================================
   FEATURED PROJECT
========================================================== */

featuredProject(){

    if(!this.repositories.length) return;

    const featured=this.repositories

    .sort((a,b)=>{

        return (b.stargazers_count+b.forks_count) -

               (a.stargazers_count+a.forks_count);

    })[0];

    const title=document.querySelector(".featured-title");

    const desc=document.querySelector(".featured-description");

    const lang=document.querySelector(".featured-language");

    const link=document.querySelector(".featured-link");

    if(title) title.textContent=featured.name;

    if(desc) desc.textContent=

        featured.description ||

        "Cyber Security Project";

    if(lang) lang.textContent=

        featured.language || "Unknown";

    if(link) link.href=featured.html_url;

},

/* ==========================================================
   SEARCH
========================================================== */

search(){

    const input=document.querySelector("#projectSearch");

    if(!input) return;

    input.addEventListener("input",(e)=>{

        const keyword=e.target.value.toLowerCase();

        document.querySelectorAll(".mission-card")

        .forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=

                text.includes(keyword)

                ? "block"

                : "none";

        });

    });

},

/* ==========================================================
   AUTO REFRESH
========================================================== */

autoRefresh(){

    setInterval(()=>{

        this.loadRepositories();

    },300000);

},

/* ==========================================================
   COMPLETE INITIALIZATION
========================================================== */

async start(){

    await this.loadProfile();

    await this.loadRepositories();

    this.analyzeRepositories();

    this.featuredProject();

    this.search();

    this.autoRefresh();

}

};

/* ==========================================================
   START
========================================================== */

window.addEventListener("load",()=>{

    GitHub.start();

});
