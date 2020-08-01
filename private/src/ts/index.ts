import { LitElement, html, customElement, TemplateResult } from 'lit-element';

import './components/header';
import './components/anim';

@customElement('app-root')
export default class extends LitElement {
  render(): TemplateResult {
    return html` <three-anim></three-anim> `;
  }
}
document.body.style.margin = '0';
document.body.innerHTML = '<app-root />';
