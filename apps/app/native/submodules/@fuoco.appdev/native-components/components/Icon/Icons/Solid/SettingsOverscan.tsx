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
      d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM10 8l2.01-2.5L14 8h-4Zm8 6v-4l2.5 2.01L18 14ZM6 10l-2.5 2.01L6 14v-4Zm4 6h4l-1.99 2.5L10 16Zm-7 3.01h18V4.99H3v14.02Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
