const tools = document.querySelector('.catalog-tools');
const buttons = [...tools.querySelectorAll('[data-filter]')];
const search = document.querySelector('#project-search');
const cards = [...document.querySelectorAll('[data-area]')];
const count = document.querySelector('#project-count');
let area = 'all';

function filterProjects() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    card.hidden = (area !== 'all' && card.dataset.area !== area) ||
      !card.textContent.toLowerCase().includes(query);
    if (!card.hidden) visible += 1;
  }
  count.textContent = visible === 0 ? 'No projects match. Try another search or filter.' :
    `${visible} of ${cards.length} public projects`;
}
for (const button of buttons) {
  button.addEventListener('click', () => {
    area = button.dataset.filter;
    for (const candidate of buttons) candidate.setAttribute('aria-pressed', String(candidate === button));
    filterProjects();
  });
}
search.addEventListener('input', filterProjects);
tools.hidden = false;
