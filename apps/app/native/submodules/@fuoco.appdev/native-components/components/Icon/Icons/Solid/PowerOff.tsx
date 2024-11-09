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
      d="M10 3H8v1.88l2 2V3Zm8 11.49V9c0-1.1-.9-2-2-2V3h-2v4h-3.88l7.69 7.69.19-.2ZM2.71 5.25l1.41-1.41 16.74 16.74-1.41 1.41-4.47-4.47-.48.48v3h-5v-3L6 14.5V8.99c0-.13.02-.27.05-.4L2.71 5.25Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
