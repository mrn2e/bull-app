import{D as m,i as f,b as y,I as x,a as E}from"./c3fc54f1.js";/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class w extends HTMLElement{connectedCallback(){const t=this.getAttribute("type")||"",a=this.getAttribute("opponent")||"";this.innerHTML=`
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
      <div class="event">${t} vs ${a}</div>
    `,this.querySelector(".event").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))})}}customElements.define("bull-calendar-events",w);class k extends HTMLElement{connectedCallback(){this.innerHTML=`
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
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderCalendar(t)}catch(t){console.error("Error loading events:",t),this.renderCalendar([])}}renderCalendar(t){const a=this.querySelector("#calendar"),n=2026,r=3,p=new Date(n,r,1),c=new Date(n,r+1,0).getDate(),i=p.getDay();let d="<table><thead><tr>";["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(e=>d+=`<th>${e}</th>`),d+="</tr></thead><tbody><tr>";for(let e=0;e<i;e++)d+="<td></td>";for(let e=1;e<=c;e++){(i+e-1)%7===0&&e!==1&&(d+="</tr><tr>");const h=`${n}-${String(r+1).padStart(2,"0")}-${String(e).padStart(2,"0")}`,l=t.find(b=>b.date===h),g=l?`<bull-calendar-events type="${l.type}" opponent="${l.opponent}"></bull-calendar-events>`:"";d+=`<td><span class="day">${e}</span>${g}</td>`}const u=(7-(i+c)%7)%7;for(let e=0;e<u;e++)d+="<td></td>";d+="</tr></tbody></table>";let o='<div id="events-list"><h3>Events</h3><div class="events-container">';t.forEach(e=>{o+=`<div class="event-item" onclick="this.dispatchEvent(new CustomEvent('event-clicked', {bubbles: true}))">${e.date}: ${e.type} vs ${e.opponent}</div>`}),o+="</div></div>",d+=o,a.innerHTML=d}}customElements.define("bull-calendar",k);function $(s){return s==="./lib/bull-app.haxProperties.json"?new URL(new URL("ad52f369.json",import.meta.url).href):new Promise(function(t,a){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic new URL statement: "+s)))})}class v extends m(x(E)){static get tag(){return"bull-roster"}constructor(){super()}static get properties(){return{...super.properties,title:{type:String}}}static get styles(){return[super.styles,f`:host{display:block;color:var(--ddd-theme-primary);background-color:var(--ddd-theme-accent);font-family:var(--ddd-font-navigation)}.wrapper{margin:var(--ddd-spacing-2);padding:var(--ddd-spacing-4)}h3 span{font-size:var(--bull-app-label-font-size,var(--ddd-font-size-s))}`]}render(){return y` <div class="wrapper"> <slot></slot> </div>`}static get haxProperties(){return $(`./lib/${this.tag}.haxProperties.json`).href}}globalThis.customElements.define(v.tag,v);/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class L extends HTMLElement{connectedCallback(){this.innerHTML=`
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
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderEvents(t)}catch(t){console.error("Error loading events:",t),this.renderEvents([])}}renderEvents(t){const a=this.querySelector("#events");let n='<h3>All Events</h3><div class="events-container">';t.forEach(r=>{n+=`<div class="event-item">${r.date}: ${r.type} vs ${r.opponent}</div>`}),n+="</div>",a.innerHTML=n}}customElements.define("bull-events",L);
