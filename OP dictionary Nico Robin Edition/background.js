"use strict";(()=>{var a=class{constructor(e){this.ttl=e,this.pdfIdQueue=new Set,this.pdfData=new Map}push(e,s){this.pdfData.set(e,s),this.pdfIdQueue.add(e),setTimeout(()=>{this.pdfIdQueue.delete(e),this.pdfData.delete(e)},this.ttl)}shiftId(){let e=null;return this.pdfIdQueue.size>=1&&(e=this.pdfIdQueue.values().next().value,this.pdfIdQueue.delete(e)),e}get(e){var s;return(s=this.pdfData.get(e))!=null?s:null}};var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",i=()=>{let t=Math.floor(Math.random()*d.length);return d[t]},u=t=>{let e="";for(let s=0;s<t;s++)e+=i();return e},c=u;var l={id:"youdaoTrans",title:"youdaoTrans",type:"normal",contexts:["selection"]};chrome.runtime.onInstalled.addListener(()=>{chrome.contextMenus.create(l)});chrome.contextMenus.onClicked.addListener(async function(t,e){chrome.tabs.query({currentWindow:!0,active:!0},s=>{chrome.tabs.create({active:!0,index:s[0].index+1,url:"https://youdao.com/result?word="+t.selectionText+"&lang=en"})})});chrome.action.onClicked.addListener(t=>{chrome.scripting.executeScript({target:{tabId:t.id},files:["main.js"]})});chrome.runtime.onMessageExternal.addListener(t=>{n(e=>{chrome.tabs.sendMessage(e,{message:t})})});chrome.commands.onCommand.addListener(t=>{switch(t){case"scroll_up":n(e=>chrome.tabs.sendMessage(e,{message:{type:"scroll_up"}}));break;case"scroll_down":n(e=>chrome.tabs.sendMessage(e,{message:{type:"scroll_down"}}));break;case"activate_extension":n(e=>chrome.scripting.executeScript({target:{tabId:e},files:["main.js"]}));break}});var o=new a(1e3*30);chrome.runtime.onMessage.addListener((t,e,s)=>{switch(t==null?void 0:t.type){case"open_pdf":{let r=c(32);o.push(r,t.payload),chrome.runtime.sendMessage({type:"prepare_pdf"}),chrome.runtime.openOptionsPage(()=>{s()});break}case"shift_pdf_id":{let r=o.shiftId();s(r);break}case"get_pdf_data":{let r=o.get(t.id);s(r);break}}});var n=t=>{chrome.tabs.query({active:!0,currentWindow:!0},e=>{for(let s=0;s<e.length;s++)t(e[s].id)})};})();
