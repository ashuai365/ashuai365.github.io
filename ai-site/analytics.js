(function(){
  var key="madao-anonymous-visitor";
  var visitor=localStorage.getItem(key);
  if(!visitor){
    visitor=(crypto.randomUUID&&crypto.randomUUID())||(Date.now()+"-"+Math.random().toString(36).slice(2));
    localStorage.setItem(key,visitor);
  }
  window.setTimeout(function(){
    var params=new URLSearchParams({
      site:"ai",
      path:location.pathname,
      visitorId:visitor,
      referrer:document.referrer,
      language:navigator.language,
      viewport:window.innerWidth+"x"+window.innerHeight,
      timestamp:String(Date.now())
    });
    fetch("/api/analytics/collect?"+params.toString(),{keepalive:true,cache:"no-store"}).catch(function(){});
  },700);
})();
