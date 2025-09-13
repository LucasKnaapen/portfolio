const buttons = document.querySelectorAll('.year-buttons button');
const projects = document.querySelectorAll('.projects .project');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Active button styling
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const year = button.dataset.year;

    projects.forEach(project => {
      if (year === 'all' || project.dataset.year === year) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});
