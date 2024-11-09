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
      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-3.53 7-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94L15.47 10ZM5 19h14V8H5v11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
