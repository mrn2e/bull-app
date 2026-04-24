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
 * `bull-pages`
 * 
 * @demo index.html
 * @element bull-pages
 */
export class BullPages extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-pages";
  }

  constructor() {
    super();
    this.activePage = 'calendar';
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
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      nav {
        display: flex;
        gap: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-4);
      }
      nav button {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-sm);
        background-color: var(--ddd-theme-accent);
      }
      nav button:hover {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-accent);
      }
      nav button.active {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-accent);
        font-weight: var(--ddd-font-weight-bold);
      }
      h3 span {
        font-size: var(--bull-app-label-font-size, var(--ddd-font-size-s));
      }
      .team-box {
        background: rgba(61, 33, 18, 0.95);
        border-radius: 1rem;
        padding: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
        box-shadow: inset 0 0 0 1px rgba(241, 240, 204, 0.12);
      }
      .team-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-3);
        padding: 1rem 0;
        border-bottom: 1px solid rgba(241, 240, 204, 0.12);
      }
      .team-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .team-label {
        font-size: 1.25rem;
        font-weight: 700;
        color: #f1f0cc;
        white-space: nowrap;
      }
      .team-images {
        display: grid;
        grid-template-columns: repeat(5, minmax(48px, 1fr));
        gap: 0.75rem;
        width: min(100%, 60%);
      }
      .team-images img {
        width: 100%;
        aspect-ratio: 1 / 1;
        height: auto;
        object-fit: cover;
        border-radius: 0.75rem;
        border: 2px solid rgba(241, 240, 204, 0.14);
      }
    `];
  }

  // Lit render the HTML
  render() {
  return html`
    <div class="wrapper">
      ${this.activePage === 'calendar'
        ? html`<bull-calendar @event-clicked=${() => this.activePage = 'events'}></bull-calendar>`
        : ''}

      ${this.activePage === 'roster'
        ? html`<section class="team-box" aria-label="Players and Bulls overview">
          <div class="team-row">
            <div class="team-label">Players</div>
            <div class="team-images">
              <img src="player1.jpg" alt="Player 1">
              <img src="player2.jpeg" alt="Player 2">
              <img src="player3.png" alt="Player 3">
              <img src="player4.jpg" alt="Player 4">
              <img src="player5.jpg" alt="Player 5">
            </div>
          </div>
          <div class="team-row">
            <div class="team-label">Bulls</div>
            <div class="team-images">
              <img src="bull1.jpg" alt="Bull 1">
              <img src="bull2real.png" alt="Bull 2">
              <img src="bull3real.png" alt="Bull 3">
              <img src="bull4-real.png" alt="Bull 4">
              <img src="bull5.jpg" alt="Bull 5">
            </div>
          </div>
        </section>`
        : ''}

      ${this.activePage === 'about'
        ? html`<div style="padding: var(--ddd-spacing-4);">
            <h2>About the Bull Poker League</h2>
            <p>Welcome to the Bull Poker League, home of the Holy Cow High Rollers. We are a premier poker league featuring the best players and legendary bulls competing for glory and cash prizes.</p>
            <h3>Our Mission</h3>
            <p>To create an exciting and competitive poker environment where skill, strategy, and a bit of luck determine the champions.</p>
            <h3>Featured Players & Bulls</h3>
            <p>Our league showcases talented players competing alongside our iconic bull mascots. Check out our roster to learn more about each participant.</p>
          </div>`
        : ''}
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

globalThis.customElements.define(BullPages.tag, BullPages);