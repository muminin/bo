!function(r){function S(e,t){return t*Math.floor(e/t)}function u(e,t,n,r){if("function"==typeof e.strftime)return e.strftime(t);var a,i=function(e,t){return t=""+(null==t?"0":t),1==(e=""+e).length?t+e:e},o=[],s=!1,u=e.getHours(),c=u<12;null==n&&(n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==r&&(r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),a=12<u?u-12:0==u?12:u;for(var m=0;m<t.length;++m){var h=t.charAt(m);if(s){switch(h){case"a":h=""+r[e.getDay()];break;case"b":h=""+n[e.getMonth()];break;case"d":h=i(e.getDate());break;case"e":h=i(e.getDate()," ");break;case"H":h=i(u);break;case"I":h=i(a);break;case"l":h=i(a," ");break;case"m":h=i(e.getMonth()+1);break;case"M":h=i(e.getMinutes());break;case"q":h=""+(Math.floor(e.getMonth()/3)+1);break;case"S":h=i(e.getSeconds());break;case"y":h=i(e.getFullYear()%100);break;case"Y":h=""+e.getFullYear();break;case"p":h=c?"am":"pm";break;case"P":h=c?"AM":"PM";break;case"w":h=""+e.getDay()}o.push(h),s=!1}else"%"==h?s=!0:o.push(h)}return o.join("")}function a(e){function t(e,t,n,r){e[t]=function(){return n[r].apply(n,arguments)}}var n={date:e};null!=e.strftime&&t(n,"strftime",e,"strftime"),t(n,"getTime",e,"getTime"),t(n,"setTime",e,"setTime");for(var r=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],a=0;a<r.length;a++)t(n,"get"+r[a],e,"getUTC"+r[a]),t(n,"set"+r[a],e,"setUTC"+r[a]);return n}function y(e,t){if("browser"==t.timezone)return new Date(e);if(t.timezone&&"utc"!=t.timezone){if("undefined"!=typeof timezoneJS&&void 0!==timezoneJS.Date){var n=new timezoneJS.Date;return n.setTimezone(t.timezone),n.setTime(e),n}return a(new Date(e))}return a(new Date(e))}var z={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},e=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],p=e.concat([[3,"month"],[6,"month"],[1,"year"]]),T=e.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);r.plot.plugins.push({init:function(e){e.hooks.processDatapoints.push(function(e,t,n){r.each(e.getAxes(),function(e,t){var d=t.options;"time"==d.mode&&(t.tickGenerator=function(e){var t=[],n=y(e.min,d),r=0,a=d.tickSize&&"quarter"===d.tickSize[1]||d.minTickSize&&"quarter"===d.minTickSize[1]?T:p;null!=d.minTickSize&&(r="number"==typeof d.tickSize?d.tickSize:d.minTickSize[0]*z[d.minTickSize[1]]);for(var i=0;i<a.length-1&&!(e.delta<(a[i][0]*z[a[i][1]]+a[i+1][0]*z[a[i+1][1]])/2&&a[i][0]*z[a[i][1]]>=r);++i);var o=a[i][0],s=a[i][1];if("year"==s){if(null!=d.minTickSize&&"year"==d.minTickSize[1])o=Math.floor(d.minTickSize[0]);else{var u=Math.pow(10,Math.floor(Math.log(e.delta/z.year)/Math.LN10)),c=e.delta/z.year/u;o=c<1.5?1:c<3?2:c<7.5?5:10,o*=u}o<1&&(o=1)}e.tickSize=d.tickSize||[o,s];var m=e.tickSize[0];s=e.tickSize[1];var h=m*z[s];"second"==s?n.setSeconds(S(n.getSeconds(),m)):"minute"==s?n.setMinutes(S(n.getMinutes(),m)):"hour"==s?n.setHours(S(n.getHours(),m)):"month"==s?n.setMonth(S(n.getMonth(),m)):"quarter"==s?n.setMonth(3*S(n.getMonth()/3,m)):"year"==s&&n.setFullYear(S(n.getFullYear(),m)),n.setMilliseconds(0),h>=z.minute?n.setSeconds(0):h>=z.hour?n.setMinutes(0):h>=z.day?n.setHours(0):h>=4*z.day?n.setDate(1):h>=2*z.month?n.setMonth(S(n.getMonth(),3)):h>=2*z.quarter?n.setMonth(S(n.getMonth(),6)):h>=z.year&&n.setMonth(0);var l,f=0,k=Number.NaN;do{if(l=k,k=n.getTime(),t.push(k),"month"==s||"quarter"==s)if(m<1){n.setDate(1);var M=n.getTime();n.setMonth(n.getMonth()+("quarter"==s?3:1));var g=n.getTime();n.setTime(k+f*z.hour+(g-M)*m),f=n.getHours(),n.setHours(0)}else n.setMonth(n.getMonth()+m*("quarter"==s?3:1));else"year"==s?n.setFullYear(n.getFullYear()+m):n.setTime(k+h)}while(k<e.max&&k!=l);return t},t.tickFormatter=function(e,t){var n=y(e,t.options);if(null!=d.timeformat)return u(n,d.timeformat,d.monthNames,d.dayNames);var r=t.options.tickSize&&"quarter"==t.options.tickSize[1]||t.options.minTickSize&&"quarter"==t.options.minTickSize[1],a=t.tickSize[0]*z[t.tickSize[1]],i=t.max-t.min,o=d.twelveHourClock?" %p":"",s=d.twelveHourClock?"%I":"%H";return u(n,a<z.minute?s+":%M:%S"+o:a<z.day?i<2*z.day?s+":%M"+o:"%b %d "+s+":%M"+o:a<z.month?"%b %d":r&&a<z.quarter||!r&&a<z.year?i<z.year?"%b":"%b %Y":r&&a<z.year?i<z.year?"Q%q":"Q%q %Y":"%Y",d.monthNames,d.dayNames)})})})},options:{},name:"time",version:"1.0"}),r.plot.formatDate=u}(jQuery);