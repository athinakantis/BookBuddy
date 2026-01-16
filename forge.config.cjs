module.exports = {
  packagerConfig: {
    asar: true,
    icon: "assets/icon",
    files: ["electron/preload.js"],
  },

  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "BookBuddy",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
    },
    {
      name: "@electron-forge/maker-deb",
    },
  ],

  hooks: {
    prePackage: "npm run build",
  },
};
