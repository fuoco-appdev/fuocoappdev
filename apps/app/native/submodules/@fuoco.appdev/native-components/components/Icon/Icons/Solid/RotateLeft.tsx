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
      d="M13 1v3.07c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93v-2.02c2.84-.48 5-2.94 5-5.91s-2.16-5.43-5-5.91V10L8.45 5.55 13 1ZM5.7 7.11l1.41 1.42c-.53.75-.88 1.6-1.02 2.47H4.07c.17-1.39.73-2.73 1.63-3.89ZM4.07 13h2.02c.14.88.49 1.72 1.01 2.47l-1.41 1.42c-.9-1.16-1.45-2.5-1.62-3.89Zm3.03 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
