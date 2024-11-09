import { View } from 'react-native';

export interface PrivacyPolicyProps {
  children?: React.ReactNode;
}

export default function PrivacyPolicy({ children }: PrivacyPolicyProps) {
  return <View>{children}</View>;
}
