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
      d="M22 10c-1.1 0-2 .9-2 2s.9 2 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4a2 2 0 0 0 2-2c0-1.1-.89-2-1.99-2V6c0-1.1.89-2 1.99-2h16c1.1 0 2 .9 2 2v4Zm-10 4.5 3.58 2.3-1.09-4.11L17.78 10l-4.24-.25L12 5.8l-1.55 3.94-4.24.25 3.29 2.69-1.08 4.12L12 14.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
