"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Depth buckets: the further a dot is from home, the smaller and fainter it draws ("dust")
const BUCKET_ALPHA = [1, 0.96, 0.8, 0.58];
const BUCKET_SIZE = [1, 0.96, 0.82, 0.64];

function bucketOf(dx, dy) {
  const d2 = dx * dx + dy * dy;
  if (d2 < 1.44) return 0;
  if (d2 < 100) return 1;
  if (d2 < 1600) return 2;
  return 3;
}

// Line box height of the tagline as a multiple of its font size
export const TAGLINE_LINE = 1.3;

/**
 * Aspect ratio (width / height) of a logo + tagline lockup box.
 * Give the parent of <ParticleLogo> exactly this aspect ratio.
 */
export function getLockupRatio(logoRatio, tagline) {
  if (!tagline) return logoRatio;
  return 1 / (1 / logoRatio + tagline.gap + tagline.size * TAGLINE_LINE);
}

/**
 * Interactive particle logo (optionally with a particle tagline underneath).
 * Fill a parent that has a width + aspect ratio. The canvas bleeds OUTSIDE the parent
 * so scattered dots are never clipped (the parent and its ancestors must not use overflow-hidden).
 *
 * tagline = { text, size, gap, weight, color, minPx, family }
 *   size   font size as a fraction of the logo width (e.g. 0.042)
 *   gap    space between logo and tagline as a fraction of the logo width
 * logoRatio = width / height of the logo image itself (needed when a tagline is used)
 * Keep `tagline` a stable object (define it once at module level).
 */
