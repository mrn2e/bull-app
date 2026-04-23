/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */

class BullEvents extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          padding: var(--ddd-spacing-4);
        }
        #events {
          max-width: 1200px;
          margin: 0 auto;
        }
        .events-container {
          max-height: 400px;
          overflow-y: auto;
          border: var(--ddd-border-xs);
          padding: var(--ddd-spacing-2);
        }
        .event-item {
          margin: var(--ddd-spacing-1) 0;
          padding: var(--ddd-spacing-2);
          background-color: var(--ddd-theme-default-slateMaxLight);
          border-radius: var(--ddd-radius-xs);
          cursor: pointer;
        }
        .event-item:hover {
          background-color: var(--ddd-theme-default-slateLight);
        }
      </style>
      <div id="events"></div>
    `;
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const response = await fetch('./bull-calendar-events-data.json');
      const events = await response.json();
      this.renderEvents(events);
    } catch (error) {
      console.error('Error loading events:', error);
      this.renderEvents([]);
    }
  }

  renderEvents(events) {
    const el = this.querySelector('#events');
    let html = '<h3>All Events</h3><div class="events-container">';
    events.forEach(event => {
      html += `<div class="event-item">${event.date}: ${event.type} vs ${event.opponent}</div>`;
    });
    html += '</div>';
    el.innerHTML = html;
  }
}

customElements.define('bull-events', BullEvents);