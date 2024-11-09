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
      d="m1 9 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9Zm8 8 3 3 3-3a4.237 4.237 0 0 0-6 0Zm-2-2-2-2c3.87-3.86 10.14-3.86 14 0l-2 2a7.074 7.074 0 0 0-10 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
