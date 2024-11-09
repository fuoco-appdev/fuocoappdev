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
      d="M7.945 3.441 6.663 1.905 2.056 5.75l1.281 1.536L7.945 3.44Zm9.392-1.535 4.607 3.843-1.281 1.536-4.608-3.843 1.282-1.536ZM10.54 14.625l-2.13-2.13-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95ZM12 4.095a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4.095Zm-7 9c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7-7 3.14-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
