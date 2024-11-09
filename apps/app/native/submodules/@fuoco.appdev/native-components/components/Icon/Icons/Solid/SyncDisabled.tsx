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
      d="M2.86 5.41 4.27 4l15.95 15.95-1.41 1.41-2.58-2.58c-.68.42-1.43.75-2.23.96v-2.09c.26-.1.51-.21.76-.34L6.68 9.23C6.25 10.06 6 11 6 12c0 1.66.68 3.15 1.76 4.24L10 14v6H4l2.36-2.36a7.926 7.926 0 0 1-1.14-9.87L2.86 5.41ZM20 12c0-2.21-.91-4.2-2.36-5.64L20 4h-6v6l2.24-2.24A6.003 6.003 0 0 1 18 12c0 .85-.19 1.65-.51 2.38l1.5 1.5A7.922 7.922 0 0 0 20 12ZM10 6.35V4.26c-.66.17-1.29.43-1.88.75l1.5 1.5c.065-.025.128-.053.19-.08l.006-.002c.06-.027.12-.054.184-.078Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
