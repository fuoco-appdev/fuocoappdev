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
      d="m9 2 8 3.92-6 3.06v9.05c2.84.16 5 .98 5 1.97 0 1.1-2.69 2-6 2s-6-.9-6-2c0-.74 1.21-1.38 3-1.73V20h2V2Zm12 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
