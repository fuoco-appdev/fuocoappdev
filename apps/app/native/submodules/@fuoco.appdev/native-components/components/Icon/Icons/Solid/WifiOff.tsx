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
      d="m2 3.05 1.41-1.41 16.97 16.97-1.41 1.41-7.08-7.08c-1.78.02-3.54.71-4.89 2.06l-2-2a9.823 9.823 0 0 1 4.41-2.54L7.17 8.22C5.65 8.84 4.23 9.77 3 11L1 9c1.22-1.21 2.59-2.17 4.05-2.9L2 3.05ZM23 9l-2 2a12.747 12.747 0 0 0-9.12-3.73L9.3 4.69c4.83-.84 9.97.58 13.7 4.31Zm-7.72 1.67c1.36.48 2.64 1.25 3.72 2.33l-.7.69-3.02-3.02ZM9 17l3 3 3-3a4.237 4.237 0 0 0-6 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
