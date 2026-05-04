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
 * `bull-banner`
 * 
 * @demo index.html
 * @element bull-banner
 */
export class BullBanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-banner";
  }

  constructor() {
    super();
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
      dropdownOpen: { type: Boolean, reflect: true },
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
      border-radius: var(--ddd-radius-sm);
    }
    .title-text h1,
    .title-text h2 {
      margin: var(--ddd-spacing-0);
    }
    .title-text h1 {
      font-size: var(--ddd-font-size-3xs);
      line-height: 1.1;
    }
    .title-text h2 {
      font-size: var(--ddd-font-size-3xs);
      color: var(--ddd-theme-default-error);
      font-weight: var(--ddd-font-weight-regular);
    }
    .header-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ddd-spacing-3);
      justify-content: flex-end;
    }
    .custom-dropdown {
      position: relative;
    }
    .dropdown-toggle {
      background: var(--ddd-theme-default-original87Pink);
      color: var(--ddd-theme-default-warningLight);
      padding: 12px 24px;
      border-radius: var(--ddd-radius-rounded);
      cursor: pointer;
      font: inherit;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .dropdown-toggle:hover {
      background: var(--ddd-theme-default-original87PinkHover);
    }
    .dropdown-toggle:focus {
      outline: 2px solid var(--ddd-theme-default-warningLight);
      outline-offset: 2px;
    }
    .dropdown-arrow {
      transition: transform 0.2s ease;
      font-size: 0.8em;
    }
    .dropdown-arrow.open {
      transform: rotate(180deg);
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--ddd-theme-default-original87Pink);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      z-index: 9999;
      min-width: 120px;
      margin-top: 4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: none;
      overflow: hidden;
    }
    .dropdown-menu.open {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .dropdown-item {
      background: none;
      color: var(--ddd-theme-default-warningLight);
      padding: 1rem;
      border: none;
      cursor: pointer;
      font: inherit;
      width: 100%;
      text-align: left;
      border-radius: 0;
    }
    .dropdown-item:hover {
      background: var(--ddd-theme-default-original87PinkHover);
    }
    .dropdown-item:first-child,
    .dropdown-item:last-child,
    .dropdown-item:only-child {
      border-radius: 0;
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

  handleRosterClick = () => {
    this.dispatchEvent(new CustomEvent('roster-click', { bubbles: true, composed: true }));
  };

  handleAboutClick = () => {
    this.dispatchEvent(new CustomEvent('about-click', { bubbles: true, composed: true }));
  };

  handleHomeClick = () => {
    this.dispatchEvent(new CustomEvent('home-click', { bubbles: true, composed: true }));
  };

  toggleDropdown = (e) => {
    e.stopPropagation();
    console.log('toggleDropdown called with event:', e);
    console.log('Toggling dropdown, current state:', this.dropdownOpen);
    this.dropdownOpen = !this.dropdownOpen;
    console.log('New dropdown state:', this.dropdownOpen);
  };

  handleDropdownClick = (page) => {
    if (page === 'calendar') {
      this.handleCalendarClick();
    } else if (page === 'roster') {
      this.handleRosterClick();
    } else if (page === 'about') {
      this.handleAboutClick();
    }
    this.dropdownOpen = false;
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const path = e.composedPath ? e.composedPath() : [];
    if (!path.includes(this)) {
      this.dropdownOpen = false;
    }
  };

  // Lit render the HTML
  render() {
  const headerData = rosterData?.header?.find(item => item.alt === 'bullicon');
  const dropdownClasses = `dropdown-menu ${this.dropdownOpen ? 'open' : ''}`;
  return html`

    <div class="top-banner">
      <header class="page-header">
        <div class="title-wrapper">
          <img src="${headerData?.imgSrc || '/images/bull-icon-color.png'}" alt="Bull icon" loading="lazy" @click=${this.handleHomeClick}>
          <div class="title-text">
            <h1>Bull Poker League</h1>
            <h2>Home of the Holy Cow High Rollers</h2>
          </div>
        </div>
        <div class="header-buttons">
          <div class="custom-dropdown">
            <button @click=${this.toggleDropdown} class="dropdown-toggle">
              Menu
              <span class="dropdown-arrow ${this.dropdownOpen ? 'open' : ''}">▼</span>
            </button>
            <div class="${dropdownClasses}">
              ${menuData?.[0]?.links?.map(link => html`
                <button @click=${() => this.handleDropdownClick(link.page)} class="dropdown-item">${link.label}</button>
              `) || ''}
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

globalThis.customElements.define(BullBanner.tag, BullBanner);