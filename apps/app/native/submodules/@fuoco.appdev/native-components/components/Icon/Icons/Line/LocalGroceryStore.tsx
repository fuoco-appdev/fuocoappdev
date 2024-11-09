import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.996 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Zm-1.45-5c.75 0 1.41-.41 1.75-1.03l3.58-6.49a.996.996 0 0 0-.87-1.48h-14.8l-.94-2h-3.27v2h2l3.6 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h12v-2h-12l1.1-2h7.45Zm-9.39-7h12.15l-2.76 5h-7.02l-2.37-5Z" />
  </Svg>
)

export default Icon
