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
      d="M7.945 3.441 6.663 1.905 2.056 5.75l1.281 1.536L7.945 3.44Zm9.392-1.535 4.607 3.843-1.281 1.536-4.608-3.843 1.282-1.536ZM12.5 8.095H11v6l4.75 2.85.75-1.23-4-2.37v-5.25Zm-.5-4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4.095Zm-7 9c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7-7 3.14-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
