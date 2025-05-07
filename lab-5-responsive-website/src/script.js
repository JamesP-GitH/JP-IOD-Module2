function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function checkBarsInView() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
        const fill = bar.querySelector(".fill");

        if (isInView(bar) && !bar.classList.contains("in-view")) {
            bar.classList.add("in-view");
            // Re-enable transition after it's been reset
            fill.style.transition = "width 2s 0.5s ease-out";
            fill.style.width = getComputedStyle(fill).getPropertyValue("--bar-width");
        } else if (!isInView(bar) && bar.classList.contains("in-view")) {
            bar.classList.remove("in-view");
            // Instantly reset width with no transition
            fill.style.transition = "none";
            fill.style.width = "0";
        }
    });
}

function handleVisibilityChange() {
    if (document.hidden) {
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar) => {
            const fill = bar.querySelector(".fill");
            bar.classList.remove("in-view");
            fill.style.transition = "none";
            fill.style.width = "0";
        });
    }
}

window.addEventListener("scroll", checkBarsInView);
window.addEventListener("load", checkBarsInView);
document.addEventListener("visibilitychange", handleVisibilityChange);

checkBarsInView();
