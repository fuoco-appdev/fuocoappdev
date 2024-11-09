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
      d="M19.866 11.033A2.62 2.62 0 0 0 19.5 11a4.51 4.51 0 0 0-4.43 3.7c-.65.56-1.07 1.38-1.07 2.3v3H1L20 1v10.05a7.013 7.013 0 0 1-.134-.017ZM22 16v-.5a2.501 2.501 0 0 0-5 0v.5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1Zm-1 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
