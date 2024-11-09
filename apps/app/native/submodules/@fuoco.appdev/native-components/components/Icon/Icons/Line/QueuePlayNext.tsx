import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.5 2.25h-18c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h2v-2h-15v-12h18v8h2v-8a2 2 0 0 0-2-2Zm-8 7v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3Zm11 8-4.5 4.5-1.5-1.5 3-3-3-3 1.5-1.5 4.5 4.5Z" />
  </Svg>
)

export default Icon
