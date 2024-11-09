import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m20.775 15.87 1.14-1-1-1.73-1.45.49c-.32-.27-.68-.48-1.08-.63l-.3-1.5h-2l-.3 1.49c-.4.15-.76.36-1.08.63l-1.45-.49-1 1.73 1.14 1c-.08.5-.08.76 0 1.26l-1.14 1 1 1.73 1.45-.49c.32.27.68.48 1.08.63l.3 1.51h2l.3-1.49c.4-.15.76-.36 1.08-.63l1.45.49 1-1.73-1.14-1c.08-.51.08-.77 0-1.27Zm-3.69 2.63c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm1-15v6h-2v-4h-2v6h-2v-7h-6v14h5v2h-9v-2h2v-16h10v1h4Zm-7 9h-2v-2h2v2Z" />
  </Svg>
)

export default Icon
