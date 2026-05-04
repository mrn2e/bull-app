import{D as y,i as f,b as r,I as x,a as w}from"./c3fc54f1.js";import"./ab98f196.js";/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class k extends HTMLElement{connectedCallback(){const t=this.getAttribute("type")||"",n=this.getAttribute("opponent")||"";this.innerHTML=`
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
      <div class="event">${t} vs ${n}</div>
    `,this.querySelector(".event").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))})}}customElements.define("bull-calendar-events",k);function $(d){return d==="./lib/bull-app.haxProperties.json"?new URL(new URL("ad52f369.json",import.meta.url).href):new Promise(function(t,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic new URL statement: "+d)))})}class E extends y(x(w)){connectedCallback(){super.connectedCallback(),this.loadEvents()}static get properties(){return{...super.properties,currentMonthIndex:{type:Number},year:{type:Number},months:{type:Array},events:{type:Array}}}constructor(){super(),this.currentMonthIndex=0,this.year=2026,this.months=[{name:"March",month:2},{name:"April",month:3},{name:"May",month:4}],this.events=[]}static get styles(){return[super.styles,f`:host{display:block;padding:var(--ddd-spacing-4)}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ddd-spacing-4)}.month-title{font-size:var(--ddd-font-size-l);font-weight:var(--ddd-font-weight-bold)}#calendar{max-width:1200px;margin:0 auto}table{width:100%;border-collapse:collapse}td,th{border:var(--ddd-border-md);padding:var(--ddd-spacing-4);text-align:left;position:relative;min-height:80px;background-color:var(--ddd-theme-default-warningLight)}th{background-color:var(--ddd-theme-default-shrineTan)}.day{position:absolute;top:var(--ddd-spacing-1);right:var(--ddd-spacing-1);font-size:var(--ddd-font-size-4xs);font-weight:var(--ddd-font-weight-bold)}#events-list{margin-top:var(--ddd-spacing-5)}.events-container{max-height:200px;overflow-y:auto;border:var(--ddd-border-xs);padding:var(--ddd-spacing-2)}.event-item{margin:var(--ddd-spacing-1) 0;padding:var(--ddd-spacing-1);background-color:var(--ddd-theme-default-slateMaxLight);border-radius:var(--ddd-radius-xs)}`]}_handleArrow(t){const{direction:n}=t.detail;n==="left"?this.currentMonthIndex=(this.currentMonthIndex-1+this.months.length)%this.months.length:this.currentMonthIndex=(this.currentMonthIndex+1)%this.months.length}async loadEvents(){try{const t=await(await fetch("/api/schedule")).json();this.events=t}catch(t){console.error("Error:",t),this.events=[]}}render(){const t=this.months[this.currentMonthIndex],n=t.month,s=t.name,i=new Date(this.year,n,1),h=new Date(this.year,n+1,0).getDate(),o=i.getDay(),v=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=[];let a=[];for(let e=0;e<o;e++)a.push(r`<td></td>`);for(let e=1;e<=h;e++){(o+e-1)%7===0&&e!==1&&(l.push(r`<tr>${a}</tr>`),a=[]);const g=`${this.year}-${String(n+1).padStart(2,"0")}-${String(e).padStart(2,"0")}`,c=this.events.find(b=>b.date===g),m=c?r`<bull-calendar-events type="${c.type}" opponent="${c.opponent}"></bull-calendar-events>`:"";a.push(r`<td><span class="day">${e}</span>${m}</td>`)}const p=(7-(o+h)%7)%7;for(let e=0;e<p;e++)a.push(r`<td></td>`);l.push(r`<tr>${a}</tr>`);const u=this.events.map(e=>r` <div class="event-item" @click="${()=>this.dispatchEvent(new CustomEvent("event-clicked",{bubbles:!0}))}"> ${e.date}: ${e.type} vs ${e.opponent} </div> `);return r` <div class="calendar-header"> <bull-playlist-arrow direction="left" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow> <div class="month-title">${s} ${this.year}</div> <bull-playlist-arrow direction="right" @arrow-clicked="${this._handleArrow}"></bull-playlist-arrow> </div> <div id="calendar"> <table> <thead> <tr> ${v.map(e=>r`<th>${e}</th>`)} </tr> </thead> <tbody> ${l} </tbody> </table> <div id="events-list"> <h3>Events</h3> <div class="events-container"> ${u} </div> </div> </div> `}static get haxProperties(){return $(`./lib/${this.tag}.haxProperties.json`).href}}globalThis.customElements.define("bull-calendar",E);/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */class M extends HTMLElement{connectedCallback(){this.innerHTML=`
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
    `,this.loadEvents()}async loadEvents(){try{const t=await(await fetch("/api/schedule")).json();this.renderEvents(t)}catch(t){console.error("Error loading events:",t),this.renderEvents([])}}renderEvents(t){const n=this.querySelector("#events");let s='<h3>All Events</h3><div class="events-container">';t.forEach(i=>{s+=`<div class="event-item">${i.date}: ${i.type} vs ${i.opponent}</div>`}),s+="</div>",n.innerHTML=s}}customElements.define("bull-events",M);var L=[{heading:"Navigation",links:[{label:"Home",page:"home",link:"/"},{label:"Calendar",page:"calendar",link:"/calendar"},{label:"Roster",page:"roster",link:"/roster"},{label:"About",page:"about",link:"/about"}]}];export{L as v};
