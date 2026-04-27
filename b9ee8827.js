/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class b extends HTMLElement{connectedCallback(){const t=this.getAttribute("type")||"",r=this.getAttribute("opponent")||"";this.innerHTML=`
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
      <div class="event">${t} vs ${r}</div>
    `,this.querySelector(".event").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))})}}customElements.define("bull-calendar-events",b);class m extends HTMLElement{connectedCallback(){this.innerHTML=`
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
      </style>
      <div id="calendar"></div>
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderCalendar(t)}catch(t){console.error("Error loading events:",t),this.renderCalendar([])}}renderCalendar(t){const r=this.querySelector("#calendar"),a=2026,n=3,v=new Date(a,n,1),c=new Date(a,n+1,0).getDate(),s=v.getDay();let d="<table><thead><tr>";["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(e=>d+=`<th>${e}</th>`),d+="</tr></thead><tbody><tr>";for(let e=0;e<s;e++)d+="<td></td>";for(let e=1;e<=c;e++){(s+e-1)%7===0&&e!==1&&(d+="</tr><tr>");const p=`${a}-${String(n+1).padStart(2,"0")}-${String(e).padStart(2,"0")}`,o=t.find(u=>u.date===p),g=o?`<bull-calendar-events type="${o.type}" opponent="${o.opponent}"></bull-calendar-events>`:"";d+=`<td><span class="day">${e}</span>${g}</td>`}const h=(7-(s+c)%7)%7;for(let e=0;e<h;e++)d+="<td></td>";d+="</tr></tbody></table>";let i='<div id="events-list"><h3>Events</h3><div class="events-container">';t.forEach(e=>{i+=`<div class="event-item" onclick="this.dispatchEvent(new CustomEvent('event-clicked', {bubbles: true}))">${e.date}: ${e.type} vs ${e.opponent}</div>`}),i+="</div></div>",d+=i,r.innerHTML=d}}customElements.define("bull-calendar",m);/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class f extends HTMLElement{connectedCallback(){this.innerHTML=`
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
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderEvents(t)}catch(t){console.error("Error loading events:",t),this.renderEvents([])}}renderEvents(t){const r=this.querySelector("#events");let a='<h3>All Events</h3><div class="events-container">';t.forEach(n=>{a+=`<div class="event-item">${n.date}: ${n.type} vs ${n.opponent}</div>`}),a+="</div>",r.innerHTML=a}}customElements.define("bull-events",f);
