document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('jobApplicationForm');
  const table = document.getElementById('applicationsTable');
  const viewApplicationsBtn = document.getElementById('viewApplications');
  const addJobTitleBtn = document.getElementById('addJobTitle');
  let jobTitleCounter = 1;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (form.checkValidity()) {
      const phoneNumber = form.phone.value;
      const email = form.email.value;
      if (!isValidPhoneNumber(phoneNumber)) {
        alert('Please enter a valid Pakistani phone number.');
        return;
      }
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      const applicantData = getFormData(form);
      saveApplication(applicantData);
      form.reset();
      console.log('Application submitted:', applicantData);
    }
  });

  viewApplicationsBtn.addEventListener('click', function() {
    displayApplications();
  });

  addJobTitleBtn.addEventListener('click', function() {
    addJobTitleInput();
  });

  function isValidPhoneNumber(phone) {
    const phoneRegex = /^(?:\+92|92)?[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function getFormData(form) {
    const formData = {};
    for (const element of form.elements) {
      if (element.type !== 'submit') {
        if (element.type === 'file') {
          formData[element.name] = element.files[0].name;
        } else if (element.type === 'checkbox') {
          formData[element.name] = element.checked ? 'Yes' : 'No';
        } else {
          formData[element.name] = element.value;
        }
      }
    }
    return formData;
  }

  function saveApplication(data) {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(data);
    localStorage.setItem('applications', JSON.stringify(applications));
  }

  function displayApplications() {
    const applications = JSON.parse(localStorage.getItem('applications'));
    if (applications && applications.length > 0) {
      table.innerHTML = '';
      const tableHeaders = Object.keys(applications[0]);
      const headerRow = table.insertRow();
      tableHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });

      applications.forEach(application => {
        const row = table.insertRow();
        tableHeaders.forEach(header => {
          const cell = row.insertCell();
          cell.textContent = application[header];
        });
      });
    } else {
      console.log('No applications to display.');
    }
  }

  function addJobTitleInput() {
    jobTitleCounter++;
    const jobTitlesDiv = document.getElementById('jobTitles');
    const newJobTitleDiv = document.createElement('div');
    newJobTitleDiv.classList.add('jobTitle');
    newJobTitleDiv.innerHTML = `
      <label for="jobTitle${jobTitleCounter}">Previous Job Title:</label>
      <input type="text" id="jobTitle${jobTitleCounter}" required>
    `;
    jobTitlesDiv.appendChild(newJobTitleDiv);
  }
});
