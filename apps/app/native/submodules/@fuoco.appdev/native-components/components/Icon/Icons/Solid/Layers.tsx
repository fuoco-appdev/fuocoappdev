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
      d="M19.36 10.27 12 16l-7.37-5.73L3 9l9-7 9 7-1.64 1.27ZM4.62 12.81l7.37 5.73 7.38-5.74L21 14.07l-9 7-9-7 1.62-1.26Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
