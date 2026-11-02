(function(){
  var r=document.documentElement;
  document.getElementById('t').addEventListener('click',function(){
    var cur=r.getAttribute('data-theme');
    var dark=cur?cur==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    r.setAttribute('data-theme',dark?'light':'dark');
  });
  var bar=document.getElementById('bar');
  function prog(){var h=r.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')';}
  addEventListener('scroll',prog,{passive:true});prog();
  document.getElementById('f').addEventListener('submit',function(e){
    e.preventDefault();
    location.href='mailto:mazahirhasan2007@gmail.com?subject='+encodeURIComponent('Message from '+document.getElementById('fn').value)+'&body='+encodeURIComponent(document.getElementById('fm').value);
  });
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
  r.classList.add('js');
  var io=new IntersectionObserver(function(es){es.forEach(function(x){
    if(!x.isIntersecting)return;var el=x.target;el.classList.add('in');io.unobserve(el);
    setTimeout(function(){el.classList.remove('reveal','in');el.style.transitionDelay='';},900);});},{threshold:.15});
  document.querySelectorAll('section h2,section .sub,section .card,.about > div,footer > *').forEach(function(el,i){
    el.classList.add('reveal');el.style.transitionDelay=(i%3)*80+'ms';io.observe(el);});
  var cv=document.getElementById('net'),ctx=cv.getContext('2d'),pts=[],mx=-999,my=-999,W=0,H=0,dpr=Math.min(devicePixelRatio||1,2);
  function size(){var b=cv.getBoundingClientRect();W=b.width;H=b.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.min(60,Math.round(W*H/16000));pts=[];
    for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});}
  function css(n){return getComputedStyle(r).getPropertyValue(n).trim();}
  function draw(){
    if(!document.hidden){
      ctx.clearRect(0,0,W,H);var a=css('--accent');
      for(var i=0;i<pts.length;i++){var q=pts[i];q.x+=q.vx;q.y+=q.vy;
        if(q.x<0||q.x>W)q.vx*=-1;if(q.y<0||q.y>H)q.vy*=-1;
        ctx.globalAlpha=.4;ctx.fillStyle=a;ctx.beginPath();ctx.arc(q.x,q.y,2,0,6.283);ctx.fill();
        for(var j=i+1;j<pts.length;j++){var o=pts[j],d=Math.hypot(q.x-o.x,q.y-o.y);
          if(d<120){ctx.globalAlpha=(1-d/120)*.22;ctx.strokeStyle=a;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(o.x,o.y);ctx.stroke();}}
        var m=Math.hypot(q.x-mx,q.y-my);
        if(m<160){ctx.globalAlpha=(1-m/160)*.5;ctx.strokeStyle=a;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(mx,my);ctx.stroke();}}
      ctx.globalAlpha=1;}
    requestAnimationFrame(draw);}
  size();addEventListener('resize',size);
  addEventListener('mousemove',function(e){var b=cv.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top;},{passive:true});
  draw();
})();