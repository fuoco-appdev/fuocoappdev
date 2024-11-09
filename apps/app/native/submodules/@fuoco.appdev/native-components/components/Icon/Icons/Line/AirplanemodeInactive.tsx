import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.805 7.365v-4.17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.5l8.5 5v2l-4.49-1.32-7.01-7.01Zm9.28 14.94 1.41-1.41-18.38-18.39-1.42 1.41 6.38 6.38-5.77 3.4v2l8.5-2.5v5.5l-2.5 1.5v1.5l4-1 4 1v-1.5l-2.5-1.5v-2.67l6.28 6.28Z" />
  </Svg>
)

export default Icon
