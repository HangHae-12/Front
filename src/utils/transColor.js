// 삭제예정
const rgbToHex = (r, g, b) => {
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
};

export const transColor = {
  lighten: (color, amount) => {
    if (!color) return;
    const r = Math.min(
      255,
      Math.round(parseInt(color.slice(1, 3), 16) * (1 + amount))
    );
    const g = Math.min(
      255,
      Math.round(parseInt(color.slice(3, 5), 16) * (1 + amount))
    );
    const b = Math.min(
      255,
      Math.round(parseInt(color.slice(5, 7), 16) * (1 + amount))
    );

    return rgbToHex(r, g, b);
  },

  darken: (color, amount) => {
    if (!color) return;
    const r = Math.min(
      255,
      Math.round(parseInt(color.slice(1, 3), 16) * (1 - amount))
    );
    const g = Math.min(
      255,
      Math.round(parseInt(color.slice(3, 5), 16) * (1 - amount))
    );
    const b = Math.min(
      255,
      Math.round(parseInt(color.slice(5, 7), 16) * (1 - amount))
    );

    return rgbToHex(r, g, b);
  },
};
