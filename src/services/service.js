class Service {
  constructor(url) {
    this.url = url
  }

  async createPost(post) {
    try {
      const response = await fetch(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post),
      })
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async fetchPosts() {
    try {
      const response = await fetch(`${this.url}/posts.json`)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async fetchPostById(id) {
    try {
      const response = await fetch(`${this.url}/posts/${id}.json`)
      return await response.json()
    } catch (error) {
      console.error('error')
    }
  }
}

export const service = new Service(
  'https://js-project-b2f38-default-rtdb.europe-west1.firebasedatabase.app'
)
