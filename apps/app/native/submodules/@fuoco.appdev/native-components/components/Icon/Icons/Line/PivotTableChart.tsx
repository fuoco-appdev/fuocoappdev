import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.5 4.5c0-1.1-.9-2-2-2h-9v5h11v-3Zm-18 14c0 1.1.9 2 2 2h3v-11h-5v9Zm0-14v3h5v-5h-3c-1.1 0-2 .9-2 2Zm15 3.99-4 4.01 1.41 1.41 1.59-1.6v2.19c0 1.1-.9 2-2 2h-2.17l1.59-1.59-1.42-1.41-4 4 4 4 1.41-1.41-1.58-1.59h2.17c2.21 0 4-1.79 4-4v-2.18l1.59 1.6 1.41-1.42-4-4.01Z" />
  </Svg>
)

export default Icon
