const $ = (id) => document.getElementById(id);
let current = 0;

function buildMenu(filterText = "") {
  const menu = $("menu");
  menu.innerHTML = "";
  const q = filterText.trim().toLowerCase();
  experiments.forEach((exp, i) => {
    if (q && !(exp.title + " " + exp.manual).toLowerCase().includes(q)) return;
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = '<span class="n">' + (i + 1) + "</span><span></span>";
    btn.lastChild.textContent = exp.title;
    if (i === current) btn.setAttribute("aria-current", "true");
    btn.addEventListener("click", () => show(i));
    li.appendChild(btn);
    menu.appendChild(li);
  });
  if (!menu.children.length) menu.innerHTML = "<li>No experiment matches your search.</li>";
}

function show(i, scroll = true) {
  current = Math.max(0, Math.min(experiments.length - 1, i));
  const exp = experiments[current];
  $("count").textContent = "Experiment " + (current + 1) + " of " + experiments.length;
  $("title").textContent = exp.title;
  $("manual").textContent = exp.manual;
  $("code").textContent = exp.code;
  $("prev").disabled = current === 0;
  $("next").disabled = current === experiments.length - 1;
  resetCopy();
  buildMenu($("filter").value);
  history.replaceState(null, "", "#exp-" + (current + 1));
  document.title = "Exp " + (current + 1) + " - DSA Lab Manual";
  if (scroll) $("content").scrollIntoView({ block: "start" });
}

function resetCopy() {
  const b = $("copy");
  b.textContent = "Copy code";
  b.classList.remove("done");
}

async function copyCode() {
  const text = experiments[current].code;
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for pages opened as a local file (no clipboard permission)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const b = $("copy");
  b.textContent = "Copied";
  b.classList.add("done");
  setTimeout(resetCopy, 1800);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("theme").textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

$("copy").addEventListener("click", copyCode);
$("prev").addEventListener("click", () => show(current - 1));
$("next").addEventListener("click", () => show(current + 1));
$("filter").addEventListener("input", (e) => buildMenu(e.target.value));
$("theme").addEventListener("click", () =>
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

const fromHash = parseInt((location.hash.match(/exp-(\d+)/) || [])[1], 10);
show(fromHash ? fromHash - 1 : 0, false);
