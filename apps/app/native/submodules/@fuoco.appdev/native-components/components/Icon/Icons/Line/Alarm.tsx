import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 8.095H11v6l4.75 2.85.75-1.23-4-2.37v-5.25Zm4.837-6.19 4.607 3.845-1.28 1.535-4.61-3.843 1.283-1.537Zm-10.675 0 1.282 1.536-4.607 3.844-1.28-1.536 4.606-3.844ZM12 4.095a9 9 0 1 0 .002 18.001A9 9 0 0 0 12 4.095Zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7Z" />
  </Svg>
)

export default Icon
