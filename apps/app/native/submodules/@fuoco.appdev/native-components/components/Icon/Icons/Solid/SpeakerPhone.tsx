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
      d="M4.25 4.21C6.24 2.23 8.98 1 12 1c3.02 0 5.76 1.23 7.75 3.21l-1.41 1.41A8.95 8.95 0 0 0 12 3C9.53 3 7.28 4 5.66 5.62L4.25 4.21ZM8.43 8.5 7 7.07A7.052 7.052 0 0 1 12 5c1.95 0 3.72.79 5 2.07L15.57 8.5A5.05 5.05 0 0 0 12 7.02c-1.39 0-2.66.57-3.57 1.48Zm.71 1.5C8.51 10 8 10.51 8 11.14v9.71c0 .63.51 1.14 1.14 1.14h5.71c.63 0 1.14-.51 1.14-1.14v-9.71c.01-.63-.5-1.13-1.13-1.13L9.14 10ZM9 12v8h6v-8H9Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
