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
      d="M11 2.05v2.02c-1.46.18-2.79.76-3.9 1.62L5.68 4.26A9.949 9.949 0 0 1 11 2.05Zm2.05 7.74L10 7.5v9l3.05-2.29L16 12l-2.95-2.21ZM5.69 7.1 4.26 5.68A9.949 9.949 0 0 0 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9ZM2.05 13h2.02c.18 1.46.76 2.79 1.62 3.89l-1.43 1.43A9.949 9.949 0 0 1 2.05 13Zm3.63 6.74A9.981 9.981 0 0 0 11 21.95v-2.02a7.94 7.94 0 0 1-3.9-1.62l-1.42 1.43Zm7.37 2.21C18.08 21.42 22 17.16 22 12c0-5.16-3.92-9.42-8.95-9.95v2.02C16.97 4.59 20 7.95 20 12s-3.03 7.41-6.95 7.93v2.02Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
