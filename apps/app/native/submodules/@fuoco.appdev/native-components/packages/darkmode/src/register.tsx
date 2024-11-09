import { addons, types } from '@storybook/manager-api';
import DarkmodePanel from './darkmode-panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel();
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Darkmode',
    render: ({ active }) => (
      <DarkmodePanel channel={channel} api={api} active={active ?? false} />
    ),
    paramKey: PARAM_KEY,
  });
});
