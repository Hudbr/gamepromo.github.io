const state = {
  freeGames: [
    {id:1,title:'Sky Realm (Epic)',platform:'Epic',img:'https://via.placeholder.com/400x200?text=Sky+Realm',desc:'RPG de exploração. Resgate até 20/06/2026',expires:'2026-06-20',link:'#'},
    {id:2,title:'Block Runner (Steam)',platform:'Steam',img:'https://via.placeholder.com/400x200?text=Block+Runner',desc:'Plataforma indie. Resgate até 25/06/2026',expires:'2026-06-25',link:'#'}
  ],
  deals: [
    {id:11,title:'Cyber Adventure',genre:'Ação',orig:199.9,price:29.9,discount:85,platform:'Steam',img:'https://via.placeholder.com/400x200?text=Cyber+Adventure'},
    {id:12,title:'Mystic Quest',genre:'RPG',orig:149.9,price:39.9,discount:73,platform:'Epic',img:'https://via.placeholder.com/400x200?text=Mystic+Quest'},
    {id:13,title:'Puzzle Galaxy',genre:'Puzzle',orig:39.9,price:9.9,discount:75,platform:'Steam',img:'https://via.placeholder.com/400x200?text=Puzzle+Galaxy'}
  ],
  news: [
    {id:101,title:'Summer Sale começa amanhã',cat:'Ofertas',excerpt:'Grandes descontos na Steam e Epic durante a semana.'},
    {id:102,title:'Novo jogo grátis na Epic',cat:'Grátis',excerpt:'Confira como resgatar o novo título gratuito.'}
  ]
};

function el(sel){return document.querySelector(sel)}
function renderFree(){
  const root = el('#freeGames');root.innerHTML='';
  state.freeGames.forEach(g=>{
    const card = document.createElement('div');card.className='card';
    card.innerHTML = `
      <img src="${g.img}" alt="${g.title}" />
      <h4>${g.title}</h4>
      <p>${g.desc}</p>
      <div class="meta"><small>${g.platform}</small><a class="btn btn-outline" href="${g.link}">Resgatar Agora</a></div>
    `;
    root.appendChild(card);
  })
}
function renderDeals(list){
  const data = list || state.deals;const root=el('#deals');root.innerHTML='';
  data.forEach(d=>{
    const c=document.createElement('div');c.className='card';
    c.innerHTML=`
      <img src="${d.img}" alt="${d.title}" />
      <h4>${d.title}</h4>
      <p>De R$${d.orig.toFixed(2)} por <strong>R$${d.price.toFixed(2)}</strong></p>
      <div class="meta"><span>${d.discount}%</span><a class="btn btn-primary" href="#">Ver</a></div>
    `;root.appendChild(c);
  })
}
function renderNews(){const root=el('#newsList');root.innerHTML='';state.news.forEach(n=>{const d=document.createElement('div');d.className='card';d.innerHTML=`<h4>${n.title}</h4><p>${n.excerpt}</p><div class="meta"><small>${n.cat}</small></div>`;root.appendChild(d)})}

function setupFilters(){
  el('#searchInput').addEventListener('input',e=>{
    const q=e.target.value.toLowerCase();
    const filtered = state.deals.filter(d=>d.title.toLowerCase().includes(q));
    renderDeals(filtered);
  });
  el('#genreFilter').addEventListener('change',e=>{
    const g=e.target.value;
    const filtered = g?state.deals.filter(d=>d.genre===g):state.deals;
    renderDeals(filtered);
  });
}

function setupNewsletter(){
  el('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();alert('Obrigado! Você está inscrito.');el('#newsletterEmail').value='';});
}

function setupContact(){
  el('#contactForm').addEventListener('submit',e=>{e.preventDefault();alert('Mensagem enviada. Responderemos em breve.');el('#name').value='';el('#email').value='';el('#message').value='';});
}

function initAdmin(){
  // simples painel via localStorage (exemplo)
  if(!localStorage.getItem('gp_deals')) localStorage.setItem('gp_deals',JSON.stringify(state.deals));
}

function init(){
  renderFree();renderDeals();renderNews();setupFilters();setupNewsletter();setupContact();initAdmin();
  // theme toggle
  const tBtn = el('#themeToggle');tBtn.addEventListener('click',()=>{document.body.classList.toggle('is-dark')});
}

window.addEventListener('DOMContentLoaded',init);
