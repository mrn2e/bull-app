/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import './bull-calendar-events.js';
import './bull-playlist-arrow.js';

class BullCalendar extends DDDSuper(I18NMixin(LitElement)) {
  connectedCallback() {
  super.connectedCallback();
  this.loadEvents();
}

  static get properties() {
    return {
      ...super.properties,
      currentMonthIndex: { type: Number },
      year: { type: Number },
      months: { type: Array },
      events: { type: Array },
    };
  }

  constructor() {
  super();

  this.currentMonthIndex = 0;
  this.year = 2026;

  this.months = [
    { name: "March", month: 2 },
    { name: "April", month: 3 },
    { name: "May", month: 4 },
  ];

  this.events = [];
}

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4);
      }
      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--ddd-spacing-4);
      }
      .month-title {
        font-size: var(--ddd-font-size-l);
        font-weight: var(--ddd-font-weight-bold);
      }
      #calendar {
        max-width: 1200px;
        margin: 0 auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: var(--ddd-border-md);
        padding: var(--ddd-spacing-4);
        text-align: left;
        position: relative;
        min-height: 80px;
        background-color: var(--ddd-theme-default-warningLight);
      }
      th {
        background-color: var(--ddd-theme-default-shrineTan);
      }
      .day {
        position: absolute;
        top: var(--ddd-spacing-1);
        right: var(--ddd-spacing-1);
        font-size: var(--ddd-font-size-4xs);
        font-weight: var(--ddd-font-weight-bold);
      }
      #events-list {
        margin-top: var(--ddd-spacing-5);
      }
      .events-container {
        max-height: 200px;
        overflow-y: auto;
        border: var(--ddd-border-xs);
        padding: var(--ddd-spacing-2);
      }
      .event-item {
        margin: var(--ddd-spacing-1) 0;
        padding: var(--ddd-spacing-1);
        background-color: var(--ddd-theme-default-slateMaxLight);
        border-radius: var(--ddd-radius-xs);
      }
    `];
  }

  _handleArrow(e) {
    const { direction } = e.detail;
    if (direction === 'left') {
      this.currentMonthIndex = (this.currentMonthIndex - 1 + this.months.length) % this.months.length;
    } else {
      this.currentMonthIndex = (this.currentMonthIndex + 1) % this.months.length;
    }
  }

  async loadEvents() {
    try {
      const response = await fetch('/api/schedule');
      const events = await response.json();
      this.renderCalendar(events);
    } catch (error) {
      console.error('Error loading events:', error);
      this.events = [];
    }
  }

  render() {
    const currentMonth = this.months[this.currentMonthIndex];
    const month = currentMonth.month;
    const monthName = currentMonth.name;
    const firstDay = new Date(this.year, month, 1);
    const lastDay = new Date(this.year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarRows = [];
    let currentRow = [];

    for (let i = 0; i < startDay; i++) {
      currentRow.push(html`<td></td>`);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if ((startDay + day - 1) % 7 === 0 && day !== 1) {
        calendarRows.push(html`<tr>${currentRow}</tr>`);
        currentRow = [];
      }
      const dateStr = `${this.year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const event = this.events.find(e => e.date === dateStr);
      const eventHtml = event ? html`<bull-calendar-events type="${event.type}" opponent="${event.opponent}"></bull-calendar-events>` : '';
      currentRow.push(html`<td><span class="day">${day}</span>${eventHtml}</td>`);
    }

    const totalCells = startDay + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      currentRow.push(html`<td></td>`);
    }
    calendarRows.push(html`<tr>${currentRow}</tr>`);

    const eventsList = this.events.map(event => html`
      <div class="event-item" @click="${() => this.dispatchEvent(new CustomEvent('event-clicked', {bubbles: true}))}">
        ${event.date}: ${event.type} vs ${event.opponent}
      </div>
    `);

    return html`
      <div class="calendar-header">
        <bull-playlist-arrow direction="left" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow>
        <div class="month-title">${monthName} ${this.year}</div>
        <bull-playlist-arrow direction="right" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow>
      </div>
      <div id="calendar">
        <table>
          <thead>
            <tr>
              ${daysOfWeek.map(day => html`<th>${day}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${calendarRows}
          </tbody>
        </table>
        <div id="events-list">
          <h3>Events</h3>
          <div class="events-container">
            ${eventsList}
          </div>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define("bull-calendar", BullCalendar);