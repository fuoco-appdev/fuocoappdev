import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 14H4V6h16v12ZM4 0h16v2H4V0Zm0 22h16v2H4v-2Zm8-10a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0 0 5Zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01Zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81Z" />
  </Svg>
)

export default Icon
