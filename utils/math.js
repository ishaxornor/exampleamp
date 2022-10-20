export function lerp(pct, v0, v1) {
    return v0 * (1 - pct) + v1 * pct;
  }


  export function easeOutQuad(t) {
    return --t * t * t + 1;
  }
  