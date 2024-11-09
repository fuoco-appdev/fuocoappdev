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
      d="m0 2.54 1.41-1.41 21.46 21.46L21.46 24l-2.84-2.84c-.36.51-.95.84-1.62.84a1.997 1.997 0 0 1-1.16-3.62L14.46 17H7c-1.1 0-2-.9-2-2 0-.35.09-.68.25-.96l1.35-2.45-2.21-4.66L0 2.54ZM8.1 13 7 15h5.46l-2-2H8.1Zm7.95-.06c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4H7.12l8.93 8.94ZM5.01 20c0-1.1.89-2 1.99-2s2 .9 2 2-.9 2-2 2-1.99-.9-1.99-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
