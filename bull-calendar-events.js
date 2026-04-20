/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */

class BullCalendarEvents extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || '';
    const opponent = this.getAttribute('opponent') || '';
    this.innerHTML = `
      <style>
        .event {
          background-color: #a71d31;
          border: 1px solid #ccc;
          padding: 4px 8px;
          margin: 2px 0;
          cursor: pointer;
          border-radius: 4px;
          font-size: 12px;
        }
        .event:hover {
          background-color: #f10cc;
        }
      </style>
      <div class="event">${type} vs ${opponent}</div>
    `;
    this.querySelector('.event').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('event-clicked', { bubbles: true }));
    });
  }
}

customElements.define('bull-calendar-events', BullCalendarEvents);