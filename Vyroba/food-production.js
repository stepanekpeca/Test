(() => {
  const recipes = [
    {
      id: 'svickova',
      name: 'Hovězí svíčková na smetaně',
      category: 'Hlavní jídlo',
      basePortions: 10,
      shelfLife: 2,
      allergens: '1, 7, 9',
      ingredients: [
        { name: 'Hovězí zadní', quantity: 1.5, unit: 'kg' },
        { name: 'Mrkev', quantity: 0.45, unit: 'kg' },
        { name: 'Celer', quantity: 0.25, unit: 'kg' },
        { name: 'Petržel', quantity: 0.25, unit: 'kg' },
        { name: 'Cibule', quantity: 0.2, unit: 'kg' },
        { name: 'Smetana 33 %', quantity: 0.5, unit: 'l' },
        { name: 'Hladká mouka', quantity: 0.12, unit: 'kg' },
        { name: 'Máslo', quantity: 0.12, unit: 'kg' },
        { name: 'Citron', quantity: 0.1, unit: 'kg' },
        { name: 'Houskový knedlík', quantity: 1.8, unit: 'kg' }
      ],
      procedure: [
        'Maso očistěte, osolte a zprudka opečte v kotli na přepuštěném másle.',
        'Přidejte očištěnou kořenovou zeleninu a cibuli, krátce orestujte a podlijte vývarem.',
        'Zakryté duste při mírném varu do měkka; zaznamenejte dosaženou teplotu jádra nejméně 75 °C.',
        'Maso vyjměte. Zeleninu rozmixujte, přidejte smetanu, mouku rozmíchanou v základu a provařte.',
        'Dochuťte citronem, porce zchlaďte nebo udržujte nad 60 °C a expedujte s knedlíkem.'
      ]
    },
    {
      id: 'gulas',
      name: 'Hovězí guláš',
      category: 'Hlavní jídlo',
      basePortions: 10,
      shelfLife: 3,
      allergens: '1',
      ingredients: [
        { name: 'Hovězí kližka', quantity: 1.5, unit: 'kg' },
        { name: 'Cibule', quantity: 0.8, unit: 'kg' },
        { name: 'Sádlo', quantity: 0.15, unit: 'kg' },
        { name: 'Paprika sladká', quantity: 0.04, unit: 'kg' },
        { name: 'Hladká mouka', quantity: 0.12, unit: 'kg' },
        { name: 'Hovězí vývar', quantity: 1.2, unit: 'l' },
        { name: 'Chléb', quantity: 1.5, unit: 'kg' }
      ],
      procedure: [
        'Cibuli nakrájejte najemno a pomalu restujte na sádle do tmavě zlaté barvy.',
        'Přidejte maso nakrájené na kostky, osmahněte ze všech stran a stáhněte kotel z plamene.',
        'Vmíchejte sladkou papriku, ihned podlijte vývarem a duste do změknutí masa.',
        'Zahuštěte chlebem nebo jíškou, provařte nejméně 20 minut a ověřte teplotu jádra nad 75 °C.',
        'Rozdělte do gastronádob, označte šarží a předejte do výroby nebo expedičního skladu.'
      ]
    },
    {
      id: 'rizoto',
      name: 'Kuřecí rizoto se sýrem',
      category: 'Hlavní jídlo',
      basePortions: 10,
      shelfLife: 2,
      allergens: '7',
      ingredients: [
        { name: 'Kuřecí prsa', quantity: 0.9, unit: 'kg' },
        { name: 'Rýže', quantity: 0.8, unit: 'kg' },
        { name: 'Hrášek', quantity: 0.3, unit: 'kg' },
        { name: 'Tvrdý sýr', quantity: 0.2, unit: 'kg' },
        { name: 'Zeleninový vývar', quantity: 1.6, unit: 'l' },
        { name: 'Máslo', quantity: 0.1, unit: 'kg' }
      ],
      procedure: [
        'Kuřecí maso zkontrolujte, nakrájejte na kostky a tepelně opracujte odděleně od hotových pokrmů.',
        'Rýži propláchněte, zalijte horkým vývarem a vařte podle technologického listu.',
        'Vmíchejte hrášek, máslo a maso; pokrm prohřejte v celém objemu na nejméně 75 °C.',
        'Před výdejem promíchejte se sýrem, naporcujte a označte časem výroby a spotřeby.'
      ]
    }
  ];

  const today = new Date().toISOString().slice(0, 10);
  const dateAfter = (days) => {
    const date = new Date(`${today}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };
  const initialState = {
    batchCounter: 56,
    orders: [
      { id: 'V-26051', recipeId: 'svickova', qty: 120, kitchen: 'Teplá kuchyně', day: 'Po', time: '06:00', status: 'running', batchId: 'S-261019-054', customer: 'Domov seniorů Slunečnice', materialLots: [
        { lotId: 'RM-2610-001', material: 'Hovězí zadní', qty: 18, unit: 'kg' },
        { lotId: 'RM-2610-003', material: 'Mrkev', qty: 5.4, unit: 'kg' },
        { lotId: 'RM-2610-004', material: 'Celer', qty: 3, unit: 'kg' },
        { lotId: 'RM-2610-005', material: 'Petržel', qty: 3, unit: 'kg' },
        { lotId: 'RM-2610-006', material: 'Cibule', qty: 2.4, unit: 'kg' },
        { lotId: 'RM-2610-007', material: 'Smetana 33 %', qty: 6, unit: 'l' },
        { lotId: 'RM-2610-008', material: 'Hladká mouka', qty: 1.44, unit: 'kg' },
        { lotId: 'RM-2610-009', material: 'Máslo', qty: 1.44, unit: 'kg' },
        { lotId: 'RM-2610-010', material: 'Citron', qty: 1.2, unit: 'kg' },
        { lotId: 'RM-2610-011', material: 'Houskový knedlík', qty: 21.6, unit: 'kg' }
      ] },
      { id: 'V-26052', recipeId: 'gulas', qty: 80, kitchen: 'Teplá kuchyně', day: 'Po', time: '08:30', status: 'planned', batchId: null, customer: 'Školní jídelna Praha 6' },
      { id: 'V-26053', recipeId: 'rizoto', qty: 150, kitchen: 'Teplá kuchyně', day: 'Po', time: '10:00', status: 'produced', batchId: 'S-261019-055', customer: 'ZŠ U Parku', materialLots: [
        { lotId: 'RM-2610-016', material: 'Kuřecí prsa', qty: 13.5, unit: 'kg' },
        { lotId: 'RM-2610-017', material: 'Rýže', qty: 12, unit: 'kg' },
        { lotId: 'RM-2610-018', material: 'Hrášek', qty: 4.5, unit: 'kg' },
        { lotId: 'RM-2610-019', material: 'Tvrdý sýr', qty: 3, unit: 'kg' },
        { lotId: 'RM-2610-020', material: 'Zeleninový vývar', qty: 24, unit: 'l' },
        { lotId: 'RM-2610-009', material: 'Máslo', qty: 1.5, unit: 'kg' }
      ] },
      { id: 'V-26054', recipeId: 'svickova', qty: 90, kitchen: 'Teplá kuchyně', day: 'Út', time: '06:00', status: 'planned', batchId: null, customer: 'Domov seniorů Slunečnice' },
      { id: 'V-26050', recipeId: 'gulas', qty: 60, kitchen: 'Teplá kuchyně', day: 'Po', time: '05:30', status: 'expedition', batchId: 'S-261019-053', customer: 'Hotel U Mostu', shippedAt: null, materialLots: [
        { lotId: 'RM-2610-002', material: 'Hovězí kližka', qty: 9, unit: 'kg' },
        { lotId: 'RM-2610-006', material: 'Cibule', qty: 4.8, unit: 'kg' },
        { lotId: 'RM-2610-012', material: 'Sádlo', qty: 0.9, unit: 'kg' },
        { lotId: 'RM-2610-013', material: 'Paprika sladká', qty: 0.24, unit: 'kg' },
        { lotId: 'RM-2610-008', material: 'Hladká mouka', qty: 0.72, unit: 'kg' },
        { lotId: 'RM-2610-014', material: 'Hovězí vývar', qty: 7.2, unit: 'l' },
        { lotId: 'RM-2610-015', material: 'Chléb', qty: 9, unit: 'kg' }
      ] }
    ],
    lots: [
      { id: 'S-261019-055', recipeId: 'rizoto', qty: 150, unit: 'porcí', warehouse: 'production', expiry: dateAfter(2), orderId: 'V-26053', producedAt: today },
      { id: 'S-261019-053', recipeId: 'gulas', qty: 60, unit: 'porcí', warehouse: 'expedition', expiry: dateAfter(2), orderId: 'V-26050', producedAt: today }
    ],
    materialLots: [
      ['Hovězí zadní', 26, 'kg', 4, 'Řeznictví Novák'],
      ['Hovězí kližka', 22, 'kg', 3, 'Maso U Dvořáků'],
      ['Mrkev', 14, 'kg', 7, 'Zelenina Čechy'],
      ['Celer', 8, 'kg', 5, 'Zelenina Čechy'],
      ['Petržel', 9, 'kg', 6, 'Zelenina Čechy'],
      ['Cibule', 25, 'kg', 10, 'Zelenina Čechy'],
      ['Smetana 33 %', 12, 'l', 3, 'Mlékárna Jih'],
      ['Hladká mouka', 18, 'kg', 50, 'Mlýn Bohutín'],
      ['Máslo', 11, 'kg', 14, 'Mlékárna Jih'],
      ['Citron', 4, 'kg', 8, 'Zelenina Čechy'],
      ['Houskový knedlík', 32, 'kg', 2, 'Pekárna Rohlík'],
      ['Sádlo', 5, 'kg', 40, 'Maso U Dvořáků'],
      ['Paprika sladká', 2, 'kg', 120, 'Koření Morava'],
      ['Hovězí vývar', 20, 'l', 5, 'Vlastní výroba'],
      ['Chléb', 18, 'kg', 2, 'Pekárna Rohlík'],
      ['Kuřecí prsa', 25, 'kg', 3, 'Drůbež Klatovy'],
      ['Rýže', 20, 'kg', 180, 'Potraviny Východ'],
      ['Hrášek', 9, 'kg', 90, 'Mrazírny Tábor'],
      ['Tvrdý sýr', 8, 'kg', 20, 'Mlékárna Jih'],
      ['Zeleninový vývar', 24, 'l', 8, 'Vlastní výroba']
    ].map(([material, qty, unit, expiryDays, supplier], index) => ({
      id: `RM-2610-${String(index + 1).padStart(3, '0')}`,
      material,
      qty,
      unit,
      expiry: dateAfter(expiryDays),
      supplier,
      warehouse: 'material'
    }))
  };

  const storageKey = 'jidelna-food-production-v1';
  let state;
  let currentView = 'overview';
  let selectedRecipeId = recipes[0].id;
  let searchTerm = '';
  let receiptOpen = false;
  let toastTimeout;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    state = saved && Array.isArray(saved.orders) && Array.isArray(saved.lots) && Array.isArray(saved.materialLots)
      ? saved
      : JSON.parse(JSON.stringify(initialState));
  } catch (error) {
    console.error('Nepodařilo se načíst uložená výrobní data.', error);
    state = JSON.parse(JSON.stringify(initialState));
  }
  if (!Number.isInteger(state.batchCounter)) state.batchCounter = initialState.batchCounter;

  const content = document.getElementById('app-content');
  const dialog = document.getElementById('order-dialog');
  document.querySelector('.plant-heading').innerHTML = '<span class="live-dot"></span>Výroba běží';
  const sidebarStats = document.querySelectorAll('.plant-meta');
  sidebarStats[1].querySelector('span').textContent = 'Naplánované porce';
  sidebarStats[1].querySelector('strong').id = 'plant-capacity';
  document.querySelector('.user-name').textContent = 'Jana Nováková';
  document.querySelector('.user-role').textContent = 'Vedoucí provozu';
  document.querySelector('.avatar').textContent = 'JN';
  document.querySelector('.shift-tag').innerHTML = '<span class="live-dot"></span>Provozovna · Hlavní kuchyně';
  document.querySelector('.crumb').childNodes[0].nodeValue = 'Potravinářská výroba';
  const viewTitles = {
    overview: 'Přehled',
    recipes: 'Receptury a technologické postupy',
    plan: 'Plán výroby',
    orders: 'Výrobní příkazy',
    batches: 'Šarže a sledovatelnost',
    'stock-material': 'Sklad surovin',
    'stock-production': 'Sklad výroby',
    expedition: 'Expedice',
    'stock-expedition': 'Expediční sklad'
  };
  const statusLabels = {
    planned: 'Naplánováno',
    running: 'Probíhá výroba',
    produced: 'Připraveno k expedici',
    expedition: 'V expedičním skladu',
    shipped: 'Expedováno'
  };
  const warehouseLabels = {
    material: 'Sklad surovin',
    production: 'Sklad výroby',
    expedition: 'Expediční sklad',
    shipped: 'Expedováno'
  };

  function recipeFor(id) {
    return recipes.find((recipe) => recipe.id === id);
  }

  function orderFor(id) {
    return state.orders.find((order) => order.id === id);
  }

  function formatQty(value) {
    return new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 2 }).format(value);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })
      .format(new Date(`${value}T12:00:00`));
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error('Nepodařilo se uložit výrobní data.', error);
      showToast('Změny se nepodařilo uložit. Zkontrolujte dostupné úložiště prohlížeče.', true);
      return false;
    }
  }

  function showToast(message, isError = false) {
    document.querySelector('.food-toast')?.remove();
    clearTimeout(toastTimeout);
    const toast = document.createElement('div');
    toast.className = `food-toast${isError ? ' error' : ''}`;
    toast.setAttribute('role', isError ? 'alert' : 'status');
    toast.textContent = message;
    document.body.append(toast);
    toastTimeout = setTimeout(() => toast.remove(), 3600);
  }

  function heading(title, subtitle, action = '') {
    return `<div class="food-page-heading"><div><div class="eyebrow">Provoz · ${viewTitles[currentView]}</div><h1>${title}</h1><p class="subtitle">${subtitle}</p></div>${action}</div>`;
  }

  function stat(label, value, foot) {
    return `<article class="food-stat"><div class="food-stat-label">${label}</div><div class="food-stat-value">${value}</div><div class="food-stat-foot">${foot}</div></article>`;
  }

  function card(title, subtitle, body, action = '') {
    return `<section class="food-card"><div class="food-card-head"><div><h2 class="food-card-title">${title}</h2>${subtitle ? `<div class="food-card-subtitle">${subtitle}</div>` : ''}</div>${action}</div>${body}</section>`;
  }

  function statusPill(status) {
    return `<span class="food-status ${status}">${statusLabels[status] || status}</span>`;
  }

  function orderAction(order) {
    const actions = {
      planned: ['start', 'Vyskladnit suroviny a zahájit'],
      running: ['complete', 'Potvrdit výrobu'],
      produced: ['transfer', 'Přesunout do expedice'],
      expedition: ['ship', 'Odeslat zákazníkovi']
    };
    const action = actions[order.status];
    return action
      ? `<button class="food-action" data-food-action="${action[0]}" data-order-id="${order.id}">${action[1]}</button>`
      : '<span class="food-data-note">Uzavřeno</span>';
  }

  function orderRows(orders) {
    if (!orders.length) return '<tr><td colspan="7"><div class="food-empty">Pro tento výběr tu nejsou žádné příkazy.</div></td></tr>';
    return orders.map((order) => {
      const recipe = recipeFor(order.recipeId);
      return `<tr>
        <td><span class="food-code">${order.id}</span><span class="food-muted">${order.day} · ${order.time}</span></td>
        <td><strong>${recipe?.name || 'Neznámá receptura'}</strong><span class="food-muted">${order.kitchen}</span></td>
        <td>${formatQty(order.qty)} porcí</td>
        <td>${order.batchId ? `<span class="food-code">${order.batchId}</span>` : '<span class="food-muted">Přidělí se při zahájení</span>'}</td>
        <td>${escapeHtml(order.customer)}</td>
        <td>${statusPill(order.status)}</td>
        <td>${orderAction(order)}</td>
      </tr>`;
    }).join('');
  }

  function table(headers, rows) {
    return `<div class="food-table-wrap"><table class="food-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderOverview() {
    const activeOrders = state.orders.filter((order) => ['planned', 'running', 'produced', 'expedition'].includes(order.status));
    const dueToday = activeOrders.filter((order) => order.day === 'Po');
    const ready = state.orders.filter((order) => order.status === 'produced').length;
    const expiringSoon = state.materialLots.filter((lot) => lot.expiry <= dateAfter(3)).length;
    const production = dueToday.sort((a, b) => a.time.localeCompare(b.time));
    const tableRows = orderRows(production);
    const lowLots = state.materialLots.filter((lot) => lot.expiry <= dateAfter(3)).sort((a, b) => a.expiry.localeCompare(b.expiry)).slice(0, 5);
    const lowRows = lowLots.length
      ? lowLots.map((lot) => `<tr><td><strong>${lot.material}</strong><span class="food-muted">${lot.id}</span></td><td>${formatQty(lot.qty)} ${lot.unit}</td><td>${formatDate(lot.expiry)}</td></tr>`).join('')
      : '<tr><td colspan="3"><div class="food-empty">Všechny suroviny jsou nad minimální zásobou.</div></td></tr>';
    return `<div class="food-page">
      ${heading('Přehled výroby', 'Od receptury přes řízení šarže až po sklad hotových jídel a expedici.', '<button class="button-primary" data-food-action="new-order"><span class="plus">+</span> Nový výrobní příkaz</button>')}
      <div class="food-stats">
        ${stat('Aktivní příkazy', activeOrders.length, 'Ve všech fázích výroby a expedice')}
        ${stat('Porce ve výrobě dnes', formatQty(dueToday.reduce((sum, order) => sum + order.qty, 0)), 'Naplánované a rozpracované porce')}
        ${stat('Čeká na expedici', ready, 'Hotové šarže ve skladu výroby')}
        ${stat('Suroviny s blízkou expirací', expiringSoon, expiringSoon ? 'Spotřebujte nebo prověřte nejbližší šarže' : 'Žádná šarže neexpiruje do 3 dnů')}
      </div>
      <div class="food-grid">
        ${card('Dnešní výrobní program', 'Stav příkazů a návazné šarže', `${table(['Příkaz', 'Jídlo / pracoviště', 'Množství', 'Šarže', 'Odběratel', 'Stav', 'Další krok'], tableRows)}`)}
        ${card('Skladové zóny', 'Oddělený tok materiálu a hotových jídel', `<div class="food-card-body food-zone-list">${warehouseCard('material')}${warehouseCard('production')}${warehouseCard('expedition')}</div>`)}
      </div>
      ${card('Suroviny s blížící se expirací', 'Řiďte výdej podle FEFO: nejdříve spotřebujte nejbližší expiraci.', table(['Surovina', 'Zůstatek', 'Minimální trvanlivost'], lowRows))}
      <p class="food-data-note">Ukázková provozní data se ukládají v tomto prohlížeči. Pro skutečný provoz je potřeba připojit centrální databázi a oprávnění uživatelů.</p>
    </div>`;
  }

  function scaledIngredients(recipe, portions) {
    const multiplier = portions / recipe.basePortions;
    return recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      needed: ingredient.quantity * multiplier
    }));
  }

  function ingredientRows(recipe, portions) {
    return scaledIngredients(recipe, portions).map((ingredient) => {
      const available = state.materialLots
        .filter((lot) => lot.material === ingredient.name && lot.warehouse === 'material' && lot.expiry >= today)
        .reduce((sum, lot) => sum + lot.qty, 0);
      const enough = available >= ingredient.needed;
      return `<tr><td><strong>${ingredient.name}</strong></td><td>${formatQty(ingredient.needed)} ${ingredient.unit}</td><td>${formatQty(available)} ${ingredient.unit}</td><td>${enough ? '<span class="food-status shipped">Dostupné</span>' : '<span class="food-status produced">Nedostatek</span>'}</td></tr>`;
    }).join('');
  }

  function renderRecipes() {
    const recipe = recipeFor(selectedRecipeId) || recipes[0];
    const choices = recipes.map((item) => `<button class="food-recipe-choice${item.id === recipe.id ? ' active' : ''}" data-recipe-id="${item.id}"><strong>${item.name}</strong><span>${item.category} · normativ na ${item.basePortions} porcí</span></button>`).join('');
    return `<div class="food-page">
      ${heading('Receptury a technologické postupy', 'Normativ surovin na základní dávku se automaticky přepočítá na zadaný počet porcí.')}
      <div class="food-recipe-layout">
        ${card('Katalog receptur', 'Vyberte technologický list', `<div class="food-recipe-list">${choices}</div>`)}
        <div class="food-page">
          ${card(recipe.name, `${recipe.category} · dávka ${recipe.basePortions} porcí`, `<div class="food-card-body">
            <div class="food-recipe-facts"><span class="food-fact">Normativ: <strong>${recipe.basePortions} porcí</strong></span><span class="food-fact">Trvanlivost: <strong>${recipe.shelfLife} dny</strong></span><span class="food-fact">Alergeny: <strong>${recipe.allergens}</strong></span></div>
            <div class="food-calculator"><label for="recipe-portions">Přepočítat na porcí</label><input class="food-portion-input" id="recipe-portions" type="number" min="1" max="5000" value="120"><button class="food-action" data-food-action="new-order" data-recipe-id="${recipe.id}">Vytvořit příkaz z receptury</button></div>
            <div id="recipe-ingredients">${table(['Surovina', 'Potřebné množství', 'Skladem', 'Dostupnost'], ingredientRows(recipe, 120))}</div>
          </div>`)}
          ${card('Technologický postup', 'Dodržujte hygienické limity a zaznamenejte kontrolní body šarže.', `<div class="food-card-body"><ol class="food-procedure">${recipe.procedure.map((step) => `<li>${step}</li>`).join('')}</ol></div>`)}
        </div>
      </div>
    </div>`;
  }

  function renderOrders() {
    const filtered = state.orders.filter((order) => {
      const recipe = recipeFor(order.recipeId);
      return `${order.id} ${recipe?.name || ''} ${order.customer} ${order.batchId || ''}`
        .toLocaleLowerCase('cs-CZ').includes(searchTerm.toLocaleLowerCase('cs-CZ'));
    }).sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));
    return `<div class="food-page">
      ${heading('Výrobní příkazy', 'Každý příkaz nese recepturu, odběratele a šarži surovin až po expedici.', '<button class="button-primary" data-food-action="new-order"><span class="plus">+</span> Nový příkaz</button>')}
      ${card('Příkazy a jejich průběh', 'Zahájení odečte suroviny ze skladu FEFO; potvrzení založí šarži hotového jídla.', `<div class="food-toolbar"><input class="food-search" id="food-order-search" type="search" placeholder="Hledat příkaz, jídlo, odběratele nebo šarži…" value="${escapeHtml(searchTerm)}" aria-label="Hledat výrobní příkazy"><span class="food-data-note">${filtered.length} příkazů</span></div>${table(['Příkaz', 'Jídlo / pracoviště', 'Množství', 'Šarže', 'Odběratel', 'Stav', 'Akce'], orderRows(filtered))}`)}
    </div>`;
  }

  function renderPlan() {
    const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];
    const schedule = days.map((day) => {
      const rows = state.orders.filter((order) => order.day === day && order.status !== 'shipped')
        .sort((a, b) => a.time.localeCompare(b.time));
      return `<div class="food-plan-day"><div class="food-plan-day-head">${day}<span>${rows.length} příkazů</span></div>${rows.length ? rows.map((order) => `<div class="food-plan-item"><span class="food-code">${order.time} · ${order.id}</span><strong>${recipeFor(order.recipeId)?.name || ''}</strong><span>${formatQty(order.qty)} porcí · ${order.kitchen}</span>${statusPill(order.status)}</div>`).join('') : '<div class="food-empty">Zatím bez příkazů</div>'}</div>`;
    }).join('');
    return `<div class="food-page">
      ${heading('Plán výroby', 'Denní rozpis kuchyní a dávek navázaný na receptury a odběratele.', '<button class="button-primary" data-food-action="new-order"><span class="plus">+</span> Naplánovat výrobu</button>')}
      ${card('Týdenní plán', 'Přehled výrobních příkazů podle dne a času expedice.', `<div class="food-plan-grid">${schedule}</div>`)}
      ${card('Potřeba surovin pro naplánované příkazy', 'Součet normativů pro příkazy, které ještě nezačaly.', table(['Surovina', 'Potřeba', 'Dostupné', 'Rozdíl'], plannedRequirementRows()))}
    </div>`;
  }

  function plannedRequirementRows() {
    const totals = new Map();
    state.orders.filter((order) => order.status === 'planned').forEach((order) => {
      const recipe = recipeFor(order.recipeId);
      scaledIngredients(recipe, order.qty).forEach((item) => {
        const row = totals.get(item.name) || { needed: 0, unit: item.unit };
        row.needed += item.needed;
        totals.set(item.name, row);
      });
    });
    if (!totals.size) return '<tr><td colspan="4"><div class="food-empty">Všechny plánované příkazy jsou zahájené.</div></td></tr>';
    return Array.from(totals, ([name, row]) => {
      const available = state.materialLots.filter((lot) => lot.material === name && lot.warehouse === 'material' && lot.expiry >= today).reduce((sum, lot) => sum + lot.qty, 0);
      const enough = available >= row.needed;
      return `<tr><td><strong>${name}</strong></td><td>${formatQty(row.needed)} ${row.unit}</td><td>${formatQty(available)} ${row.unit}</td><td>${enough ? '<span class="food-status shipped">Pokryto</span>' : `<span class="food-status produced">Chybí ${formatQty(row.needed - available)} ${row.unit}</span>`}</td></tr>`;
    }).join('');
  }

  function renderBatches() {
    const finishedRows = state.orders.filter((order) => order.batchId).map((order) => {
      const recipe = recipeFor(order.recipeId);
      const lot = state.lots.find((entry) => entry.id === order.batchId);
      const inputs = order.materialLots?.length
        ? order.materialLots.map((input) => `${input.material}: ${formatQty(input.qty)} ${input.unit} (${input.lotId})`).join(', ')
        : 'Čeká na výdej surovin';
      const warehouse = lot ? warehouseLabels[lot.warehouse] : 'Rozpracovaná výroba';
      return `<tr><td><span class="food-code">${order.batchId}</span><span class="food-muted">${order.id}</span></td><td><strong>${recipe?.name || 'Neznámý výrobek'}</strong><span class="food-muted">${formatQty(lot?.qty ?? order.qty)} porcí</span></td><td>${warehouse}</td><td>${lot ? formatDate(lot.producedAt || today) : 'Probíhá'}</td><td>${lot ? formatDate(lot.expiry) : 'Po dokončení'}</td><td>${inputs}</td><td>${statusPill(order.status)}</td></tr>`;
    }).join('');
    const rawRows = state.materialLots.map((lot) => `<tr><td><span class="food-code">${lot.id}</span><span class="food-muted">${escapeHtml(lot.supplierLot || 'Počáteční zásoba')}</span></td><td><strong>${lot.material}</strong><span class="food-muted">${escapeHtml(lot.supplier)}</span></td><td>${formatQty(lot.qty)} ${lot.unit}</td><td>${formatDate(lot.expiry)}</td><td>${warehouseLabels[lot.warehouse] || lot.warehouse}</td></tr>`).join('');
    return `<div class="food-page">
      ${heading('Šarže a sledovatelnost', 'Dohledáte vstupní dodavatelskou šarži, výrobní dávku, expiraci i odběratele.')}
      <div class="food-grid food-grid-equal">
        ${card('Výrobní šarže a hotová jídla', 'Rozpracované i dokončené dávky s návazností na příkaz a vstupní suroviny.', table(['Šarže / příkaz', 'Výrobek / množství', 'Sklad / stav', 'Vyrobeno', 'Spotřebujte do', 'Vstupní suroviny', 'Stav'], finishedRows || '<tr><td colspan="7"><div class="food-empty">Zatím bez výrobních šarží.</div></td></tr>'))}
        ${card('Vstupní šarže surovin', 'Dodavatel, skladová zásoba a datum použitelnosti.', table(['Dodavatelská šarže', 'Surovina / dodavatel', 'Zůstatek', 'Spotřebujte do', 'Sklad'], rawRows))}
      </div>
    </div>`;
  }

  function warehouseCard(type) {
    const isMaterial = type === 'material';
    const entries = isMaterial
      ? state.materialLots.filter((lot) => lot.warehouse === type)
      : state.lots.filter((lot) => lot.warehouse === type);
    const quantity = isMaterial ? entries.length : entries.reduce((sum, lot) => sum + lot.qty, 0);
    const unit = isMaterial ? 'surovin v šaržích' : 'porcí hotových jídel';
    const target = type === 'material' ? 'stock-material' : type === 'production' ? 'stock-production' : 'stock-expedition';
    return `<button class="food-stock-card" data-food-view="${target}"><span class="food-stock-top"><span class="food-stock-name">${warehouseLabels[type]}</span><span class="food-stock-type">${entries.length} šarží</span></span><span class="food-stock-count">${formatQty(quantity)} <span>${unit}</span></span><span class="food-stock-foot">Otevřít sklad →</span></button>`;
  }

  function renderWarehouse(type) {
    const material = type === 'material';
    const entries = material
      ? state.materialLots.filter((lot) => lot.warehouse === type).sort((a, b) => a.expiry.localeCompare(b.expiry))
      : state.lots.filter((lot) => lot.warehouse === type).sort((a, b) => a.expiry.localeCompare(b.expiry));
    const rows = material
      ? entries.map((lot) => `<tr><td><span class="food-code">${lot.id}</span><span class="food-muted">${escapeHtml(lot.supplierLot || 'Počáteční zásoba')}</span></td><td><strong>${lot.material}</strong></td><td>${formatQty(lot.qty)} ${lot.unit}</td><td>${escapeHtml(lot.supplier)}</td><td>${formatDate(lot.expiry)}</td><td>${lot.expiry <= dateAfter(3) ? '<span class="food-status produced">Brzká expirace</span>' : '<span class="food-status shipped">V pořádku</span>'}</td></tr>`).join('')
      : entries.map((lot) => `<tr><td><span class="food-code">${lot.id}</span></td><td><strong>${recipeFor(lot.recipeId)?.name || ''}</strong><span class="food-muted">${lot.orderId}</span></td><td>${formatQty(lot.qty)} ${lot.unit}</td><td>${formatDate(lot.producedAt || today)}</td><td>${formatDate(lot.expiry)}</td><td>${statusPill(orderFor(lot.orderId)?.status || 'produced')}</td></tr>`).join('');
    const emptyMessage = type === 'production' ? 'Ve skladu výroby nejsou hotové dávky.' : type === 'expedition' ? 'Expediční sklad je prázdný.' : 'Sklad surovin je prázdný.';
    const headers = material
      ? ['Dodavatelská šarže', 'Surovina', 'Zůstatek', 'Dodavatel', 'Spotřebujte do', 'Stav']
      : ['Výrobní šarže', 'Jídlo / příkaz', 'Množství', 'Vyrobeno', 'Spotřebujte do', 'Stav'];
    const storageNote = material
      ? '<p class="food-data-note">Při zahájení příkazu se suroviny rezervují ze šarží s nejbližší expirací (FEFO).</p>'
      : '<p class="food-data-note">Každá hotová dávka zůstává dohledatelná přes výrobní příkaz a použité šarže surovin.</p>';
    const receiveAction = material ? '<button class="button-secondary" data-food-action="toggle-receipt">+ Příjem surovin</button>' : '';
    const receiptForm = material && receiptOpen ? renderReceiptForm() : '';
    return `<div class="food-page">
      ${heading(warehouseLabels[type], material ? 'Příjem surovin, dodavatelské šarže a kontrola použitelnosti.' : type === 'production' ? 'Hotové dávky čekající na přesun do expedičního skladu.' : 'Připravené objednávky, kontrola expedice a dohledatelnost odběratele.', receiveAction)}
      ${receiptForm}
      ${card('Skladové zóny', 'Oddělené zásoby pro celý výrobní tok.', `<div class="food-card-body"><div class="food-tabs">${[['stock-material', 'Sklad surovin'], ['stock-production', 'Sklad výroby'], ['stock-expedition', 'Expediční sklad']].map(([view, label]) => `<button class="food-tab${currentView === view ? ' active' : ''}" data-food-view="${view}">${label}</button>`).join('')}</div></div>`)}
      ${card(warehouseLabels[type], `${entries.length} šarží / skladových položek`, `${table(headers, rows || `<tr><td colspan="6"><div class="food-empty">${emptyMessage}</div></td></tr>`)}<div class="food-card-body">${storageNote}</div>`)}
      <div class="food-stock-zones">${warehouseCard('material')}${warehouseCard('production')}${warehouseCard('expedition')}</div>
    </div>`;
  }

  function renderReceiptForm() {
    const ingredients = [...new Map(recipes.flatMap((recipe) => recipe.ingredients).map((item) => [item.name, item])).values()];
    const ingredientOptions = ingredients.map((item) => `<option value="${item.name}">${item.name} (${item.unit})</option>`).join('');
    return card('Příjem nové dodávky', 'Každý příjem založí samostatnou skladovou šarži s dodavatelem a datem použitelnosti.', `<div class="food-card-body">
      <div class="food-receipt-grid">
        <label class="food-receipt-field">Surovina<select class="select" id="receipt-material">${ingredientOptions}</select></label>
        <label class="food-receipt-field">Množství<input class="food-search" id="receipt-quantity" type="number" min="0.01" step="0.01" value="10"></label>
        <label class="food-receipt-field">Dodavatel<input class="food-search" id="receipt-supplier" type="text" value="Nový dodavatel"></label>
        <label class="food-receipt-field">Dodavatelská šarže<input class="food-search" id="receipt-supplier-lot" type="text" placeholder="Např. DOD-2026-001"></label>
        <label class="food-receipt-field">Spotřebujte do<input class="food-search" id="receipt-expiry" type="date" value="${dateAfter(14)}"></label>
      </div>
      <div class="food-action-row"><button class="food-action" data-food-action="receive-material">Zaevidovat příjem na sklad surovin</button><button class="food-action secondary" data-food-action="toggle-receipt">Zrušit</button></div>
    </div>`);
  }

  function renderExpedition() {
    const list = state.orders.filter((order) => ['produced', 'expedition', 'shipped'].includes(order.status))
      .sort((a, b) => a.time.localeCompare(b.time));
    const active = list.filter((order) => order.status !== 'shipped');
    const rows = [...active, ...list.filter((order) => order.status === 'shipped')];
    return `<div class="food-page">
      ${heading('Expedice hotových jídel', 'Přesun ze skladu výroby do expediční zóny a potvrzení předání odběrateli.')}
      <div class="food-stats">${stat('Čeká ve skladu výroby', state.orders.filter((order) => order.status === 'produced').length, 'Hotové šarže k vyskladnění')}${stat('Připraveno k odjezdu', state.orders.filter((order) => order.status === 'expedition').length, 'V expedičním skladu')}${stat('Expedováno dnes', state.orders.filter((order) => order.shippedAt === today).length, 'Uzavřené příkazy')}${stat('Šarží v expedici', state.lots.filter((lot) => lot.warehouse === 'expedition').length, 'Skladová evidence hotových jídel')}</div>
      ${card('Expediční příkazy', 'Přesun a výdej se zaznamenávají proti původní výrobní šarži.', table(['Příkaz', 'Jídlo / pracoviště', 'Porce', 'Šarže', 'Odběratel', 'Stav', 'Další krok'], orderRows(rows)))}
      ${card('Expediční sklad', 'Fyzicky oddělené hotové dávky určené k rozvozu.', `<div class="food-card-body"><div class="food-stock-zones">${warehouseCard('production')}${warehouseCard('expedition')}</div></div>`)}
    </div>`;
  }

  function render() {
    const renderer = {
      overview: renderOverview,
      recipes: renderRecipes,
      plan: renderPlan,
      orders: renderOrders,
      batches: renderBatches,
      'stock-material': () => renderWarehouse('material'),
      'stock-production': () => renderWarehouse('production'),
      expedition: renderExpedition,
      'stock-expedition': () => renderWarehouse('expedition')
    }[currentView] || renderOverview;
    document.getElementById('crumb-title').textContent = viewTitles[currentView] || viewTitles.overview;
    document.querySelectorAll('.nav [data-view]').forEach((button) => {
      button.classList.toggle('active', button.dataset.view === currentView);
    });
    document.getElementById('nav-pending').textContent = String(state.orders.filter((order) => order.status === 'produced').length);
    const capacity = document.getElementById('plant-capacity');
    if (capacity) capacity.textContent = formatQty(state.orders.filter((order) => order.status === 'planned').reduce((sum, order) => sum + order.qty, 0));
    document.getElementById('top-date').textContent = new Intl.DateTimeFormat('cs-CZ', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());
    content.innerHTML = renderer();
  }

  function openNewOrder(recipeId) {
    const form = document.getElementById('order-form');
    if (recipeId) form.elements.product.value = recipeId;
    dialog.showModal();
  }

  function createOrder() {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    const qty = Number(formData.get('quantity'));
    if (!Number.isInteger(qty) || qty < 1 || qty > 5000) {
      showToast('Počet porcí musí být celé číslo od 1 do 5 000.', true);
      return;
    }
    const recipeId = String(formData.get('product'));
    if (!recipeFor(recipeId)) {
      showToast('Vybraná receptura neexistuje.', true);
      return;
    }
    const customer = String(formData.get('customer')).trim();
    if (!customer) {
      showToast('Vyplňte odběratele výrobního příkazu.', true);
      return;
    }
    const nextNumber = Math.max(26054, ...state.orders.map((order) => Number(order.id.slice(2)) || 0)) + 1;
    const previousState = JSON.stringify(state);
    state.orders.push({
      id: `V-${nextNumber}`,
      recipeId,
      qty,
      kitchen: String(formData.get('line')),
      day: String(formData.get('day')),
      time: String(formData.get('time')),
      status: 'planned',
      batchId: null,
      customer
    });
    if (!saveState()) {
      state = JSON.parse(previousState);
      return;
    }
    dialog.close();
    form.reset();
    currentView = 'orders';
    render();
    showToast(`Příkaz V-${nextNumber} naplánován. Potřebu surovin zobrazí receptura a plán výroby.`);
  }

  function startOrder(order) {
    const recipe = recipeFor(order.recipeId);
    if (!recipe) {
      showToast(`U příkazu ${order.id} chybí platná receptura.`, true);
      return;
    }
    const needs = scaledIngredients(recipe, order.qty);
    const shortfalls = needs.map((need) => {
      const available = state.materialLots
        .filter((lot) => lot.material === need.name && lot.warehouse === 'material' && lot.expiry >= today)
        .reduce((sum, lot) => sum + lot.qty, 0);
      return { ...need, available };
    }).filter((need) => need.available < need.needed);
    if (shortfalls.length) {
      showToast(`Nelze zahájit výrobu. Chybí: ${shortfalls.map((item) => `${item.name} ${formatQty(item.needed - item.available)} ${item.unit}`).join(', ')}.`, true);
      return;
    }

    const previousState = JSON.stringify(state);
    const allocations = [];
    needs.forEach((need) => {
      let remaining = need.needed;
      const eligibleLots = state.materialLots
        .filter((lot) => lot.material === need.name && lot.warehouse === 'material' && lot.expiry >= today)
        .sort((a, b) => a.expiry.localeCompare(b.expiry));
      eligibleLots.forEach((lot) => {
        if (remaining <= 0) return;
        const used = Math.min(remaining, lot.qty);
        lot.qty = Number((lot.qty - used).toFixed(4));
        remaining = Number((remaining - used).toFixed(4));
        allocations.push({ lotId: lot.id, material: need.name, qty: used, unit: need.unit });
      });
    });
    const counter = state.batchCounter++;
    order.batchId = `S-${today.slice(2).replaceAll('-', '')}-${String(counter).padStart(3, '0')}`;
    order.materialLots = allocations;
    order.status = 'running';
    if (!saveState()) {
      state = JSON.parse(previousState);
      render();
      return;
    }
    render();
    showToast(`${order.id}: výdej surovin zaevidován podle FEFO. Šarže ${order.batchId} zahájena.`);
  }

  function completeOrder(order) {
    if (state.lots.some((lot) => lot.id === order.batchId)) {
      showToast(`Šarže ${order.batchId} už byla do skladu výroby založena.`, true);
      return;
    }
    const recipe = recipeFor(order.recipeId);
    if (!recipe || !order.batchId) {
      showToast(`Příkaz ${order.id} nemá platnou recepturu nebo výrobní šarži.`, true);
      return;
    }
    const previousState = JSON.stringify(state);
    state.lots.push({
      id: order.batchId,
      recipeId: order.recipeId,
      qty: order.qty,
      unit: 'porcí',
      warehouse: 'production',
      expiry: dateAfter(recipe.shelfLife),
      orderId: order.id,
      producedAt: today
    });
    order.status = 'produced';
    if (!saveState()) {
      state = JSON.parse(previousState);
      render();
      return;
    }
    render();
    showToast(`Šarže ${order.batchId} uložena do skladu výroby. Spotřebujte do ${formatDate(dateAfter(recipe.shelfLife))}.`);
  }

  function transferToExpedition(order) {
    const lot = state.lots.find((entry) => entry.id === order.batchId);
    if (!lot || lot.warehouse !== 'production') {
      showToast(`Šarže ${order.batchId || order.id} není dostupná ve skladu výroby.`, true);
      return;
    }
    const previousState = JSON.stringify(state);
    lot.warehouse = 'expedition';
    order.status = 'expedition';
    if (!saveState()) {
      state = JSON.parse(previousState);
      render();
      return;
    }
    render();
    showToast(`Šarže ${lot.id} přesunuta do expedičního skladu.`);
  }

  function dispatchOrder(order) {
    const lot = state.lots.find((entry) => entry.id === order.batchId);
    if (!lot || lot.warehouse !== 'expedition') {
      showToast(`Šarže ${order.batchId || order.id} není v expedičním skladu.`, true);
      return;
    }
    const previousState = JSON.stringify(state);
    lot.warehouse = 'shipped';
    order.status = 'shipped';
    order.shippedAt = today;
    if (!saveState()) {
      state = JSON.parse(previousState);
      render();
      return;
    }
    render();
    showToast(`Příkaz ${order.id} a šarže ${lot.id} předány odběrateli ${order.customer}.`);
  }

  document.querySelector('.nav').addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button || !viewTitles[button.dataset.view]) return;
    currentView = button.dataset.view;
    document.getElementById('sidebar').classList.remove('open');
    render();
  });

  content.addEventListener('click', (event) => {
    const viewButton = event.target.closest('[data-food-view]');
    if (viewButton) {
      currentView = viewButton.dataset.foodView;
      render();
      return;
    }
    const recipeButton = event.target.closest('.food-recipe-choice');
    if (recipeButton) {
      selectedRecipeId = recipeButton.dataset.recipeId;
      render();
      return;
    }
    const button = event.target.closest('[data-food-action]');
    if (!button) return;
    const action = button.dataset.foodAction;
    if (action === 'new-order') {
      openNewOrder(button.dataset.recipeId);
      return;
    }
    if (action === 'toggle-receipt') {
      receiptOpen = !receiptOpen;
      render();
      return;
    }
    if (action === 'receive-material') {
      recordReceipt();
      return;
    }
    if (action === 'save-order') {
      createOrder();
      return;
    }
    const order = orderFor(button.dataset.orderId);
    if (!order) {
      showToast('Výrobní příkaz už nebyl nalezen. Obnovte stránku a zkuste to znovu.', true);
      return;
    }
    if (action === 'start' && order.status === 'planned') startOrder(order);
    else if (action === 'complete' && order.status === 'running') completeOrder(order);
    else if (action === 'transfer' && order.status === 'produced') transferToExpedition(order);
    else if (action === 'ship' && order.status === 'expedition') dispatchOrder(order);
  });

  content.addEventListener('input', (event) => {
    if (event.target.id === 'food-order-search') {
      searchTerm = event.target.value;
      const cursor = event.target.selectionStart;
      const scrollTop = content.scrollTop;
      render();
      const input = document.getElementById('food-order-search');
      input.focus();
      input.setSelectionRange(cursor, cursor);
      content.scrollTop = scrollTop;
      return;
    }
    if (event.target.id === 'recipe-portions') {
      const portions = Math.max(1, Math.min(5000, Number(event.target.value) || 1));
      const recipe = recipeFor(selectedRecipeId);
      document.getElementById('recipe-ingredients').innerHTML = table(
        ['Surovina', 'Potřebné množství', 'Skladem', 'Dostupnost'],
        ingredientRows(recipe, portions)
      );
    }
  });

  function recordReceipt() {
    const material = document.getElementById('receipt-material').value;
    const ingredient = recipes.flatMap((recipe) => recipe.ingredients).find((item) => item.name === material);
    const quantity = Number(document.getElementById('receipt-quantity').value);
    const supplier = document.getElementById('receipt-supplier').value.trim();
    const supplierLot = document.getElementById('receipt-supplier-lot').value.trim();
    const expiry = document.getElementById('receipt-expiry').value;
    if (!ingredient || !Number.isFinite(quantity) || quantity <= 0 || !supplier || !supplierLot || !expiry || expiry < today) {
      showToast('Vyplňte surovinu, kladné množství, dodavatele, dodavatelskou šarži a platné datum použitelnosti.', true);
      return;
    }
    const previousState = JSON.stringify(state);
    const counter = state.batchCounter++;
    state.materialLots.push({
      id: `RM-${today.slice(2).replaceAll('-', '')}-${String(counter).padStart(3, '0')}`,
      material,
      qty: quantity,
      unit: ingredient.unit,
      expiry,
      supplier,
      supplierLot,
      warehouse: 'material'
    });
    if (!saveState()) {
      state = JSON.parse(previousState);
      render();
      return;
    }
    receiptOpen = false;
    render();
    showToast(`Příjem ${material} zaevidován jako dodavatelská šarže ${supplierLot}.`);
  }

  document.getElementById('food-save-order').addEventListener('click', createOrder);
  document.getElementById('order-form').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') event.preventDefault();
  });
  document.getElementById('notification-button').addEventListener('click', () => {
    currentView = 'expedition';
    render();
  });
  render();
})();
