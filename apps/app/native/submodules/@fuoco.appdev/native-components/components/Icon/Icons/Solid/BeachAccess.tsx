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
      d="m20.28 5.97-2.86 2.86C14.29 5.7 9.91 4.65 5.98 5.95c3.95-3.94 10.35-3.93 14.3.02Zm-5.72 7.16-1.43 1.43L19.57 21 21 19.57l-6.44-6.44ZM5.95 5.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C5.7 14.29 4.65 9.91 5.95 5.98Zm.01-.01.01-.01c3.01-.38 6.89 1.17 10.02 4.3l-5.73 5.73c-3.13-3.14-4.68-7.01-4.3-10.02Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
