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
          background-color: var(--ddd-theme-default-original87Pink);
          border: var(--ddd-border-xs);
          padding: 4px 8px;
          margin: 2px 0;
          cursor: pointer;
          border-radius: var(--ddd-radius-xs);
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-alertUrgent);
        }
        .event:hover {
          background-color: var(--ddd-theme-default-warningLight);
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