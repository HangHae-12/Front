export const transColor = {
  lighten: (color, amount) => {
    if (!color) return;
    const r = Math.round(parseInt(color.slice(1, 3), 16) * (1 + amount));
    const g = Math.round(parseInt(color.slice(3, 5), 16) * (1 + amount));
    const b = Math.round(parseInt(color.slice(5, 7), 16) * (1 + amount));
    console.log(r, g, b);
    console.log(`#${r.toString(16)}${g.toString(16)}${b.toString(16)}`);

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  },

  darken: (color, amount) => {
    if (!color) return;
    const r = Math.round(parseInt(color.slice(1, 3), 16) * (1 - amount));
    const g = Math.round(parseInt(color.slice(3, 5), 16) * (1 - amount));
    const b = Math.round(parseInt(color.slice(5, 7), 16) * (1 - amount));

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  },
};
