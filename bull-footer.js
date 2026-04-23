/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";



/**
 * `bull-banner`
 * 
 * @demo index.html
 * @element bull-footer
 */
export class BullFooter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-footer";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      activePage: { type: String, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
    :host {
      display: block;
    }
    .top-banner {
      background: var(--ddd-theme-default-shrineTan);
      color: var(--ddd-theme-default-warningLight);
      padding: calc(var(--ddd-spacing-3, 0.75rem) + 0.5rem);
      margin-bottom: var(--ddd-spacing-4, 1rem);
      box-shadow: var(--ddd-boxShadow-0);
    }
      .top-banner .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ddd-spacing-4, 1rem);
      margin: var(--ddd-spacing-0);
    }
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ddd-spacing-4);
      margin-bottom: var(--ddd-spacing-4);
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-2);
    }
    .title-wrapper img {
      width: 56px;
      height: auto;
      display: block;
      border-radius: 0.5rem;
    }
    .title-text h1,
    .title-text h2 {
      margin: 0;
    }
    .title-text h1 {
      font-size: 1.75rem;
      line-height: 1.1;
    }
    .title-text h2 {
      font-size: 1rem;
      color: var(--ddd-theme-default-error);
      font-weight: var(--ddd-font-weight-regular);
    }
    .title-text {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-2);
    }
    .title-wrapper img {
      cursor: pointer;
    }
    .title-wrapper img:hover {
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }
    .icons {
        display: flex;
        gap: var(--ddd-spacing-2);
    }
    img{
        padding: var(--ddd-spacing-3);
    }
    `];
  }

  // Lit render the HTML
  render() {
  return html`

    <div class="top-banner">
      <header class="page-header">
        <div class="title-wrapper">
          <img src="bull-icon-color.png" alt="Bull icon" @click=${this.handleHomeClick}>
          <div class="title-text">
            <h1>Connect With Us</h1>
            <div class="icons">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qOK7A5IKaNOw-ZPeg_2OOD5ZIW3JOha8FA&s">
                <img src="https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo">
                <img src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw=s256-rw">
            </div>
          </div>
        </div>
        
      </header>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(BullFooter.tag, BullFooter);