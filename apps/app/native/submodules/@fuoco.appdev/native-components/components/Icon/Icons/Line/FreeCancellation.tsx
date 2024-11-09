import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.62 19.75H4.41v-10h14v4.38l2-2V5.75c0-1.1-.9-2-2-2h-1v-2h-2v2h-8v-2h-2v2h-1c-1.11 0-1.99.9-1.99 2l-.01 14a2 2 0 0 0 2 2h8.21l-2-2Zm-6.21-14h14v2h-14v-2Zm11.54 16.5-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66Zm-6.13-8.5 1.59 1.59L10 16.75l-1.59-1.59-1.59 1.59-1.41-1.41L7 13.75l-1.59-1.59 1.41-1.41 1.59 1.59L10 10.75l1.41 1.41-1.59 1.59Z" />
  </Svg>
)

export default Icon
