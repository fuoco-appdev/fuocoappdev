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
      d="M2.02 12c0-5.51 4.47-9.98 9.98-9.98 5.51 0 9.98 4.47 9.98 9.98 0 5.51-4.47 9.98-9.98 9.98-5.51 0-9.98-4.47-9.98-9.98Zm9.46 1.74V20l4.87-9.74H13V4l-5 9.74h3.48Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
