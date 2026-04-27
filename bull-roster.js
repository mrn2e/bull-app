/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `bull-app`
 * 
 * @demo index.html
 * @element bull-roster
 */
export class BullRoster extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-roster";
  }

  static rosterData = null;

  constructor() {
    super();
    this.loadRosterData();
    
   }

  async loadRosterData() {
    if (BullRoster.rosterData) return;
    try {
      const response = await fetch('/bull-roster-data.json');
      BullRoster.rosterData = await response.json();
      this.requestUpdate();
    } catch (e) {
      console.error('Failed to load roster data:', e);
    }
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: contents;
      }
      img {
        width: 100%;
        aspect-ratio: 1 / 1;
        height: auto;
        object-fit: cover;
        border-radius: 12px;
        border: var(--ddd-border-xs) var(--ddd-theme-default-original87Pink);
      }
    `];
  }

  // Lit render the HTML
  render() {
  const team = this.classList.contains('bulls') ? 'bulls' : 'players';
  const rosterData = BullRoster.rosterData || {};
  const roster = rosterData[team] || rosterData.players || [];

  return html`
    ${roster.map(item => html`
      <img
        src="${item.imgSrc}"
        alt="${item.alt}"
        loading="lazy"
      >
    `)}
  `;
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(BullRoster.tag, BullRoster);