// DayHack — Everyday Life Theme JavaScript

// Form submission handling
const form = document.getElementById("submitForm");
const msg = document.getElementById("formMsg");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const team = document.getElementById("team").value.trim();
  const lead = document.getElementById("lead").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const category = document.getElementById("category").value;

  if (!team || !lead || !desc) {
    msg.textContent = "Please fill out all required fields.";
    msg.style.color = "red";
    return;
  }

  // Display temporary success message
  msg.textContent = "Submission received! (Locally stored only)";
  msg.style.color = "green";

  // Save locally (browser only)
  const existing = JSON.parse(localStorage.getItem("submissions") || "[]");
  existing.push({ team, lead, desc, category, time: new Date().toLocaleString() });
  localStorage.setItem("submissions", JSON.stringify(existing));

  // Clear form after submit
  form.reset();
});

// Clear button
clearBtn.addEventListener("click", () => {
  form.reset();
  msg.textContent = "";
});

// View local submissions popup
function viewSubmissions() {
  const data = JSON.parse(localStorage.getItem("submissions") || "[]");

  if (data.length === 0) {
    alert("No submissions saved yet.");
    return;
  }

  let output = "Saved Submissions:\n\n";
  data.forEach((s, i) => {
    output += `${i + 1}. ${s.team} — ${s.category}\nLead: ${s.lead}\nDesc: ${s.desc}\nTime: ${s.time}\n\n`;
  });

  alert(output);
}
