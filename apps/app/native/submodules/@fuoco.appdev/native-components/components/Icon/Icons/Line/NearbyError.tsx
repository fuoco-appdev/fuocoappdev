import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12.003 7.572 4.42 4.42-4.42 4.42-4.42-4.42 4.42-4.42Zm0 11.62-7.2-7.2 7.2-7.2 6 6v-3.63l-4.58-4.58c-.78-.78-2.05-.78-2.83 0l-8.01 8c-.78.78-.78 2.05 0 2.83l8.01 8c.78.78 2.05.78 2.83 0l4.58-4.59v-3.63l-6 6Zm8 .81h2v2h-2v-2Zm2-10h-2v8h2v-8Z" />
  </Svg>
)

export default Icon
