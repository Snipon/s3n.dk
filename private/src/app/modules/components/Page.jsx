
// Dependencies.
import React from 'react';
// Components;
import NotFound from 'components/NotFound';
// Styles.
import 'styles/components/Page.scss';

// Declare your componen
class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      doc: null,
      images: null,
      notFound: false,
    };
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  async fetchPage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return this.props.prismicCtx.api.getByUID('page', this.props.page, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({
            doc,
            images: {
              desktop: doc.getImage('page.main_image').url,
              tablet: doc.getImageView('page.main_image', 'tablet').url,
              mobile: doc.getImageView('page.main_image', 'mobile').url,
            }
          });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  render() {
    const { doc, images } = this.state;
    if (doc) {
      return (
        <main className="page content" data-wio-id={this.state.doc.id}>
          <figure className="main-image">
            <img
              alt="cover"
              src={images.desktop}
              srcSet={`${images.tablet} 900w, ${images.mobile} 400w`}
            />
          </figure>
          <div className="page__content">
            <h1 className="page__title heading">{this.state.doc.getText('page.title')}</h1>
            <div dangerouslySetInnerHTML={{ __html: this.state.doc.getStructuredText('page.body').asHtml() }} />
          </div>
        </main>
      );
    } else if (this.state.notFound) {
      return <h1>Nope!</h1>;
    }
    return <h1>Loading</h1>;
  }
}

export default Page;
