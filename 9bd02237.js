import{D as m,i as f,b as x,I as y,a as E}from"./c3fc54f1.js";/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class w extends HTMLElement{connectedCallback(){const t=this.getAttribute("type")||"",r=this.getAttribute("opponent")||"";this.innerHTML=`
      <style>
        .event {
          background-color: #e0e0e0;
          border: 1px solid #ccc;
          padding: 4px 8px;
          margin: 2px 0;
          cursor: pointer;
          border-radius: 4px;
          font-size: 12px;
        }
        .event:hover {
          background-color: #d0d0d0;
        }
      </style>
      <div class="event">${t} vs ${r}</div>
    `,this.querySelector(".event").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))})}}customElements.define("bull-calendar-events",w);class k extends HTMLElement{connectedCallback(){this.innerHTML=`
      <style>
        :host {
          display: block;
          padding: 16px;
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
          border: 3px solid #ccc;
          padding: 16px;
          text-align: left;
          position: relative;
          min-height: 80px;
        }
        th {
          background-color: #f0f0f0;
        }
        .day {
          position: absolute;
          top: 4px;
          right: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        #events-list {
          margin-top: 20px;
        }
        .events-container {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 8px;
        }
        .event-item {
          margin: 4px 0;
          padding: 4px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
      </style>
      <div id="calendar"></div>
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderCalendar(t)}catch(t){console.error("Error loading events:",t),this.renderCalendar([])}}renderCalendar(t){const r=this.querySelector("#calendar"),a=2026,s=3,v=new Date(a,s,1),c=new Date(a,s+1,0).getDate(),o=v.getDay();let n="<table><thead><tr>";["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(e=>n+=`<th>${e}</th>`),n+="</tr></thead><tbody><tr>";for(let e=0;e<o;e++)n+="<td></td>";for(let e=1;e<=c;e++){(o+e-1)%7===0&&e!==1&&(n+="</tr><tr>");const h=`${a}-${String(s+1).padStart(2,"0")}-${String(e).padStart(2,"0")}`,l=t.find(g=>g.date===h),b=l?`<bull-calendar-events type="${l.type}" opponent="${l.opponent}"></bull-calendar-events>`:"";n+=`<td><span class="day">${e}</span>${b}</td>`}const u=(7-(o+c)%7)%7;for(let e=0;e<u;e++)n+="<td></td>";n+="</tr></tbody></table>";let d='<div id="events-list"><h3>Events</h3><div class="events-container">';t.forEach(e=>{d+=`<div class="event-item" onclick="this.dispatchEvent(new CustomEvent('event-clicked', {bubbles: true}))">${e.date}: ${e.type} vs ${e.opponent}</div>`}),d+="</div></div>",n+=d,r.innerHTML=n}}customElements.define("bull-calendar",k);function $(i){return i==="./lib/bull-app.haxProperties.json"?new URL(new URL("ad52f369.json",import.meta.url).href):new Promise(function(t,r){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic new URL statement: "+i)))})}class p extends m(y(E)){static get tag(){return"bull-roster"}constructor(){super()}static get properties(){return{...super.properties,title:{type:String}}}static get styles(){return[super.styles,f`:host{display:block;color:var(--ddd-theme-primary);background-color:var(--ddd-theme-accent);font-family:var(--ddd-font-navigation)}.wrapper{margin:var(--ddd-spacing-2);padding:var(--ddd-spacing-4)}h3 span{font-size:var(--bull-app-label-font-size,var(--ddd-font-size-s))}`]}render(){return x` <div class="wrapper"> <slot></slot> </div>`}static get haxProperties(){return $(`./lib/${this.tag}.haxProperties.json`).href}}globalThis.customElements.define(p.tag,p);/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class L extends HTMLElement{connectedCallback(){this.innerHTML=`
      <style>
        :host {
          display: block;
          padding: 16px;
        }
        #events {
          max-width: 1200px;
          margin: 0 auto;
        }
        .events-container {
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 8px;
        }
        .event-item {
          margin: 4px 0;
          padding: 8px;
          background-color: #f9f9f9;
          border-radius: 4px;
          cursor: pointer;
        }
        .event-item:hover {
          background-color: #e9e9e9;
        }
      </style>
      <div id="events"></div>
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderEvents(t)}catch(t){console.error("Error loading events:",t),this.renderEvents([])}}renderEvents(t){const r=this.querySelector("#events");let a='<h3>All Events</h3><div class="events-container">';t.forEach(s=>{a+=`<div class="event-item">${s.date}: ${s.type} vs ${s.opponent}</div>`}),a+="</div>",r.innerHTML=a}}customElements.define("bull-events",L);
