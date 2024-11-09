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
      d="M11 4H4v7H2V4c0-1.1.9-2 2-2h7v2ZM6 18l4-5 2.97 3.71L15 14l3 4H6Zm11-9.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5ZM13 2h7c1.1 0 2 .9 2 2v7h-2V4h-7V2Zm7 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7ZM2 13h2v7h7v2H4c-1.1 0-2-.9-2-2v-7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
