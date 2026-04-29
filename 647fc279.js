import{i as y,b as a}from"./c3fc54f1.js";import"./b9cbd237.js";/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class x extends HTMLElement{connectedCallback(){const t=this.getAttribute("type")||"",d=this.getAttribute("opponent")||"";this.innerHTML=`
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
      <div class="event">${t} vs ${d}</div>
    `,this.querySelector(".event").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))})}}customElements.define("bull-calendar-events",x);function w(n){return n==="./lib/bull-app.haxProperties.json"?new URL(new URL("ad52f369.json",import.meta.url).href):new Promise(function(t,d){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(d.bind(null,new Error("Unknown variable dynamic new URL statement: "+n)))})}class h extends HTMLElement{connectedCallback(){this.innerHTML=`
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
          background-color: var(--ddd-theme-default-original87Pink);
          color: var(--ddd-theme-default-alertUrgent);
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
    `,this.loadEvents()}static get properties(){return{...super.properties,currentMonthIndex:{type:Number},year:{type:Number},months:{type:Array},events:{type:Array}}}static get styles(){return[super.styles,y`:host{display:block;padding:var(--ddd-spacing-4)}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ddd-spacing-4)}.month-title{font-size:var(--ddd-font-size-l);font-weight:var(--ddd-font-weight-bold)}#calendar{max-width:1200px;margin:0 auto}table{width:100%;border-collapse:collapse}td,th{border:var(--ddd-border-md);padding:var(--ddd-spacing-4);text-align:left;position:relative;min-height:80px;background-color:var(--ddd-theme-default-warningLight)}th{background-color:var(--ddd-theme-default-shrineTan)}.day{position:absolute;top:var(--ddd-spacing-1);right:var(--ddd-spacing-1);font-size:var(--ddd-font-size-4xs);font-weight:var(--ddd-font-weight-bold)}#events-list{margin-top:var(--ddd-spacing-5)}.events-container{max-height:200px;overflow-y:auto;border:var(--ddd-border-xs);padding:var(--ddd-spacing-2)}.event-item{margin:var(--ddd-spacing-1) 0;padding:var(--ddd-spacing-1);background-color:var(--ddd-theme-default-slateMaxLight);border-radius:var(--ddd-radius-xs)}`]}_handleArrow(t){const{direction:d}=t.detail;d==="left"?this.currentMonthIndex=(this.currentMonthIndex-1+this.months.length)%this.months.length:this.currentMonthIndex=(this.currentMonthIndex+1)%this.months.length}async loadEvents(){try{const t=await fetch("./bull-calendar-events-data.json");this.events=await t.json()}catch(t){console.error("Error loading events:",t),this.events=[]}}render(){const t=this.months[this.currentMonthIndex],d=t.month,i=t.name,s=new Date(this.year,d,1),v=new Date(this.year,d+1,0).getDate(),o=s.getDay(),p=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=[];let r=[];for(let e=0;e<o;e++)r.push(a`<td></td>`);for(let e=1;e<=v;e++){(o+e-1)%7===0&&e!==1&&(l.push(a`<tr>${r}</tr>`),r=[]);const m=`${this.year}-${String(d+1).padStart(2,"0")}-${String(e).padStart(2,"0")}`,c=this.events.find(f=>f.date===m),b=c?a`<bull-calendar-events type="${c.type}" opponent="${c.opponent}"></bull-calendar-events>`:"";r.push(a`<td><span class="day">${e}</span>${b}</td>`)}const g=(7-(o+v)%7)%7;for(let e=0;e<g;e++)r.push(a`<td></td>`);l.push(a`<tr>${r}</tr>`);const u=this.events.map(e=>a` <div class="event-item" @click="${()=>this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))}"> ${e.date}: ${e.type} vs ${e.opponent} </div> `);return a` <div class="calendar-header"> <bull-playlist-arrow direction="left" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow> <div class="month-title">${i} ${this.year}</div> <bull-playlist-arrow direction="right" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow> </div> <div id="calendar"> <table> <thead> <tr> ${p.map(e=>a`<th>${e}</th>`)} </tr> </thead> <tbody> ${l} </tbody> </table> <div id="events-list"> <h3>Events</h3> <div class="events-container"> ${u} </div> </div> </div> `}static get haxProperties(){return w(`./lib/${this.tag}.haxProperties.json`).href}}globalThis.customElements.define(h.tag,h);/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class k extends HTMLElement{connectedCallback(){this.innerHTML=`
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
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("./bull-calendar-events-data.json")).json();this.renderEvents(t)}catch(t){console.error("Error loading events:",t),this.renderEvents([])}}renderEvents(t){const d=this.querySelector("#events");let i='<h3>All Events</h3><div class="events-container">';t.forEach(s=>{i+=`<div class="event-item">${s.date}: ${s.type} vs ${s.opponent}</div>`}),i+="</div>",d.innerHTML=i}}customElements.define("bull-events",k);
