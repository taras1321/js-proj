export function renderPost(post, withButton) {
  let type = 'News'

  if (post.type === 'note') {
    type = 'Note'
  }

  const favorites =
    JSON.parse(localStorage.getItem('favorites')) || []
  const caondidat = favorites.find((p) => p.id === post.id)

  const button = caondidat
    ? `<button class="btn-red" data-id="${post.id}" data-title="${post.title}">Delete from favorites</button>`
    : `<button class="btn-green" data-id="${post.id}" data-title="${post.title}">Save to favorites</button>`

  return `
  <div class="panel">
    <div class="panel-head">
      <p class="panel-title">${post.title}</p>
      <div class="${post.type}">${type}</div>
    </div>
    <div class="panel-body">
      <p>${post.fullext}</p>
    </div>
    <div class="panel-footer">
      <span>${post.date}</span>
      ${withButton ? button : ''}
    </div>
  </div>
  `
}
