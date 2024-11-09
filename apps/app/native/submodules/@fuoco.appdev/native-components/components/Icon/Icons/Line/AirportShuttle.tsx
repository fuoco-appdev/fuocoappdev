import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 5H3a2 2 0 0 0-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-6-6Zm-2 2h1l3 3h-4V7ZM9 7h4v3H9V7ZM3 7h4v3H3V7Zm3 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm12 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM21 14h-.78c-.55-.61-1.34-1-2.22-1-.88 0-1.67.39-2.22 1H8.22c-.55-.61-1.33-1-2.22-1-.89 0-1.67.39-2.22 1H3v-2h18v2Z" />
  </Svg>
)

export default Icon
