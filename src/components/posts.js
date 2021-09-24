import { Component } from '../core/component'
import { service } from '../services/service'
import { renderPost } from '../templates/post.template'

export class Posts extends Component {
  constructor(id, loader) {
    super(id)

    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const fbData = await service.fetchPosts()

    const posts = transformData(fbData)

    const html = posts.map((post) => renderPost(post, true))

    this.loader.hide()

    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

function transformData(data) {
  return Object.keys(data).map((key) => {
    const item = data[key]
    item.id = key

    return item
  })
}

function buttonHandler(event) {
  const id = event.target.dataset.id
  const title = event.target.dataset.title

  if (id) {
    let favorites =
      JSON.parse(localStorage.getItem('favorites')) || []
    const candidat = favorites.find((p) => p.id === id)

    if (candidat) {
      // delete elem
      event.target.textContent = 'Save to favorites'
      event.target.classList.add('btn-green')
      event.target.classList.remove('btn-red')
      favorites = favorites.filter((p) => p.id !== id)
    } else {
      // add elem
      event.target.textContent = 'Delete from favorites'
      event.target.classList.remove('btn-green')
      event.target.classList.add('btn-red')
      favorites.push({ id, title })
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}
