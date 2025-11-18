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
