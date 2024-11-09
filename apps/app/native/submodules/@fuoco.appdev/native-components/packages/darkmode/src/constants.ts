export const PARAM_KEY = 'modes';
export const ADDON_ID = 'storybook-addon-ondevice-darkmode';
export const PANEL_ID = `${ADDON_ID}/darkmode-panel`;

export default {
  SET: `${ADDON_ID}:set`,
  UNSET: `${ADDON_ID}:unset`,
  UPDATE_MODE: `${ADDON_ID}:update`,
};
