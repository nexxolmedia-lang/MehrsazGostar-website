/**
 * Product imagery, imported so Vite can fingerprint the files (web build) or inline them
 * (offline single-file build). Replace these temporary renderings with real photography.
 */
import bulbHalogenH4 from '../assets/products/bulb-halogen-h4.svg';
import bulbLedH7 from '../assets/products/bulb-led-h7.svg';
import fogLampRound from '../assets/products/fog-lamp-round.svg';
import headlampProjector from '../assets/products/headlamp-projector.svg';
import headlampReflector from '../assets/products/headlamp-reflector.svg';
import mirrorIndicator from '../assets/products/mirror-indicator.svg';
import tailLampBar from '../assets/products/tail-lamp-bar.svg';
import tailLampClassic from '../assets/products/tail-lamp-classic.svg';
import thirdBrakeLight from '../assets/products/third-brake-light.svg';

export const productImages = {
  bulbHalogenH4,
  bulbLedH7,
  fogLampRound,
  headlampProjector,
  headlampReflector,
  mirrorIndicator,
  tailLampBar,
  tailLampClassic,
  thirdBrakeLight,
};

export type ProductImageKey = keyof typeof productImages;
