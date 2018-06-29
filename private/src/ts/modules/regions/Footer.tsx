import { h } from 'preact'

import 'Styles/components/footer'

export default () => (
  <footer className='region footer'>
    <div className='region--inner'>
      <ul className='footer-links'>
        <li className='footer-links__item'>
          <a href='//github.com/snipon' target='_BLANK' title='GitHub'>
            <i className='fa fa-github' aria-hidden="true" />
          </a>
        </li>
        <li className='footer-links__item'>
          <a href='//www.linkedin.com/in/simonlarsson/' target='_BLANK' title='LinkedIn'>
            <i className='fa fa-linkedin' aria-hidden="true" />
          </a>
        </li>
        <li className='footer-links__item'>
          <a href='//twitter.com/snipon' target='_BLANK' title='Twitter'>
            <i className='fa fa-twitter' aria-hidden="true" />
          </a>
        </li>
        <li className='footer-links__item'>
          <a href='//instagram.com/snipon' target='_BLANK' title='Instagram'>
            <i className='fa fa-instagram' aria-hidden="true" />
          </a>
        </li>
        <li className='footer-links__item'>
          <a href='//keybase.io/snipon' target='_BLANK' title='KeyBase'>
            <i className='fa fa-keybase' aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
)
