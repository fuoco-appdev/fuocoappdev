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
      d="M11 1h2v6h-2V1ZM9.17 7.76 7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41ZM7 11H1v2h6v-2Zm11.36-3.95-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12ZM17 11h6v2h-6v-2Zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm4.95 9.36-2.12-2.12 1.41-1.41 2.12 2.12-1.41 1.41ZM5.64 16.95l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12ZM13 17v6h-2v-6h2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
