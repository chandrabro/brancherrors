let errorsData = [];

// Load errors.json
fetch('errors.json')
  .then(response => response.json())
  .then(data => errorsData = data)
  .catch(err => console.error("Failed to load error data:", err));

document.getElementById('searchBtn').addEventListener('click', searchError);

function searchError() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter an error code or description.</p>";
    return;
  }

  const matches = errorsData.filter(error =>
    error.title.toLowerCase().includes(query) ||
    error.keywords.some(k => k.toLowerCase().includes(query))
  );

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No matching error found.</p>";
    return;
  }

  matches.forEach(err => {
    const div = document.createElement('div');
    div.innerHTML = `<div id="errorTitle">${err.title}</div>
                     <div id="errorSolution">${err.solution}</div>`;
    resultsDiv.appendChild(div);
  });
}
