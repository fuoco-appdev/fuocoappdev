import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m21.79 17.86 2 2H24v-2h-2.21ZM1.11 2.84 2.66 4.4c-.41.37-.66.89-.66 1.48v9.98c0 1.1.9 2 2.01 2H0v2h18.13l2.71 2.71 1.41-1.41L2.52 1.43 1.11 2.84ZM4 5.88h.13l4.95 4.93C7.94 11.93 7.31 13.38 7 14.86c.96-1.29 2.13-2.08 3.67-2.46l3.46 3.48H4v-10Zm16 0v10.19l1.3 1.3c.42-.37.7-.89.7-1.49v-10a2 2 0 0 0-2-2H7.8l2 2H20Zm-7.07 3.13 2.79 2.78 1.28-1.2-4-3.73v2.13l-.07.02Z" />
  </Svg>
)

export default Icon
