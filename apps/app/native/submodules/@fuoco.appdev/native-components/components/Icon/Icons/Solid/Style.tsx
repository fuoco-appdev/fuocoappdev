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
      d="m17.07 3.98 4.96 11.97c.42 1.01-.07 2.18-1.09 2.6l-7.36 3.05a1.998 1.998 0 0 1-2.6-1.08L6.02 8.55a1.999 1.999 0 0 1 1.08-2.6l7.37-3.05c.26-.11.53-.15.79-.15.77.02 1.5.48 1.81 1.23ZM3.87 20.21l-1.34-.56a2.02 2.02 0 0 1-1.09-2.61l2.43-5.86v9.03ZM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm0 13c-1.1 0-2-.9-2-2v-6.34l3.45 8.34H7.88Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
