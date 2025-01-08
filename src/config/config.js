const bbox = [-180.0, -90.0, 180.0, 90.0];
const minHeight = 0;
const maxHeight = 10;
const blocksPerAxis = 10000;
const scaleFactorX = blocksPerAxis / 360;
const scaleFactorZ = blocksPerAxis / 180;
const scaleFactorY = blocksPerAxis / maxHeight;
const blockSizeMeters = 75;
const blockHalfSize = blockSizeMeters / 2;
const offsetY = 0.0;

const seed = 12345;
const chunkSize = 4;
const renderDistance = 1;