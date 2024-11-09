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
      d="M20.347 4.652a.896.896 0 0 0 0-1.301l-2.242-2.16a.98.98 0 0 0-1.352 0L14.875 3l3.594 3.462 1.878-1.81ZM17.51 7.385l-3.593-3.462-9.584 9.23v3.462h3.594l9.583-9.23Zm5.99 12H.5v3.692h23v-3.692Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
