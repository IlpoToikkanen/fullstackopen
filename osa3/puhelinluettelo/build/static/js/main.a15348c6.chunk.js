(this["webpackJsonpstep1-5"]=this["webpackJsonpstep1-5"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(13),o=t.n(u),c=(t(19),t(2)),i=function(e){var n=e.addPerson,t=e.newName,r=e.handleNameChange,u=e.newNumber,o=e.handleNumberChange;return a.a.createElement("form",{onSubmit:n},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:r})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:u,onChange:o})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},l=function(e){var n=e.onClick,t=e.text;return a.a.createElement("button",{onClick:n},t)},m=function(e){var n=e.persons,t=e.handleDeleteClick;return a.a.createElement("div",null,n.map((function(e){return a.a.createElement("div",{key:e.name},a.a.createElement("p",null,e.name," ",e.number," ",a.a.createElement(l,{text:"delete",onClick:function(){return t(e)}})))})))},f=function(e){var n=e.filter,t=e.handleFilterChange;return a.a.createElement("div",null,"filter shown with ",a.a.createElement("input",{value:n,onChange:t}))},d=function(e){var n=e.information;return null===n?null:a.a.createElement("div",{className:"notification",style:"error"===n.type?{color:"red",border:"2px solid red",borderRadius:"5px",fontSize:"25px"}:{color:"green",border:"2px solid green",borderRadius:"5px",fontSize:"25px"}},n.text)},s=t(3),p=t.n(s),h="/api/persons",b=function(){return p.a.get(h).then((function(e){return e.data}))},E=function(e){return p.a.post(h,e).then((function(e){return e.data}))},v=function(e){return p.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},x=function(e,n){return p.a.put("".concat(h,"/").concat(n),e).then((function(e){return e.data}))},g=function(){var e=Object(r.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(r.useState)(""),l=Object(c.a)(o,2),s=l[0],p=l[1],h=Object(r.useState)(""),g=Object(c.a)(h,2),C=g[0],w=g[1],y=Object(r.useState)(""),k=Object(c.a)(y,2),O=k[0],j=k[1],N=Object(r.useState)(null),S=Object(c.a)(N,2),T=S[0],D=S[1];Object(r.useEffect)((function(){b().then((function(e){return u(e)}))}),[]);var P=O?t.filter((function(e){return e.name.toUpperCase().includes(O.toUpperCase())})):t;return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(d,{information:T}),a.a.createElement(f,{filter:O,handleFilterChange:function(e){j(e.target.value)}}),a.a.createElement("h2",null,"add a new"),a.a.createElement(i,{addPerson:function(e){if(e.preventDefault(),!s)return D({text:"Please insert name",type:"error"}),setTimeout((function(){D(null)}),3e3),null;if(!C)return D({text:"Please insert number",type:"error"}),setTimeout((function(){D(null)}),3e3),null;if(t.some((function(e){return e.name===s}))){if(window.confirm("".concat(s," is already added to the phonebook, replace the old number with a new one?"))){var n=t.map((function(e){return e.name})).indexOf(s),r=t[n].id;return x({name:s,number:C,id:r},r).then((function(e){u(t.map((function(n){return n.id!==r?n:e}))),D({text:"Number for ".concat(s," updated succesfully"),type:"notification"}),setTimeout((function(){D(null)}),3e3),p(""),w("")})).catch((function(e){D({text:"".concat(s," no longer exists in the phonebook"),type:"error"}),setTimeout((function(){D(null)}),3e3),u(t.filter((function(e){return e.name!==s})))})),null}return null}E({name:s,number:C}).then((function(e){u(t.concat(e)),D({text:"Added ".concat(s),type:"notification"}),setTimeout((function(){D(null)}),3e3),p(""),w("")})).catch((function(e){D({text:e.response.data.error,type:"error"}),setTimeout((function(){D(null)}),3e3)}))},newName:s,newNumber:C,handleNameChange:function(e){return p(e.target.value)},handleNumberChange:function(e){return w(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{persons:P,handleDeleteClick:function(e){if(window.confirm("Delete ".concat(e.name," ?")))return v(e.id).then((function(n){u(t.filter((function(n){return n.name!==e.name}))),D({text:"Deleted ".concat(e.name),type:"notification"}),setTimeout((function(){D(null)}),3e3)})).catch((function(n){u(t.filter((function(n){return n.name!==e.name}))),D({text:"".concat(e.name," no longer exists in the phonebook"),type:"error"}),setTimeout((function(){D(null)}),3e3)})),null}}))};o.a.render(a.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a15348c6.chunk.js.map