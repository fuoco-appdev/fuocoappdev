import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.715 13.61.59-2.36.76 3.04h1.48l1.5-6h-1.5l-.74 3-.74-3h-1.52l-.74 3-.74-3h-1.5l.72 2.9 2.43 2.42Z" />
    <Path d="m1.955 3.51 4.78 4.78h-3.17v6h1.5v-2h1.1l.9 2h1.5l-.9-2.1c.5-.3.9-.8.9-1.4v-.67l1.43 1.43-.68 2.74h1.5l.38-1.5h.04l9.11 9.11 1.41-1.41L3.375 2.1l-1.42 1.41Zm5.11 7.28h-2v-1h2v1Z" />
  </Svg>
)

export default Icon
