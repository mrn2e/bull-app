/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./bull-playlist-card.js";
import "./bull-playlist-arrow.js";
import "./bull-playlist-indicator.js";

/**
 * `bull-playlist`
 *
 * @demo index.html
 * @element bull-playlist
 */
export class BullPlaylist extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "bull-playlist";
  }

 constructor() {
  super();
  this.activeIndex = 0;
  this.images = [];
  this.loadRosterData();
}

async loadRosterData() {
  try {
    const response = await fetch(
      new URL("./bull-roster-data.json", import.meta.url)
    );
    const data = await response.json();

    this.images = data.header
      .filter(item =>
        item.alt === "headerimage1" ||
        item.alt === "headerimage2" ||
        item.alt === "headerimage3"
      )
      .map(item => new URL(item.imgSrc, import.meta.url).href);

    this.requestUpdate();
  } catch (e) {
    console.error("Playlist JSON failed:", e);
  }
}

  static get properties() {
    return {
      ...super.properties,
      images: { type: Array },
      activeIndex: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      .playlist {
        position: relative;
        width: 100%;
        background-color: var(--ddd-theme-default-potentialMidnight);
      }
      .arrows {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 var(--ddd-spacing-3, 12px);
        box-sizing: border-box;
        pointer-events: none;
        z-index: 1;
      }
      .arrows bull-playlist-arrow {
        pointer-events: all;
      }
      .indicators {
        position: absolute;
        bottom: var(--ddd-spacing-0);
        width: 100%;
      }
    `];
  }

  _handleArrow(e) {
    const { direction } = e.detail;
    if (direction === 'left') {
      this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    } else {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }
  }

  _handleIndicator(e) {
    this.activeIndex = e.detail.index;
  }

  render() {
    return html`
      <div class="playlist">
        <bull-playlist-card src="${this.images[this.activeIndex]}"></bull-playlist-card>
        <div class="arrows">
          <bull-playlist-arrow direction="left" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow>
          <bull-playlist-arrow direction="right" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow>
        </div>
        <div class="indicators">
          <bull-playlist-indicator
            count="${this.images.length}"
            active="${this.activeIndex}"
            @indicator-clicked="${this._handleIndicator}"
          ></bull-playlist-indicator>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(BullPlaylist.tag, BullPlaylist);
