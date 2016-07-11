export const TONES = {
  C: 16.35,
  Cs: 17.32,
  D: 18.35,
  Ds: 19.45,
  E: 20.60,
  F: 21.83,
  Fs: 23.12,
  G: 24.50,
  Gs: 25.96,
  A: 27.50,
  As: 29.14,
  B: 30.87,
  C1: 32.71
};

export const getKeyFreq = function(key, octave) {
  return TONES[key] * Math.pow(2, octave);
};

