import { Navigation } from './components/navigation'
import { Posts } from './components/posts'
import { Create } from './components/create'
import { Favorite } from './components/favorite'
import { Loader } from './components/loader'

import './style.css'

const navigation = new Navigation('navigation')
const loader = new Loader('loder')

const posts = new Posts('posts', loader)
const create = new Create('create')
const favorite = new Favorite('favorite', loader)

navigation.registerTabs([
  { name: 'create', component: create },
  { name: 'posts', component: posts },
  { name: 'favorite', component: favorite },
])
