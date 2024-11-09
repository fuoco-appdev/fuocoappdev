import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.92 9.5h2v-3h3v-2h-3v-3h-2v3h-3v2h3v3Zm-4 9c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01-1.74-.96-3.87 7H9.45l-4.26-9H1.92v2h2l3.6 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h12v-2h-12l1.1-2Z" />
  </Svg>
)

export default Icon
