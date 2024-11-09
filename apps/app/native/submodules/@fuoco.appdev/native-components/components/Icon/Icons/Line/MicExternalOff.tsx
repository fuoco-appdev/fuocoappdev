import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.705 4.34c0-1.66-1.34-3-3-3-.62 0-1.19.19-1.67.5l4.15 4.15c.32-.47.52-1.04.52-1.65Z" />
    <Path d="M14.705 5.34c0-1.1.9-2 2-2s2 .9 2 2v9.17l2 2V5.34c0-2.21-1.79-4-4-4s-4 1.79-4 4v3.17l2 2V5.34Z" />
    <Path d="m2.805 1.44-1.41 1.41 4.48 4.49h-1.17l1 10h1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1.17l6.49 6.49 1.41-1.41-19.8-19.81Zm5.09 13.9h-.38l-.6-6h.96l.56.56-.54 5.44Zm4.81 2c0 1.1-.9 2-2 2s-2-.9-2-2h1l.56-5.61 2.44 2.44v3.17Z" />
  </Svg>
)

export default Icon
