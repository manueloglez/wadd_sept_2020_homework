const API_URL = 'http://localhost:3000/api/v1'

const Post = {
  index() {
    return fetch(`${API_URL}/posts`)
      .then(res => {
        return res.json()
      })
  }, 
  create(params) {
    return fetch(`${API_URL}/posts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => {
      return res.json()
    })
  }, 
  show(id) {
    return fetch(`${API_URL}/posts/${id}`)
    .then( res => res.json() )
  },
  delete(id) {
    return fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  },
  edit(id, params) {
    console.log(params)
    return fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => {
      return res.json()
    })
  }, 
}

const Session = {
  create(params) {
    return fetch(`${API_URL}/session`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  }
}

Session.create({
  email: 'mang.95@gmail.com',
  password: '123'
}).then(res => console.log(res.json()))


function navigateTo(id){
  document.querySelectorAll('.page').forEach(node => {
    node.classList.remove('active')
  })
  document.querySelector(`.page#${id}`).classList.add('active')
}

function loadPosts() {
  const postList = document.querySelector('.post-list')
  Post.index().then(res => {
    console.log(res)
    let string = ''
    res.forEach(p => {
      string += `
      <li>
        <a href="#" class="post-link" onclick="renderPostShow(${p.id})">${p.title}</a>
      </li>
      `
    })
    postList.innerHTML = string
  })
}

loadPosts()

function renderPostShow(id) {
  const showPage = document.querySelector('.page#post-show')
  Post.show(id).then(post => {
    const postHTML = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <a href="#" onclick="editPost(${id})"><button>Edit</button></a>
    <a href="#" onclick="deletePost(${id})"><button>Delete</button></a>
    `
    showPage.innerHTML = postHTML
    navigateTo('post-show')
  })
}

function editPost(id) {
  Post.show(id).then(postData => {
    console.log(postData)
    document.querySelector('#edit-post-form [name=title]').value=postData.title
    document.querySelector('#edit-post-form [name=body]').value=postData.body
    document.querySelector('#edit-post-form [name=id]').value=postData.id
  }).then(() => {
    navigateTo('post-edit')
  })
}

function deletePost(id){
  Post.delete(id).then(() => {
    loadPosts()
  }).then(() => {
    navigateTo('post-index')
  })
}

const editpostForm = document.querySelector('#edit-post-form')
editpostForm.addEventListener('submit', event => {
  event.preventDefault()
  const editFormData = new FormData(event.currentTarget)
  const updatedpostParams = {
    title: editFormData.get('title'), 
    body: editFormData.get('body'),
  }
  const editId = editFormData.get('id')
  console.log(editId)
  Post.edit(editId, updatedpostParams).then(res => {
    console.log(res)
    renderPostShow(editId)
  })
})

const newpostForm = document.querySelector('#new-post-form')
newpostForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget
  const formData = new FormData(form)
  const object = {
    title: formData.get('title'),
    body: formData.get('body')
  }
  Post.create(object).then(p => {
    if(p.errors) console.log(p.errors)
    renderPostShow(p.id)
  })
})