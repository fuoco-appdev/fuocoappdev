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
      d="M3 6h18c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2Zm5 7h3v-2H8V8H6v3H3v2h3v3h2v-3Zm7.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm2.5-4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S20.33 9 19.5 9s-1.5.67-1.5 1.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
