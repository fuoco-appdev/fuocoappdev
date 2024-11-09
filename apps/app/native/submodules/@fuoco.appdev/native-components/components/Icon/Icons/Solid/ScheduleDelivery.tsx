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
      d="M14.82 3.125H19c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-16c0-1.1.9-2 2-2h4.18c.42-1.16 1.52-2 2.82-2 1.3 0 2.4.84 2.82 2Zm-1.82 1c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1Zm6 17H5v-16h2v3h10v-3h2v16Zm-11.125-7.13 2.946 2.88 5.304-5.182-.83-.818-4.474 4.37-2.115-2.061-.831.812Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
