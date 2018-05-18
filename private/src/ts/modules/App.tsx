import 'Styles/reset'
import 'Styles/root'
import 'Styles/typo'

import Header from 'Modules/regions/Header'
import Main from 'Modules/regions/Main'
import Footer from 'Modules/regions/Footer'

import Anim from 'Modules/components/Anim'

import { h } from 'preact'

export default () => (
  <div>
    <div className='root'>
      <Header />
      <Main />
      <Footer />
    </div>
    <Anim />
  </div>
)
