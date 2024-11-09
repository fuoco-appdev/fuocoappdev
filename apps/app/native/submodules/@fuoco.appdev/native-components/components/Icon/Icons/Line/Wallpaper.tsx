import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4Zm6 9-4 5h12l-3-4-2.03 2.71L10 13Zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5ZM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2Zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7ZM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7Z" />
  </Svg>
)

export default Icon
