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
      d="M4 3v9c0 1.66 1.34 3 3 3h6v2H7c-2.76 0-5-2.24-5-5V3h2Zm16.8 13.61c.74-.34 1.65-.09 2.03.63.4.76.07 1.7-.7 2.06L18.41 21 15 14H8c-1.66 0-3-1.34-3-3V3h6v6h3.51c.76 0 1.45.45 1.79 1.13l3.41 6.98 1.09-.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
