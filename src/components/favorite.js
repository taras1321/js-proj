import { Component } from '../core/component'
import { service } from '../services/service'
import { renderPost } from '../templates/post.template'

export class Favorite extends Component {
  constructor(id, loader) {
    super(id)

    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'))

    const html = rednderList(favorites)

    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(event) {
  event.preventDefault()

  if (event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.id
    this.$el.innerHTML = ''

    this.loader.show()
    const post = await service.fetchPostById(postId)

    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, false))
  }
}

function rednderList(list = []) {
  if (list && list.length) {
    return `
      <ul>
        ${list
          .map(
            (i) =>
              `<li><a href="#" class="js-link" data-id="${
                i.id
              }">${i.title.toUpperCase()}</a></li>`
          )
          .join(' ')}
      
      </ul>
    `
  }

  return `<p class="center">You haven't added anything yet</p>`
}
