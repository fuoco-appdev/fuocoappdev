import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 18h16c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2ZM4 5h16v11H4V5Z" />
    <Path d="M23 19H1v2h22v-2Z" />
    <Path d="M13.97 7.53a3.495 3.495 0 0 0-4.95 0 3.495 3.495 0 0 0 0 4.95c1.18 1.18 3 1.34 4.36.47l2.09 2.09 1.06-1.06-2.09-2.09c.87-1.36.72-3.18-.47-4.36Zm-1.06 3.88c-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0 .78.79.78 2.05 0 2.83Z" />
  </Svg>
)

export default Icon
