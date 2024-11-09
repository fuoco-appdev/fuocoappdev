import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M5 1h14c1.1 0 2 .9 2 2l-.01 12.93c0 .69-.35 1.3-.88 1.66L12 23l-8.12-5.41c-.53-.36-.88-.97-.88-1.66L3.01 3c0-1.1.89-2 1.99-2Zm0 10 5 5 9-9-1.41-1.42L10 13.17 6.41 9.58 5 11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