export default function ParticleLogo({
  src,
  alt = "Logo",
  className = "",
  cells = 250, // target dots across the logo width on large screens
  minStep = 1.4, // smallest grid step in CSS px (lower = finer dots on phones, heavier)
  dotScale = 0.48, // dot radius as a fraction of grid step (0.5 = dots touch)
  radiusFactor = 0.13, // cursor push radius as a fraction of logo width
  push = 5.2, // how hard the cursor scatters dots
  intro = true, // dots assemble on first load
  shimmer = true, // periodic light glint across the logo
  keepWhite = false, // true = white pixels are part of the logo (dark-theme logos)
  glint = "225,235,255", // glint colour as "r,g,b" (use "255,255,255" on dark)
  glintAlpha = 0.4, // glint peak strength
  tagline = null,
  logoRatio = 4,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // geometry
    let w = 0, h = 0, cw = 0, ch = 0;
    let padL = 0, padR = 0, padT = 0, padB = 0;
    let lastW = 0, lastH = 0, dpr = 1;
    let n = 0, dotR = 1, radius = 80;
    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    // particle data
    let ox, oy, x, y, vx, vy, k, delay, bucket, rs;
    let groups = [];

    // state
    let raf = 0, running = false, last = 0, destroyed = false, imgReady = false;
    let resizeTimer = 0;
    let introActive = false, introStart = 0, introAlpha = 1;
    let shimmerT = -1, shimmerStart = 0, shimmerTimer = 0, visible = true;
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      touch: false,
      speed: 0,
      lastMove: 0,
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      // the tagline is drawn with a canvas font, so wait until the site font is ready
      const jobs = [];
      if (document.fonts) {
        jobs.push(document.fonts.ready.catch(() => {}));
        if (tagline) {
          const fam = tagline.family || getComputedStyle(wrap).fontFamily;
          jobs.push(
            document.fonts
              .load(`${tagline.weight || 600} 24px ${fam}`)
              .catch(() => { })
          );
        }
      }
      Promise.all(jobs).then(() => {
        if (destroyed) return;
        imgReady = true;
        build(true);
      });
    };
    img.onerror = () => setFailed(true);
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      img.onload();
    }

    function build(animateIntro) {
      if (!imgReady || destroyed) return;
      const rect = wrap.getBoundingClientRect();
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      if (!w || !h) return;
      lastW = w;
      lastH = h;

      // Symmetrical bleed area around the logo, bounded by viewport to eliminate horizontal scroll
      const vw = document.documentElement.clientWidth || window.innerWidth || 1000;
      const wantX = Math.round(Math.min(48, Math.max(8, w * 0.08)));
      const maxLeft = Math.max(0, Math.floor(rect.left));
      const maxRight = Math.max(0, Math.floor(vw - rect.right));
      const safePadX = Math.min(wantX, maxLeft, maxRight);
      padL = safePadX;
      padR = safePadX;
      padT = Math.round(Math.max(36, Math.min(50, w * 0.1)));
      padB = Math.round(Math.max(24, Math.min(40, w * 0.08)));
      cw = w + padL + padR;
      ch = h + padT + padB;

      // small canvases can afford full phone pixel density: much crisper dots
      dpr = Math.min(window.devicePixelRatio || 1, cw < 700 ? 3 : 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      canvas.style.left = -padL + "px";
      canvas.style.top = -padT + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Compose logo (+ tagline) into a 2x supersampled buffer.
      const S = 2;
      const fw = Math.round(w * S);
      const fh = Math.round(h * S);
      const off = document.createElement("canvas");
      off.width = fw;
      off.height = fh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      // With a tagline, the logo gets only the top part of the box
      const logoH = tagline ? Math.min(h, w / logoRatio) : h;
      const gapPx = tagline ? tagline.gap * w : 0;

      const fit = Math.min(fw / nw, (logoH * S) / nh);
      const dw = nw * fit;
      const dh = nh * fit;
      const dy = (logoH * S - dh) / 2;

      // A big image shrunk in ONE step aliases thin strokes, so we
      // halve it progressively with high-quality smoothing instead.
      let source = img,
        sw = nw,
        sh = nh;
      while (sw / 2 >= dw && sh / 2 >= dh) {
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(sw / 2));
        c.height = Math.max(1, Math.round(sh / 2));
        const cx = c.getContext("2d");
        cx.imageSmoothingEnabled = true;
        cx.imageSmoothingQuality = "high";
        cx.drawImage(source, 0, 0, c.width, c.height);
        source = c;
        sw = c.width;
        sh = c.height;
      }
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(source, (fw - dw) / 2, dy, dw, dh);

      if (tagline) {
        const family =
          tagline.family || getComputedStyle(wrap).fontFamily || "system-ui, sans-serif";
        const weight = tagline.weight || 600;
        let fs = Math.max(tagline.minPx || 0, tagline.size * w) * S;
        const setFont = (px) => {
          octx.font = `${weight} ${px}px ${family}`;
          if ("letterSpacing" in octx) octx.letterSpacing = `${px * 0.02}px`;
        };
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        octx.fillStyle = tagline.color || "#ffffff";
        setFont(fs);
        const maxW = fw * 0.94; // never wider than the logo
        const mw = octx.measureText(tagline.text).width;
        if (mw > maxW) {
          fs *= maxW / mw;
          setFont(fs);
        }
        // centred in the space left under the logo
        const yCenter = logoH + gapPx + (h - logoH - gapPx) / 2;
        octx.fillText(tagline.text, fw / 2, yCenter * S);
      }

      const data = octx.getImageData(0, 0, fw, fh).data;

      // 2. Hex grid, 3x3 coverage sampling per cell.
      // Edge cells get smaller dots in proportion to coverage -> smooth contours.
      const step = Math.max(minStep, w / cells);
      dotR = step * (step < 2 ? dotScale + 0.05 : dotScale); // denser on phones
      radius = w * radiusFactor;
      minX = dotR + 1;
      maxX = cw - dotR - 1;
      minY = dotR + 1;
      maxY = ch - dotR - 1;

      const px = [], py = [], pr = [], pg = [], pb = [], ps = [];

      function sampleRegion(y0, y1, st, sizeScale) {
        const rowH = st * 0.866;
        const o = st / 3;
        const rows = Math.floor((y1 - y0) / rowH);
        for (let j = 0; j < rows; j++) {
          const sy = y0 + j * rowH + rowH / 2;
          const shift = j & 1 ? st / 2 : 0;
          const cols = Math.floor((w - shift) / st);
          for (let i = 0; i < cols; i++) {
            const sx = i * st + st / 2 + shift;
            let cov = 0, r = 0, g = 0, b = 0;
            for (let sj = -1; sj <= 1; sj++) {
              for (let si = -1; si <= 1; si++) {
                const xi = Math.round((sx + si * o) * S);
                const yi = Math.round((sy + sj * o) * S);
                if (xi < 0 || yi < 0 || xi >= fw || yi >= fh) continue;
                const idx = (yi * fw + xi) * 4;
                const a = data[idx + 3] / 255;
                if (a < 0.05) continue; // transparent
                const rr = data[idx], gg = data[idx + 1], bb = data[idx + 2];
                // baked-in white background (skipped unless white is part of the logo)
                if (!keepWhite && rr > 238 && gg > 238 && bb > 238) continue;
                cov += a;
                r += rr * a;
                g += gg * a;
                b += bb * a;
              }
            }
            if (cov < 2.4) continue; // under ~27% covered: skip
            const c9 = Math.min(1, cov / 9);
            px.push(sx + padL);
            py.push(sy + padT);
            pr.push(r / cov);
            pg.push(g / cov);
            pb.push(b / cov);
            ps.push(sizeScale * (0.6 + 0.4 * clamp((c9 - 0.27) / 0.55, 0, 1)));
          }
        }
      }

      if (tagline) {
        // logo: normal dots. tagline: a finer grid with proportionally smaller dots,
        // because thin small text can't survive the logo's coarse grid.
        const split = logoH + gapPx * 0.5;
        sampleRegion(0, split, step, 1);
        const tStep = Math.max(1.0, step * 0.5);
        sampleRegion(split, h, tStep, tStep / step);
      } else {
        sampleRegion(0, h, step, 1);
      }

      n = px.length;
      ox = Float32Array.from(px);
      oy = Float32Array.from(py);
      rs = Float32Array.from(ps);
      x = new Float32Array(n);
      y = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      k = new Float32Array(n);
      delay = new Float32Array(n);
      bucket = new Uint8Array(n);

      const doIntro = intro && animateIntro && !reduceMotion;
      for (let i = 0; i < n; i++) {
        k[i] = 0.032 + Math.random() * 0.05; // each dot returns at its own speed
        if (doIntro) {
          const a = Math.random() * 6.2832;
          const dist = (0.1 + Math.random() * 0.35) * w;
          x[i] = clamp(ox[i] + Math.cos(a) * dist, minX, maxX);
          y[i] = clamp(oy[i] + Math.sin(a) * dist * 0.7, minY, maxY);
          delay[i] = ((ox[i] - padL) / w) * 520 + Math.random() * 180; // left-to-right wave
        } else {
          x[i] = ox[i];
          y[i] = oy[i];
        }
        bucket[i] = bucketOf(ox[i] - x[i], oy[i] - y[i]);
      }

      // 3. Group dots by quantised colour: one batched draw per colour
      const map = new Map();
      const gid = new Uint16Array(n);
      const sums = [];
      for (let i = 0; i < n; i++) {
        const key =
          ((pr[i] >> 5) << 6) | ((pg[i] >> 5) << 3) | (pb[i] >> 5);
        let gi = map.get(key);
        if (gi === undefined) {
          gi = sums.length;
          map.set(key, gi);
          sums.push({ r: 0, g: 0, b: 0, c: 0 });
        }
        gid[i] = gi;
        const s = sums[gi];
        s.r += pr[i];
        s.g += pg[i];
        s.b += pb[i];
        s.c++;
      }
      groups = sums.map((s) => ({
        color: `rgb(${Math.round(s.r / s.c)},${Math.round(s.g / s.c)},${Math.round(
          s.b / s.c
        )})`,
        members: new Int32Array(s.c),
        fill: 0,
      }));
      for (let i = 0; i < n; i++) {
        const g = groups[gid[i]];
        g.members[g.fill++] = i;
      }

      introActive = doIntro;
      introStart = performance.now();
      introAlpha = doIntro ? 0 : 1;
      shimmerT = -1;
      draw();
      if (doIntro) kick();
      if (shimmer && !reduceMotion) scheduleShimmer(doIntro ? 2800 : 1200);
    }

    function draw() {
      ctx.clearRect(0, 0, cw, ch);

      for (let b = 0; b < 4; b++) {
        ctx.globalAlpha = BUCKET_ALPHA[b] * introAlpha;
        const bs = dotR * BUCKET_SIZE[b];
        for (let gi = 0; gi < groups.length; gi++) {
          const g = groups[gi];
          const m = g.members;
          let started = false;
          for (let qi = 0; qi < m.length; qi++) {
            const i = m[qi];
            if (bucket[i] !== b) continue;
            if (!started) {
              ctx.fillStyle = g.color;
              ctx.beginPath();
              started = true;
            }
            const r = bs * rs[i];
            ctx.moveTo(x[i] + r, y[i]);
            ctx.arc(x[i], y[i], r, 0, 6.2832);
          }
          if (started) ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Light glint: painted with source-atop so it only touches the dots
      if (shimmerT >= 0) {
        const p = easeInOut(shimmerT);
        const bw = w * 0.26;
        const cx = padL + (-bw + (w + 2 * bw) * p);
        const gr = ctx.createLinearGradient(cx - bw, padT, cx + bw, padT + h * 0.4);
        gr.addColorStop(0, `rgba(${glint},0)`);
        gr.addColorStop(0.5, `rgba(${glint},${glintAlpha})`);
        gr.addColorStop(1, `rgba(${glint},0)`);
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = "source-over";
      }
    }

    function tick(now) {
      raf = 0;
      const dt = Math.min(2, (now - last) / 16.667 || 1); // frame-rate independent
      last = now;

      const sinceIntro = now - introStart;
      if (introActive && sinceIntro > 900) introActive = false;
      introAlpha = introActive ? clamp(sinceIntro / 700, 0, 1) : 1;

      if (shimmerT >= 0) {
        shimmerT = (now - shimmerStart) / 1500;
        if (shimmerT >= 1) shimmerT = -1;
      }

      let boost = 1;
      if (mouse.active) {
        boost = 1 + Math.min(mouse.speed * 0.05, 1.5); // faster cursor = bigger scatter
        mouse.speed *= 0.9;
      }

      const R = radius * (mouse.touch ? 1.45 : 1); // a finger covers more than a cursor
      const R2 = R * R;
      const damp = Math.pow(0.85, dt);
      let vEnergy = 0, dEnergy = 0;

      for (let i = 0; i < n; i++) {
        if (introActive && sinceIntro < delay[i]) {
          vEnergy += 1;
          bucket[i] = 3;
          continue;
        }

        let vxi = vx[i], vyi = vy[i];
        let xi = x[i], yi = y[i];

        if (mouse.active) {
          const dx = xi - mouse.x;
          const dy = yi - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 0.001;
            const t = 1 - d / R;
            const f = t * t * push * boost * dt;
            // push away + a little swirl so the scatter feels organic
            vxi += (dx / d) * f - (dy / d) * f * 0.25;
            vyi += (dy / d) * f + (dx / d) * f * 0.25;
          }
        }

        vxi += (ox[i] - xi) * k[i] * dt;
        vyi += (oy[i] - yi) * k[i] * dt;
        vxi *= damp;
        vyi *= damp;
        xi += vxi * dt;
        yi += vyi * dt;

        // soft walls: dots never leave the canvas, so they are never cut
        if (xi < minX) { xi = minX; vxi *= -0.4; }
        else if (xi > maxX) { xi = maxX; vxi *= -0.4; }
        if (yi < minY) { yi = minY; vyi *= -0.4; }
        else if (yi > maxY) { yi = maxY; vyi *= -0.4; }

        x[i] = xi;
        y[i] = yi;
        vx[i] = vxi;
        vy[i] = vyi;

        const ddx = ox[i] - xi;
        const ddy = oy[i] - yi;
        bucket[i] = bucketOf(ddx, ddy);
        vEnergy += Math.abs(vxi) + Math.abs(vyi);
        dEnergy += Math.abs(ddx) + Math.abs(ddy);
      }

      draw();

      const mouseHot = mouse.active && now - mouse.lastMove < 300;
      const keepGoing =
        introActive ||
        shimmerT >= 0 ||
        mouseHot ||
        vEnergy / n > 0.02 ||
        (!mouse.active && dEnergy / n > 0.02);

      if (keepGoing) {
        raf = requestAnimationFrame(tick);
      } else {
        if (!mouse.active) {
          // settled: snap to the exact logo and sleep (zero CPU at rest)
          for (let i = 0; i < n; i++) {
            x[i] = ox[i];
            y[i] = oy[i];
            vx[i] = vy[i] = 0;
            bucket[i] = 0;
          }
          draw();
        }
        running = false;
      }
    }

    function kick() {
      if (running || destroyed) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function scheduleShimmer(delayMs) {
      clearTimeout(shimmerTimer);
      shimmerTimer = setTimeout(() => {
        if (destroyed) return;
        if (!document.hidden && visible && !mouse.active && !introActive) {
          shimmerStart = performance.now();
          shimmerT = 0;
          kick();
        }
        scheduleShimmer(6500 + Math.random() * 3500);
      }, delayMs);
    }

    // The canvas has pointer-events:none (it overlaps other UI), so track input globally.
    function pointAt(clientX, clientY, isTouch) {
      const r = canvas.getBoundingClientRect();
      const mx = clientX - r.left;
      const my = clientY - r.top;
      if (mx >= 0 && my >= 0 && mx <= cw && my <= ch) {
        if (mouse.active) {
          mouse.speed = Math.max(
            mouse.speed * 0.6,
            Math.hypot(mx - mouse.x, my - mouse.y)
          );
        }
        mouse.x = mx;
        mouse.y = my;
        mouse.active = true;
        mouse.touch = isTouch;
        mouse.lastMove = performance.now();
        kick();
      } else if (mouse.active) {
        clearMouse();
      }
    }
    function clearMouse() {
      mouse.active = false;
      mouse.speed = 0;
      kick();
    }

    // Mouse / pen: pointer events. Touch is ignored here on purpose: when a finger
    // drags, the browser takes the gesture for scrolling and fires pointercancel.
    function onPointer(e) {
      if (e.pointerType === "touch") return;
      pointAt(e.clientX, e.clientY, false);
    }
    // Touch: touch events keep firing while the page scrolls, and passive
    // listeners never block scrolling.
    function onTouch(e) {
      const t = e.touches[0];
      if (!t) {
        clearMouse();
        return;
      }
      pointAt(t.clientX, t.clientY, true);
    }

    const root = document.documentElement;
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
      root.addEventListener("mouseleave", clearMouse);
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouch, { passive: true });
      window.addEventListener("touchcancel", clearMouse, { passive: true });
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    // Rebuild only when the size really changes
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const r = wrap.getBoundingClientRect();
        if (
          imgReady &&
          (Math.round(r.width) !== lastW || Math.round(r.height) !== lastH)
        ) {
          build(lastW === 0);
        }
      }, 120);
    });
    ro.observe(wrap);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(shimmerTimer);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      root.removeEventListener("mouseleave", clearMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouch);
      window.removeEventListener("touchcancel", clearMouse);
    };
  }, [
    src,
    cells,
    minStep,
    dotScale,
    radiusFactor,
    push,
    intro,
    shimmer,
    keepWhite,
    glint,
    glintAlpha,
    tagline,
    logoRatio,
  ]);

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      {failed ? (
        <img src={src} alt={alt} className="h-full w-full object-contain" />
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          className="pointer-events-none absolute max-w-none"
          style={{ maxWidth: "none" }}
        />
      )}
    </div>
  );
}