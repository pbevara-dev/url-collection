import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wwhynowfbqstroqxhnfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHlub3dmYnFzdHJvcXhobmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MDgyNjUsImV4cCI6MjA0NzM4NDI2NX0.ExABFHnmc3mr0JytWs5P2_SUuvqZ7lg1ijBA9f22_vY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to add a URL to the database
document.getElementById("url-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;
  
  if (name && url) {
    // Insert URL into Supabase
    const { data, error } = await supabase
      .from('urls')
      .insert([{ name, url }]);

    // Check for errors
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data: ' + error.message); // Show error message
    } else {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong>: <a href="${url}" target="_blank">${url}</a>`;
      document.getElementById("url-list").appendChild(li);
    }
    
    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
  } else {
    alert('Please fill in both fields.');
  }
});

// Function to search URLs based on input from the search bar
async function searchUrls() {
  const searchQuery = document.getElementById("search-bar").value.toLowerCase();
  
  // Query Supabase for matching URLs by name or URL
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .or(`name.ilike.%${searchQuery}%,url.ilike.%${searchQuery}%`); // Search by name or URL

  if (error) {
    console.error('Error searching URLs:', error);
    return;
  }

  // Clear the URL list before displaying search results
  document.getElementById("url-list").innerHTML = '';
  
  // Display the results
  if (data.length > 0) {
    data.forEach(urlData => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${urlData.name}</strong>: <a href="${urlData.url}" target="_blank">${urlData.url}</a>`;
      document.getElementById("url-list").appendChild(li);
    });
  } else {
    document.getElementById("url-list").innerHTML = '<li>No matching URLs found.</li>';
  }
}

// Add event listener to the search button
document.getElementById("search-button").addEventListener("click", searchUrls);
