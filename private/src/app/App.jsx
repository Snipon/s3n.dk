
// Depenedencies.
import React from 'react'
import { Switch, Route } from 'react-router'
import 'whatwg-fetch'
import Prismic from 'prismic.io'
import PrismicToolbar from 'prismic-toolbar'
import PrismicConfig from 'tools/prismic-configuration'
// Components.
import Page from 'components/Page'
import SiteFooter from 'components/SiteFooter'
// Styles.
import 'styles/main.scss'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      prismicCtx: null
    }
  }

  componentWillMount () {
    this.buildContext().then((prismicCtx) => {
      this.setState({ prismicCtx })
    }).catch((e) => {
      console.error(`Cannot contact the API, check your prismic configuration:\n${e}`)
    })
  }

  refreshToolbar () {
    const maybeCurrentExperiment = this.api.currentExperiment()
    if (maybeCurrentExperiment) {
      PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId())
    }
    PrismicToolbar.setup(PrismicConfig.apiEndpoint)
  }

  buildContext () {
    const accessToken = PrismicConfig.accessToken
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      endpoint: PrismicConfig.apiEndpoint,
      accessToken,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: this.refreshToolbar
    }))
  }

  render () {
    return (
      this.state.prismicCtx
        ? <div className='page-wrapper'>
          <header className='sitemast'><h1 className='site-name'>Simon</h1></header>
          <Switch>
            <Route exact path='/'>
              <Page page='front' prismicCtx={this.state.prismicCtx} />
            </Route>
          </Switch>
          <SiteFooter />
        </div> : false
    )
  }
}

export default App
