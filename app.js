document.getElementById("url-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;
  
  if (name && url) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong>: <a href="${url}" target="_blank">${url}</a>`;
    document.getElementById("url-list").appendChild(li);
    
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
  }
});
