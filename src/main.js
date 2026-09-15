// withGlobalTauri (set in tauri.conf.json) exposes window.__TAURI__ so this
// plain static page can call Rust commands without a JS bundler.
const { invoke } = window.__TAURI__.core;

const form = document.getElementById("login-form");
const status = document.getElementById("status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in…";
  status.textContent = "";
  status.removeAttribute("data-state");

  try {
    const result = await invoke("login", { username, password });

    if (result.success) {
      status.dataset.state = "success";
      status.textContent = result.message;
      // Navigate to your app's main view here, e.g.:
      // window.location.href = "dashboard.html";
    } else {
      status.dataset.state = "error";
      status.textContent = result.message;
    }
  } catch (err) {
    status.dataset.state = "error";
    status.textContent = "Something went wrong. Try again.";
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign in";
  }
});
