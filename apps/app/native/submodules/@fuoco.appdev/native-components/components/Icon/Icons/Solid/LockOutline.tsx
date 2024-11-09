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
      d="M17 8h1c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2Zm-5-5c-1.66 0-3 1.34-3 3v2h6V6c0-1.66-1.34-3-3-3ZM6 20V10h12v10H6Zm8-5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
