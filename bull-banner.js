/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./bull-calendar.js";
import "./bull-roster.js";
import "./bull-events.js";


/**
 * `bull-banner`
 * 
 * @demo index.html
 * @element bull-banner
 */
export class BullBanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-banner";
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
      background: #8d775f;
      color: #f1f0cc;
      padding: calc(var(--ddd-spacing-3, 0.75rem) + 0.5rem);
      margin-bottom: var(--ddd-spacing-4, 1rem);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    }
      .top-banner .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ddd-spacing-4, 1rem);
      margin: 0;
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
      color: #5a2a2f;
      font-weight: 400;
    }
    .header-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: flex-end;
    }
    .header-buttons button {
      background: #a71d31;
      color: #f1f0cc;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 999px;
      cursor: pointer;
      font: inherit;
    }
    .header-buttons button:hover {
      background: #8a1827;
    }
    .title-wrapper img {
      cursor: pointer;
    }
    .title-wrapper img:hover {
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }
    `];
  }

  handleCalendarClick = () => {
    this.dispatchEvent(new CustomEvent('calendar-click', { bubbles: true, composed: true }));
  };

  handleHomeClick = () => {
    this.dispatchEvent(new CustomEvent('home-click', { bubbles: true, composed: true }));
  };

  // Lit render the HTML
  render() {
  return html`

    <div class="top-banner">
      <header class="page-header">
        <div class="title-wrapper">
          <img src="bull-icon-color.png" alt="Bull icon" @click=${this.handleHomeClick}>
          <div class="title-text">
            <h1>Bull Poker League</h1>
            <h2>Home of the Holy Cow High Rollers</h2>
          </div>
        </div>
        <div class="header-buttons">
          <button @click=${this.handleCalendarClick} id="calendarBtn">Calendar</button>
          <button id="playersBtn">Players</button>
          <button id="bullsBtn">Bulls</button>
          <button id="aboutBtn">About</button>
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

globalThis.customElements.define(BullBanner.tag, BullBanner);