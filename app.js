//variables
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

//let variables
let limit = 5;
let page = 1;

//getting posts with fetch
async function getPosts(){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await res.json();
  //res is promise -> to get 'data' we should use await

  return data;
  //when using the data, calling the function, we should use 'await' as well, because data it's also a promise in the 'promise-chain'
}

//show posts we fetched
async function showPosts(){
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postNumber = document.createElement('div');
    postNumber.classList.add('number')
    postNumber.innerText = post.id
    postElement.appendChild(postNumber)

    const postInfo = document.createElement('div');
    postInfo.classList.add('post-info')
    postElement.appendChild(postInfo)

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title')
    postTitle.innerText = post.title
    postInfo.appendChild(postTitle)

    const postBody = document.createElement('p');
    postBody.classList.add('post-body')
    postBody.innerText = post.body
    postInfo.appendChild(postBody)

    //postElement.innerHTML = `
    //<div class="number">${post.id}</div>
    //<div class="post-info">
    //  <h2 class="post-title">${post.title}</h2>
    //  <p class="post-body">${post.body}</p> 
    //</div>
    //`;
    postsContainer.appendChild(postElement)

  })
}

//show the initial posts
showPosts();


//scroll functionality
window.addEventListener('scroll', scrolling);

//////show the loader function
////////////calling more pages
function morePages(){
  setTimeout(() => {
    page++
  showPosts();
  },300)
}
//////////function
function showLoading(){
  loading.classList.add('show')
  setTimeout(() => {
    loading.classList.remove('show')
    morePages();
  }, 1000)
}

function scrolling(){
  //document.documentElement.scrollHeight => reveals the scrollHeight
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  
  if (scrollTop + clientHeight >= scrollHeight - 5){
    //show the loader
    showLoading()
    //fetch the rest of the post
  }
}

//filter functionality

filter.addEventListener('input', filterPosts);

function filterPosts(e){
  const words = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText;
    const body = post.querySelector('.post-body').innerText;

    //match to the words written on filter
    if(title.toUpperCase().indexOf(words) > -1 || body.toUpperCase().indexOf(words) > -1){
      post.style.display = 'flex' //it's original display
    } else {
      post.style.display = 'none'
    }
  })
}




