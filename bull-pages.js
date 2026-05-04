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
import menuData from './api/menu.json';

let rosterData = null;

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
    this.loadRosterData();
  }

  async loadRosterData() {
    if (rosterData) return;
    try {
      const response = await fetch(new URL('./bull-roster-data.json', import.meta.url));
      rosterData = await response.json();
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
      activePage: { type: String, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-original87Pink);
        background-color: var(--ddd-theme-default-alertUrgent);
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
        background: var(--ddd-theme-default-original87Pink);
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
        box-shadow: var(--ddd-boxShadow-sm) var(--ddd-theme-default-original87Pink);
      }
      .team-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-3);
        padding: 16px 0;
        border-bottom: var(--ddd-border-xs) var(--ddd-theme-default-original87Pink);
      }
      .team-row:last-child {
        border-bottom: none;
        padding-bottom: var(--ddd-spacing-0);
      }
      .team-label {
        font-size: var(--ddd-font-size-3xs);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-slateMaxLight);
        white-space: nowrap;
      }
      .team-images {
        display: grid;
        grid-template-columns: repeat(5, minmax(48px, 1fr));
        gap: var(--ddd-spacing-3);
        width: min(100%, 60%);
      }
      .team-images img {
        width: 100%;
        aspect-ratio: 1 / 1;
        height: auto;
        object-fit: cover;
        border-radius: var(--ddd-radius-md);
        border: var(--ddd-border-xs) var(--ddd-theme-default-original87Pink);
      }
      iframe {
        width: 100%;
        max-width: 560px;
        height: 315px;
        margin: var(--ddd-spacing-4) 0;
        border-radius: var(--ddd-radius-lg);
        border: none;
      }
    `];
  }

  // Lit render the HTML
  render() {
  return html`
    <div class="wrapper">
      <nav>
        ${menuData?.[0]?.links?.map(link => html`
          <button 
            class="${this.activePage === link.page ? 'active' : ''}"
            @click=${() => this.activePage = link.page}
          >
            ${link.label}
          </button>
        `) || ''}
      </nav>
      ${this.activePage === 'calendar'
        ? html`<bull-calendar @event-clicked=${() => this.activePage = 'events'}></bull-calendar>`
        : ''}

      ${this.activePage === 'roster'
        ? html`<section class="team-box" aria-label="Players and Bulls overview">
          <div class="team-row">
            <div class="team-label">Players</div>
            <div class="team-images">
              <img src="/images/player1.jpg" alt="Player 1" loading="lazy">
              <img src="/images/player2.jpeg" alt="Player 2" loading="lazy">
              <img src="/images/player3.png" alt="Player 3" loading="lazy">
              <img src="/images/player4.jpg" alt="Player 4" loading="lazy">
              <img src="/images/player5.jpg" alt="Player 5" loading="lazy">
            </div>
          </div>
          <div class="team-row">
            <div class="team-label">Bulls</div>
            <div class="team-images">
              <img src="/images/bull1.jpg" alt="Bull 1" loading="lazy">
              <img src="/images/bull2real.png" alt="Bull 2" loading="lazy">
              <img src="/images/bull3real.png" alt="Bull 3" loading="lazy">
              <img src="/images/bull4-real.png" alt="Bull 4" loading="lazy">
              <img src="/images/bull5.jpg" alt="Bull 5" loading="lazy">
            </div>
      </div>
          </section>
          
          <p style="padding: var(--ddd-spacing-4); color: var(--ddd-theme-default-original87Pink);">
            Our majestic bulls are the heart of the Bull Poker League. These magnificent creatures represent strength, tradition, and the wild spirit of competition.
          </p>
        `
        : ''}

      ${this.activePage === 'about'
        ? html`<div style="padding: var(--ddd-spacing-4);">
            <h2>About the Bull Poker League</h2>
            <p>Welcome to the Bull Poker League, home of the Holy Cow High Rollers. We are a premier poker league featuring the best players and legendary bulls competing for glory and cash prizes.</p>
            <h3>Our Mission</h3>
            <p>To create an exciting and competitive poker environment where skill, strategy, and a bit of luck determine the champions.</p>
            <h3>Featured Players & Bulls</h3>
            <p>Our league showcases talented players competing alongside our iconic bull mascots. Check out our roster to learn more about each participant.</p>
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/z7uSSd8IhCw" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
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