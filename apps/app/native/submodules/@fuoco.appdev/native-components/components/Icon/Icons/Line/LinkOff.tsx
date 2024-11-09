import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m14.39 11.065 1.61 1.61v-1.61h-1.61Zm2.61-4h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.27-.77 2.37-1.87 2.84l1.4 1.4a4.986 4.986 0 0 0 2.37-4.24c0-2.76-2.24-5-5-5ZM2 4.335l3.11 3.11A4.991 4.991 0 0 0 2 12.065c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07l2.07 2.07H8v2h2.73l2.27 2.27v1.73h1.73l4.01 4.01 1.41-1.41L3.41 2.925 2 4.335Z" />
  </Svg>
)

export default Icon
