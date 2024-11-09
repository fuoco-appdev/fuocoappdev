import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.03 5.8h-.06l-1.02 2.89h2.1L12.03 5.8Z" />
    <Path d="M5 16.5H3v5h2v-5Z" />
    <Path d="M12 14.5c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6Zm-.63-10h1.25l2.63 7h-1.21l-.63-1.79h-2.83l-.62 1.79H8.74l2.63-7Z" />
    <Path d="M9 16.5H7v5h2v-5Z" />
    <Path d="M13 16.5h-2v5h2v-5Z" />
    <Path d="M21 16.5h-6v5h6v-5Z" />
  </Svg>
)

export default Icon
