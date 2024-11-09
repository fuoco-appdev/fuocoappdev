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
      d="M4 3c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Zm6 18c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2ZM6 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-2 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2ZM18 5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm-8 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Zm8-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-2-4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-2-4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
