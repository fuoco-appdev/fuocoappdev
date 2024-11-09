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
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1Zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7Zm4.5 7H14V6.5l5.5 5.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
