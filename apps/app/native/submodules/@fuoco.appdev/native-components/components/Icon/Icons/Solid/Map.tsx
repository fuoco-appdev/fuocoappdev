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
      d="M20.34 3.03 20.5 3c.28 0 .5.22.5.5v15.12c0 .23-.15.41-.36.48L15 21l-6-2.1-5.34 2.07-.16.03c-.28 0-.5-.22-.5-.5V5.38c0-.23.15-.41.36-.48L9 3l6 2.1 5.34-2.07ZM9 16.78l6 2.11V7.22L9 5.11v11.67Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
