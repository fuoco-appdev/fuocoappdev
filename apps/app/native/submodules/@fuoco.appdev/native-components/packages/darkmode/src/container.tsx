import { StyleSheet, View } from 'react-native';
import Constants from './constants';
import { Channel } from './darkmode-panel';
import { useState, useEffect, ReactNode } from 'react';

interface ContainerProps {
  initialMode: string;
  channel: Channel;
  children: ReactNode;
}

const Container = ({ initialMode, channel, children }: ContainerProps) => {
  const [mode, setMode] = useState<string>(initialMode);

  useEffect(() => {
    channel.on(Constants.UPDATE_MODE, setMode);
    return () => {
      channel.removeListener(Constants.UPDATE_MODE, setMode);
    };
  }, [channel]);

  return (
    <View style={[styles.container, mode ? { backgroundColor: mode } : {}]}>
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
});
