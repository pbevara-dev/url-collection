const supabaseUrl = 'https://wwhynowfbqstroqxhnfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHlub3dmYnFzdHJvcXhobmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MDgyNjUsImV4cCI6MjA0NzM4NDI2NX0.ExABFHnmc3mr0JytWs5P2_SUuvqZ7lg1ijBA9f22_vY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("url-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;
  
  if (name && url) {
    // Insert URL into Supabase
    const { data, error } = await supabase
      .from('urls')
      .insert([{ name, url }]);
    
    if (error) {
      alert('Error inserting data');
    } else {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong>: <a href="${url}" target="_blank">${url}</a>`;
      document.getElementById("url-list").appendChild(li);
    }
    
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
  }
});
