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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm3 2H5v3c1.66 0 3-1.34 3-3Zm-3 6.99v-2c2.76 0 4.99-2.25 4.99-5h2c.01 3.87-3.12 7-6.99 7Zm3.5 1.51L5 18h14l-4.5-6-3.5 4.51-2.5-3.01Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
