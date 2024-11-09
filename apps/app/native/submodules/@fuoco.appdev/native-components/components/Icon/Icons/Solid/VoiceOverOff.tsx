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
      d="M18.44 3.63 20.07 2c3.86 3.99 3.89 9.94.15 13.83l-1.64-1.64c2.62-3.17 2.58-7.59-.14-10.56Zm-3.36 3.42 1.68-1.69c1.98 2.15 2.01 5.11.11 7.13l-1.7-1.7c.74-1.16.71-2.61-.09-3.74ZM9.43 5.04l3.53 3.53a3.979 3.979 0 0 0-3.53-3.53ZM3 4.27l1.41-1.41 16.73 16.73L19.73 21l-3.02-3.02c.18.32.29.65.29 1.02v2H1v-2c0-2.66 5.33-4 8-4 1.78 0 4.74.6 6.51 1.78l-4.4-4.4c-.61.39-1.33.62-2.11.62-2.21 0-4-1.79-4-4 0-.78.23-1.5.62-2.11L3 4.27Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
