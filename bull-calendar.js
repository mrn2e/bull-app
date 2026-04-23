/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import './bull-calendar-events.js';

class BullCalendar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          padding: var(--ddd-spacing-4);
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
          background-color: var(--ddd-theme-default-warning);
        }
        .day {
          position: absolute;
          top: var(--ddd-spacing-1);
          right: var(--ddd-spacing-1);
          font-size: var(--ddd-font-size-4xs);
          font-weight: bold;
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
          background-color: #f9f9f9;
          border-radius: var(--ddd-radius-xs);
        }
      </style>
      <div id="calendar"></div>
    `;
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const response = await fetch('./bull-calendar-events-data.json');
      const events = await response.json();
      this.renderCalendar(events);
    } catch (error) {
      console.error('Error loading events:', error);
      this.renderCalendar([]);
    }
  }

  renderCalendar(events) {
    const calendarEl = this.querySelector('#calendar');
    const year = 2026;
    const month = 3;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); 

    let html = '<table><thead><tr>';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => html += `<th>${day}</th>`);
    html += '</tr></thead><tbody><tr>';

    for (let i = 0; i < startDay; i++) {
      html += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if ((startDay + day - 1) % 7 === 0 && day !== 1) {
        html += '</tr><tr>';
      }
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const event = events.find(e => e.date === dateStr);
      const eventHtml = event ? `<bull-calendar-events type="${event.type}" opponent="${event.opponent}"></bull-calendar-events>` : '';
      html += `<td><span class="day">${day}</span>${eventHtml}</td>`;
    }

    const totalCells = startDay + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      html += '<td></td>';
    }

    html += '</tr></tbody></table>';
    let eventsListHtml = '<div id="events-list"><h3>Events</h3><div class="events-container">';
    events.forEach(event => {
      eventsListHtml += `<div class="event-item" onclick="this.dispatchEvent(new CustomEvent('event-clicked', {bubbles: true}))">${event.date}: ${event.type} vs ${event.opponent}</div>`;
    });
    eventsListHtml += '</div></div>';
    html += eventsListHtml;
    calendarEl.innerHTML = html;
  }
}

customElements.define('bull-calendar', BullCalendar);