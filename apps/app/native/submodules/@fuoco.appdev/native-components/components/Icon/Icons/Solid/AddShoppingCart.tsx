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
      d="M13 9h-2V6H8V4h3V1h2v3h3v2h-3v3ZM5.01 20c0-1.1.89-2 1.99-2s2 .9 2 2-.9 2-2 2-1.99-.9-1.99-2ZM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Zm-1.45-5H8.1L7 15h12v2H7c-1.52 0-2.48-1.63-1.75-2.97l1.35-2.44L3 4H1V2h3.27l4.26 9h7.02l3.86-7 1.75.96-3.86 7.01c-.34.62-1 1.03-1.75 1.03Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
