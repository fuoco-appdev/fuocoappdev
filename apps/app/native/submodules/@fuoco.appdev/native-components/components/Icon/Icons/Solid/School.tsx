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
      d="m1 9 11-6 11 6v8h-2v-6.91L12 15 1 9Zm4 8.18v-4L12 17l7-3.82v4L12 21l-7-3.82Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
