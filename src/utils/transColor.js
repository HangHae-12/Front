export const transColor = {
  lighten: (color, amount) => {
    const r = Math.round(parseInt(color.slice(1, 3), 16) * (1 + amount));
    const g = Math.round(parseInt(color.slice(3, 5), 16) * (1 + amount));
    const b = Math.round(parseInt(color.slice(5, 7), 16) * (1 + amount));

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  },

  darken: (color, amount) => {
    const r = Math.round(parseInt(color.slice(1, 3), 16) * (1 - amount));
    const g = Math.round(parseInt(color.slice(3, 5), 16) * (1 - amount));
    const b = Math.round(parseInt(color.slice(5, 7), 16) * (1 - amount));

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  },
};
