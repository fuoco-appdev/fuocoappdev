import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.08 6.25 1.77 1.77L13.87 13H12.1v-1.77l4.98-4.98Zm3.27-.44-1.06-1.06c-.2-.2-.51-.2-.71 0l-.85.85 1.77 1.77.85-.85c.2-.2.2-.52 0-.71ZM17.5 12.2V17h2v2h-16v-2h2v-7c0-2.79 1.91-5.14 4.5-5.8v-.7c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.7c.82.21 1.57.59 2.21 1.09l-1.43 1.43A3.89 3.89 0 0 0 11.5 6c-2.21 0-4 1.79-4 4v7h8v-2.8l2-2Zm-8 7.8h4c0 1.1-.9 2-2 2s-2-.9-2-2Z" />
  </Svg>
)

export default Icon
