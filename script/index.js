// Image Preview
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("preview");

if (imageInput) {
    imageInput.addEventListener("change", function () {
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.visibility = "visible";
            };
            reader.readAsDataURL(file);
        }
    });
}


// Add the form submission from post to array
const form = document.getElementById("blogForm");
if (form) {
form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = {
        id: Math.random().toString(36).substring(2, 10),
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        image: imageInput.files.length > 0 ? imagePreview.src : null,
        date: new Date().toLocaleDateString(),
    };

    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    alert("Blog post added successfully!");
    window.location.href = "/blog/index.html";
    displayBlogPosts();
});
}

// Function to display the blog posts in index.html (Home page)
function displayBlogPosts() {
 const blogList = document.getElementById("blog-list");

if (blogList) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    console.log(blogs);
    if (blogs.length === 0) {
        blogList.innerHTML = "<p>NO BLOG POSTS AVAILABLE</p>";
        blogList.style.textAlign = "center";
        blogList.style.fontSize = "20px";
        blogList.style.fontWeight = "bold";
        blogList.style.color = "red";
    } else {
        blogs.forEach(blog => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                ${
                    blog.image
                        ? `<img src="${blog.image}" width="300">`
                        :  ``
                }
                <p>${blog.date}</p>
            `;
            blogList.appendChild(li);
        });
    }
}
}

displayBlogPosts();