import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 12h-4v1.5h4V12Z" />
    <Path d="M18 15h-4v1.5h4V15Z" />
    <Path d="M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2Zm-9-3h2v5h-2V4Zm9 16H4V9h5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2h5v11Z" />
    <Path d="M9 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M11.08 16.18c-.64-.28-1.34-.43-2.08-.43s-1.44.15-2.08.43c-.56.24-.92.78-.92 1.39V18h6v-.43c0-.61-.36-1.15-.92-1.39Z" />
  </Svg>
)

export default Icon
