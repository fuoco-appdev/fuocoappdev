import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.462 8.167h3.904l1.246-1.61c-.443-.345-4.91-4.14-11.612-4.14S.83 6.212.388 6.557L12 21.583l6.462-8.356v-5.06Z" />
    <Path d="M20.308 10.083h1.846v7.667h-1.846v-7.667Z" />
    <Path d="M20.308 19.667h1.846v1.916h-1.846v-1.916Z" />
  </Svg>
)

export default Icon
