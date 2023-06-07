export default [
    {
      id: "document",
      name: "CZML Point",
      version: "1.0",
    },
    {
      id: "point 1",
      name: "point",
      position: {
        cartographicDegrees: [127.5, 37.512, 0],
      },
      point: {
        color: {
          rgba: [255, 255, 255, 255],
        },
        outlineColor: {
          rgba: [255, 0, 0, 255],
        },
        outlineWidth: 4,
        pixelSize: 5,
      },
      description: "<p>Point 1 Tooltip</p>"
    },
    {
      id: "point 2",
      name: "point",
      position: {
        cartographicDegrees: [126.5, 37.512, 0],
      },
      point: {
        color: {
          rgba: [255, 255, 255, 255],
        },
        outlineColor: {
          rgba: [255, 0, 0, 255],
        },
        outlineWidth: 4,
        pixelSize: 5,
      },
      description: "<p>Point 2 Tooltip</p>"
    },
  ]