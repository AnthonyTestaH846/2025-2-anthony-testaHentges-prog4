// Menu selecionado
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('selected'));
        
        item.classList.add('selected');
    });
});

// Efeito de destaque ao rolar
const topics = document.querySelectorAll('.topic');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

topics.forEach(topic => {
  observer.observe(topic);
});
