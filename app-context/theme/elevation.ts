// https://m3.material.io/styles/elevation/tokens
// https://ethercreative.github.io/react-native-shadow-generator/

export const ThemeElevation = {
  level0: { elevation: 0 },
  level1: {
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    shadowColor: '#000',
  },
  level2: {
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    shadowColor: '#000',
  },
  level3: {
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowColor: '#000',
  },
  level4: {
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowColor: '#000',
  },
  level5: {
    elevation: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    shadowColor: '#000',
  },
} as const;
