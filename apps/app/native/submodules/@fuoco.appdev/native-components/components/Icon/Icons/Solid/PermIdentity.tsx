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
      d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4Zm-2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Zm-2 5c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Zm-6 4.01V18h12v-1c-.2-.71-3.3-2-6-2s-5.8 1.29-6 2.01Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
