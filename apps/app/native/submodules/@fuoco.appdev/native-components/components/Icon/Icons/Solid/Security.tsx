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
      d="m3 5 9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5Zm16 6.99h-7v-8.8L5 6.3V12h7v8.93c3.72-1.15 6.47-4.82 7-8.94Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
