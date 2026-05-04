/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `bull-playlist-arrow`
 *
 * @demo index.html
 * @element bull-playlist-arrow
 */
export class BullPlaylistArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-playlist-arrow";
  }

  constructor() {
    super();
    this.direction = "left";
  }

  static get properties() {
    return {
      ...super.properties,
      direction: { type: String },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      button {
        background-color: var(--ddd-theme-default-potential50);
        border: none;
        border-radius: 50%;
        color: var(--ddd-theme-default-white);
        cursor: pointer;
        font-size: var(--ddd-font-size-3xs);
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--ddd-spacing-0);
        transition: background-color 0.2s;
      }
      button:hover {
        background-color: var(--ddd-theme-default-navy40);
      }
    `];
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('arrow-clicked', {
      detail: { direction: this.direction },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <button @click="${this._handleClick}" aria-label="${this.direction === 'left' ? 'Previous' : 'Next'}">
        ${this.direction === 'left' ? '‹' : '›'}
      </button>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(BullPlaylistArrow.tag, BullPlaylistArrow);
