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
      d="M21 14v2l-2.35-.74L10 6.61V3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V9l8 5Zm-.86 5.59L18.73 21 13 15.27V19l2 1.5V22l-3.5-1L8 22v-1.5l2-1.5v-5.5L2 16v-2l5.99-3.74L3 5.27l1.41-1.41 15.73 15.73Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
