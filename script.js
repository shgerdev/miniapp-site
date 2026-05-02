const sections = document.querySelectorAll(".section");

const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    }
  },
  { threshold: 0.18 }
);

sections.forEach((section) => reveal.observe(section));

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();

  const startParam = tg.initDataUnsafe?.start_param;
  if (startParam) {
    document.querySelectorAll("[data-bot-link]").forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set("start", startParam);
      link.href = url.toString();
    });
  }
}

document.querySelectorAll("[data-bot-link]").forEach((link) => {
  link.addEventListener("click", () => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred("medium");
    }
  });
});
