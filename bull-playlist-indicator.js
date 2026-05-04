/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `bull-playlist-indicator`
 *
 * @demo index.html
 * @element bull-playlist-indicator
 */
export class BullPlaylistIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-playlist-indicator";
  }

  constructor() {
    super();
    this.count = 0;
    this.active = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      count: { type: Number },
      active: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .indicators {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2, 8px);
        padding: var(--ddd-spacing-3, 12px) 0;
      }
      button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: var(--ddd-border-sm) var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-default-potential0);
        cursor: pointer;
        padding: var(--ddd-spacing-0);
        transition: background-color 0.2s;
      }
      button.active {
        background-color: var(--ddd-theme-default-white);
      }
      button:hover {
        background-color: var(--ddd-theme-default-white);
      }
    `];
  }

  _handleDotClick(index) {
    this.dispatchEvent(new CustomEvent('indicator-clicked', {
      detail: { index },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="indicators">
        ${Array.from({ length: this.count }, (_, i) => html`
          <button
            class="${i === this.active ? 'active' : ''}"
            @click="${() => this._handleDotClick(i)}"
            aria-label="Go to image ${i + 1}"
          ></button>
        `)}
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(BullPlaylistIndicator.tag, BullPlaylistIndicator);
