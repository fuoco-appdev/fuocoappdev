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
      d="m21 5.1-.8.8C19 4.8 17.5 4.2 16 4.2s-3 .6-4.2 1.7l-.8-.8C12.4 3.7 14.2 3 16 3c1.8 0 3.6.7 5 2.1Zm-5 .2c1.2 0 2.4.5 3.3 1.4l-.8.8c-.7-.7-1.6-1-2.5-1-.9 0-1.8.3-2.5 1l-.8-.8c.9-.9 2.1-1.4 3.3-1.4Zm3 7.7h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2ZM6 18h2v-2H6v2Zm5.5 0h-2v-2h2v2Zm1.5 0h2v-2h-2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
