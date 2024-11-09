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
      d="M14 5.29V3.23c4.01.91 7 4.49 7 8.77 0 4.28-2.99 7.86-7 8.77v-2.06c2.89-.86 5-3.54 5-6.71s-2.11-5.85-5-6.71ZM3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
