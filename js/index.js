
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    



    /*MY CODE STARTS HERE */

    const welcomePage = document.querySelector(".welcome-container");
    const blogRetrieved = document.querySelector(".view-blog-result-container");
    const postMakingPage = document.querySelector(".make-post-contaner");
    const form = document.querySelector(".fOrm");
    const postSuccessPage = document.querySelector(".sucess_message");

    // CODE TO NAVIGATE TO GET POST PAGE

    var postPageButton = document.getElementById("view-post");
    postPageButton.addEventListener("click", ()=>{
        welcomePage.classList.add("hide");
        document.querySelector(".view-blog-result-container").classList.add("show");
    })

    document.getElementById("to-home-page").addEventListener("click", ()=>{
        welcomePage.classList.remove("hide");
        document.querySelector(".view-blog-result-container").classList.remove("show");
    })

    // CODE TO NAVIGATE TO POST PAGE

    document.getElementById("make-post").addEventListener("click", ()=>{
        welcomePage.classList.add("hide");
        postMakingPage.classList.add("show");
        // form.classList.add("show");
        
    })

    

    
    /* form field input */

    // const fillField = document.querySelector(".fOrm");
    const username = document.getElementById("user-name");
    const titleOfPost = document.getElementById("content-title");
    const postContent = document.getElementById("post-content-oveview");
    
    const formData = {}
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        verifyForm();
    });
    
    const verifyForm = () => {
        const usernameValue = username.value;
        if (usernameValue === '') {
            document.getElementById("error_user_name").style.display = "block";
            document.getElementById("user-name").classList.toggle("error");
            return;
        }
        formData.userName = usernameValue;

    
        const postTitleValue = String(titleOfPost.value);
        if (postTitleValue === '') {
            document.getElementById("error_title").style.display = "block";
            document.getElementById("content-title").classList.toggle("error");
            return;
        }
        formData.postTitle = postTitleValue;
    
        const postContentValue = String(postContent.value);
        if (postContentValue === '') {
            document.getElementById("error_content").style.display = "block";
            document.getElementById("post-content-oveview").classList.toggle("error");
            return;
        }
        formData.contentPost = postContentValue;

        // console.log(formData);

    };

   
    /* let user = String(formData.userName);
    let postT = String(formData.postTitle );
    let postC = String(formData.contentPost);*/


    

    document.getElementById("make-post-req").addEventListener('click',  ()=> {
        form.classList.add("hide");
        postSuccessPage.classList.add("show");
        getTokenAndCreatePost(formData.postTitle, formData.contentPost)
    })


    // ... (your existing code)

    function getTokenAndCreatePost(postT, postC) {

        const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JpbmNvbXRlYW0uMDAwd2ViaG9zdGFwcC5jb20iLCJpYXQiOjE3MDY2MjE3NzksIm5iZiI6MTcwNjYyMTc3OSwiZXhwIjoxNzA3MjI2NTc5LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.N2glqtqKNXDypPOpRMNwHsvmoynxtk6miGN1wJWpjW4";
    
        const createPostEndpoint = 'https://bincomteam.000webhostapp.com/wp-json/wp/v2/posts';
    
        const postData = {
            title: postT,
            content: postC,
            status: 'publish'
          };
        
          // Make the POST request
    
          const postOption = {
            method: 'POST',
            params:{
                title: formData.postTitle,
                content: formData.contentPost,
                status: 'publish'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
              },
              body: JSON.stringify(postData)
    
          }
          fetch(createPostEndpoint, postOption)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error creating post. Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            document.getElementById("success").textContent = "SUCCESSFUL"
            // console.log('Post created successfully:', data);
          })
          .catch(error => {
          document.getElementById("success").textContent = "SUCCESSFUL";
            console.error('Error:', error);
          });
    
    }




   // GETTING FUNCTION STARTTS HERE

   const makePost = document.getElementById("get-post request");
   makePost.addEventListener("click", ()=>{
       getPosts();
   })

   const getPosts = ()=>{

    const apiUrl = 'https://bincomteam.000webhostapp.com/wp-json/wp/v2/posts';

    fetch(apiUrl)
   .then(response => response.json())
   .then(posts => {
     // Display posts in the container
     const postsContainer = document.getElementById('post-contents-retrieved');

     posts.forEach(post => {
         const postElement = createPostElement(post);
         postsContainer.appendChild(postElement);
       });
    })

   .catch(error => {
     console.error('Error fetching posts:', error);
   });


   function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
 
    const titleElement = document.createElement('h2');
    titleElement.className = 'post-title';
    titleElement.textContent = post.title.rendered;
 
    const contentElement = document.createElement('p');
    contentElement.className = 'post-content';
    contentElement.innerHTML = post.content.rendered;
 
    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);
 
    return postElement;
  }

}





 
 

 


}