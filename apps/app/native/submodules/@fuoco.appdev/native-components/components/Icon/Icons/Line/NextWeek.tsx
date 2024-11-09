import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11 18 4-4-4-4-1 1 3 3-3 3 1 1Zm9-11.5h-4v-2c0-.55-.22-1.05-.59-1.41-.36-.37-.86-.59-1.41-.59h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2Zm-10-2h4v2h-4v-2Zm10 15H4v-11h16v11Z" />
  </Svg>
)

export default Icon
