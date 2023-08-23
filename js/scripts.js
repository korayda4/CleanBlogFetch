const posts = document.querySelector(".postList")
const clickArea = document.querySelector(".post-title")
const head = document.querySelector(".head")
const subHead = document.querySelector(".subheading")
const image = document.querySelector(".masthead")



/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

console.time("he")

const FetchData = async (url) => {
    return await fetch(url).then(Response => Response.json())
}

function find (veriable,x) {
    return veriable.find(a => a.id === x.id)
} 

async function LoadData () {
   let post = await FetchData("http://localhost:1337/api/posts")
   let user = await FetchData("https://jsonplaceholder.org/users")

   post.data.forEach(x => {
       posts.innerHTML += `<div class="post-preview" id="${x.id}">
            <a class="detail">
                <h2 class="post-title">${x.attributes.post}</h2>
                <h3 class="post-subtitle">${x.attributes.summary}</h3>
                <h4 class="content">${x.attributes.content}</h4>
            </a>
            <p class="post-meta">
                Posted by
                <a href="#!">${find(user,x).firstname} ${find(user,x).lastname}</a>
                ${x.attributes.publishedAt}
            </p>
        </div>
        <hr class="my-4" />`
        bindClick()
   });  
}
console.timeEnd("he")
LoadData()

const bindClick = () => {
    for (const btn of document.querySelectorAll(".detail")){
        btn.addEventListener("click",(e) => {
            
            // console.log("za");
            head.innerHTML = e.target.parentElement.children[0].textContent
            subHead.innerHTML = e.target.parentElement.children[1].textContent
            posts.innerHTML = e.target.parentElement.children[2].textContent
            image.style = "background-image: url('assets/img/post-bg.jpg')"
        })
    }
}
// clickArea.addEventListener("click",console.log("hea"))


