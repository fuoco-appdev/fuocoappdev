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
      d="m4.8 12 4.6 4.6L8 18l-6-6 6-6 1.4 1.4L4.8 12Zm14.4 0-4.6 4.6L16 18l6-6-6-6-1.4 1.4 4.6 4.6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
