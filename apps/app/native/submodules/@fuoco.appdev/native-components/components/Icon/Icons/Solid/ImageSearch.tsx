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
      d="M19.3 8.89c.44-.7.7-1.51.7-2.39C20 4.01 17.99 2 15.5 2S11 4.01 11 6.5s2.01 4.5 4.49 4.5c.88 0 1.7-.26 2.39-.7L21 13.42 22.42 12 19.3 8.89ZM18 20v-7l2 2v5c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h5.5a6.3 6.3 0 0 0-.48 2H4v14h14Zm-1.5-2-3.54-4.71-2.75 3.54-1.96-2.36L5.5 18h11ZM13 6.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
