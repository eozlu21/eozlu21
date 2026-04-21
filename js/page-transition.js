/**
 * Convolution Page Transition
 * ----------------------------
 * 4x4 grid, 2x2 kernel. Small centered animation.
 * Current page slides down, new page slides in from top.
 */
(function () {
    'use strict';

    var GRID = 4;
    var KERNEL = 2;
    var BG_COLOR = '#F9F9F7';
    var CELL_COLOR = '#E0E0DC';
    var KERN_COLOR = '#1A1A1A';
    var KERN_FILL = 'rgba(26, 26, 26, 0.15)';
    var ANIM_SIZE = 120;       // px — total canvas display size
    var DURATION = 300;       // ms for the convolution sweep

    var overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    var canvas = document.createElement('canvas');
    overlay.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // size the canvas once
    var dpr = window.devicePixelRatio || 1;
    canvas.width = ANIM_SIZE * dpr;
    canvas.height = ANIM_SIZE * dpr;
    canvas.style.width = ANIM_SIZE + 'px';
    canvas.style.height = ANIM_SIZE + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var metaBase = document.querySelector('meta[name="baseurl"]');
    var BASE = metaBase ? metaBase.getAttribute('content') : '';

    function lerp(a, b, t) { return a + (b - a) * t; }
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // kernel positions
    var positions = [];
    for (var r = 0; r <= GRID - KERNEL; r++) {
        for (var c = 0; c <= GRID - KERNEL; c++) {
            positions.push([r, c]);
        }
    }

    function fillRR(x, y, w, h, rad) {
        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + w - rad, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad);
        ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.closePath();
        ctx.fill();
    }

    function strokeRR(x, y, w, h, rad) {
        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + w - rad, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad);
        ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.closePath();
        ctx.stroke();
    }

    function drawConvolution(progress) {
        var S = ANIM_SIZE;
        var pad = 20;
        var cellSize = (S - 2 * pad - (GRID - 1) * 6) / GRID;
        var gap = 6;
        var ox = pad;
        var oy = pad;

        ctx.clearRect(0, 0, S, S);

        // draw grid
        for (var r = 0; r < GRID; r++) {
            for (var c = 0; c < GRID; c++) {
                ctx.fillStyle = CELL_COLOR;
                fillRR(ox + c * (cellSize + gap), oy + r * (cellSize + gap), cellSize, cellSize, 3);
            }
        }

        // kernel position
        var posIdx = Math.min(Math.floor(progress * positions.length), positions.length - 1);
        var subT = (progress * positions.length) - posIdx;

        var kr = positions[posIdx][0];
        var kc = positions[posIdx][1];
        var kx = ox + kc * (cellSize + gap);
        var ky = oy + kr * (cellSize + gap);

        if (posIdx < positions.length - 1) {
            var nr = positions[posIdx + 1][0];
            var nc = positions[posIdx + 1][1];
            var nx = ox + nc * (cellSize + gap);
            var ny = oy + nr * (cellSize + gap);
            var e = ease(subT);
            kx = lerp(kx, nx, e);
            ky = lerp(ky, ny, e);
        }

        var kSize = KERNEL * cellSize + (KERNEL - 1) * gap;

        // highlight cells under kernel
        ctx.fillStyle = KERN_FILL;
        fillRR(kx, ky, kSize, kSize, 3);

        // kernel border
        ctx.strokeStyle = KERN_COLOR;
        ctx.lineWidth = 2;
        strokeRR(kx - 2, ky - 2, kSize + 4, kSize + 4, 5);
    }

    /* ── Page content wrapper ref ─────────────────────────── */
    var contentWrap = null;
    function getContentWrap() {
        // The main content container below the navbar
        if (!contentWrap) {
            contentWrap = document.querySelector('body > .container-fluid');
        }
        return contentWrap;
    }

    /* ── Transition flow ──────────────────────────────────── */
    var NAV_PAGES = ['/', '/team', '/vacancies', '/publications', '/research'];

    function isNavLink(href) {
        if (!href) return false;
        try {
            var url = new URL(href, window.location.origin);
            var path = url.pathname.replace(/\/+$/, '') || '/';
            var basePath = BASE.replace(/\/+$/, '');
            var relative = basePath ? path.replace(basePath, '') : path;
            var clean = relative.replace(/\/+$/, '') || '/';
            return NAV_PAGES.indexOf(clean) !== -1;
        } catch (e) {
            return false;
        }
    }

    function slideDown(el) {
        return new Promise(function (resolve) {
            el.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease';
            el.style.transform = 'translateY(60px)';
            el.style.opacity = '0';
            setTimeout(resolve, 350);
        });
    }

    function slideInFromTop(el) {
        return new Promise(function (resolve) {
            el.style.transition = 'none';
            el.style.transform = 'translateY(-40px)';
            el.style.opacity = '0';
            // force reflow
            el.offsetHeight;
            el.style.transition = 'transform 0.35s cubic-bezier(0, 0, 0.2, 1), opacity 0.3s ease';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
            setTimeout(resolve, 350);
        });
    }

    function runConvolutionAnim() {
        return new Promise(function (resolve) {
            overlay.classList.add('active');
            var start = performance.now();

            function tick(now) {
                var elapsed = now - start;
                var progress = Math.min(elapsed / DURATION, 1);
                try {
                    drawConvolution(progress);
                } catch (err) {
                    resolve();
                    return;
                }
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    // brief hold at the end
                    setTimeout(resolve, 150);
                }
            }
            requestAnimationFrame(tick);
        });
    }

    function hideOverlay() {
        overlay.classList.remove('active');
        ctx.clearRect(0, 0, ANIM_SIZE, ANIM_SIZE);
    }

    function doTransition(targetUrl) {
        var wrap = getContentWrap();
        var footer = document.getElementById('footer');

        // Step 1: slide current content down
        slideDown(wrap);
        if (footer) {
            footer.style.transition = 'opacity 0.3s ease';
            footer.style.opacity = '0';
        }

        // Step 2: show convolution animation (starts with a slight delay)
        setTimeout(function () {
            runConvolutionAnim().then(function () {
                hideOverlay();

                // Step 3: navigate — new page loads, and we animate it in
                // Store flag so the new page knows to animate in
                try { sessionStorage.setItem('page-transition', '1'); } catch (e) { }
                window.location.href = targetUrl;
            });
        }, 200);
    }

    /* ── On page load: slide in if coming from transition ── */
    window.addEventListener('DOMContentLoaded', function () {
        var fromTransition = false;
        try { fromTransition = sessionStorage.getItem('page-transition') === '1'; } catch (e) { }

        if (fromTransition) {
            try { sessionStorage.removeItem('page-transition'); } catch (e) { }
            var wrap = getContentWrap();
            var footer = document.getElementById('footer');
            if (wrap) {
                wrap.style.transform = 'translateY(-40px)';
                wrap.style.opacity = '0';
                // force reflow
                wrap.offsetHeight;
                slideInFromTop(wrap);
            }
            if (footer) {
                footer.style.opacity = '0';
                setTimeout(function () {
                    footer.style.transition = 'opacity 0.35s ease';
                    footer.style.opacity = '1';
                }, 200);
            }
        }
    });

    /* ── Intercept nav clicks ─────────────────────────────── */
    document.addEventListener('click', function (e) {
        var link = e.target.closest ? e.target.closest('a') : null;
        if (!link) {
            var el = e.target;
            while (el && el.tagName !== 'A') { el = el.parentElement; }
            link = el;
        }
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        var resolved;
        try {
            resolved = new URL(href, window.location.origin).href;
        } catch (err) {
            return;
        }

        if (resolved === window.location.href) return;
        if (!isNavLink(href)) return;

        e.preventDefault();
        doTransition(resolved);
    });

})();
