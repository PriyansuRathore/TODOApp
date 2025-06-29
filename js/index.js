document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const error = document.getElementById('error');

  if (localStorage.getItem('taskflow_user')) {
    window.location.href = 'app.html';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;

    if (!name || !dob) {
      error.textContent = "Please fill all fields.";
      error.style.display = "block";
      return;
    }

    const age = calculateAge(dob);
    if (age <= 10) {
      error.textContent = "You must be over 10 years old.";
      error.style.display = "block";
      return;
    }

    const userData = { name, dob };
    localStorage.setItem('taskflow_user', JSON.stringify(userData));
    window.location.href = 'app.html';
  });

  function calculateAge(dob) {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
});