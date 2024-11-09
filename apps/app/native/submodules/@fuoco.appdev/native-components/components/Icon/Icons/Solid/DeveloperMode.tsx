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
      d="M17 5H7v2H5V3c0-1.1.9-2 2-2l10 .01c1.1 0 2 .89 2 1.99v4h-2V5Zm3 7-4.59 4.59L14 15.17 17.17 12 14 8.83l1.41-1.42L20 12Zm-10 3.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17ZM7 19h10v-2h2v4c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-4h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
