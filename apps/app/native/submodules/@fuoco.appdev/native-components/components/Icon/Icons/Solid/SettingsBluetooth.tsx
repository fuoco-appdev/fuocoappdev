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
      d="m12 0 5.71 5.71-4.3 4.29 4.3 4.29L12 20h-1v-7.59L6.41 17 5 15.59 10.59 10 5 4.41 6.41 3 11 7.59V0h1ZM9 24H7v-2h2v2Zm4-2v2h-2v-2h2Zm2 2h2v-2h-2v2ZM13 3.83l1.88 1.88L13 7.59V3.83Zm0 12.34 1.88-1.88L13 12.41v3.76Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
