import { LitElement, html, customElement } from 'lit-element';

@customElement('app-header')
export default class extends LitElement {
  output = 'Test';
  render() {
    return html` <p>${this.output}</p> `;
  }
}
