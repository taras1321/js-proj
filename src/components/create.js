import { Component } from '../core/component'
import { service } from '../services/service'

export class Create extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))
  }
}

async function submitHandler(event) {
  event.preventDefault()

  const formData = {
    type: this.$el.type.value,
    date: new Date().toLocaleDateString(),
    title: this.$el.title.value,
    fullext: this.$el.fulltext.value,
  }

  this.$el.title.value = ''
  this.$el.fulltext.value = ''

  await service.createPost(formData)

  alert('Post created')
}
