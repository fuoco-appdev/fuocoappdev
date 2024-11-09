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
      d="M5.35 5.64c-.9-.64-1.12-1.88-.49-2.79.63-.9 1.88-1.12 2.79-.49.9.64 1.12 1.88.49 2.79-.64.9-1.88 1.12-2.79.49ZM16 19H8.93c-1.48 0-2.74-1.08-2.96-2.54L4 7H2l1.99 9.76A5.01 5.01 0 0 0 8.94 21H16v-2Zm-4.65-4h4.88L22 19.5 20.5 21l-3.82-3H9.83c-1.44 0-2.67-1.02-2.95-2.44L5.53 9.64c-.21-1.22.61-2.39 1.84-2.61h.02c.33-.06.67-.03.99.06.27.08.53.2.76.38l1.64 1.27c1.25.98 3.06 1.56 4.69 1.25v2.13c-1.87.32-3.57-.33-5.15-1.22l1.03 4.1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
