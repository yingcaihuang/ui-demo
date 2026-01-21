import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    Layout,
    SlideInRight,
    SlideOutLeft,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// 5. 3D Flip Card
const FlipCard = () => {
    const rotate = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 180], [0, 180]);
        return {
            transform: [{ rotateY: `${rotateValue}deg` }],
            opacity: rotateValue <= 90 ? 1 : 0,
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 180], [180, 360]);
        return {
            transform: [{ rotateY: `${rotateValue}deg` }],
            opacity: rotateValue >= 270 ? 1 : 0, // 180+90=270
        };
    });

    const handleFlip = () => {
        rotate.value = withTiming(rotate.value === 0 ? 180 : 0, { duration: 1000 });
    }

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>5. 3D 翻转卡片</Text>
            <TouchableOpacity onPress={handleFlip} style={{ height: 180, alignItems: 'center', justifyContent: 'center' }}>
                 <Animated.View style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}>
                    <Text style={styles.flipText}>正面 (点击翻转)</Text>
                 </Animated.View>
                 <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                    <Text style={styles.flipText}>背面</Text>
                 </Animated.View>
            </TouchableOpacity>
            <Text style={styles.cardDesc}>使用 interpolate 和 rotateY 制作 3D 效果</Text>
        </View>
    );
};

// 6. Accordion Effect
const AccordionItem = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>6. 手风琴展开/折叠</Text>
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setExpanded(!expanded)} 
                style={styles.accordionHeader}
            >
                <Text style={{ fontWeight: 'bold' }}>点击切换状态</Text>
                <Text>{expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            
            {expanded && (
                <Animated.View 
                    entering={FadeIn.duration(300)} 
                    exiting={FadeOut.duration(300)}
                    style={styles.accordionContent}
                >
                    <Text style={{ color: '#666' }}>
                        这是一个通用的展开/收起组件。通过条件渲染和 Animated.View 的 entering/exiting 属性，可以实现平滑的高度和透明度过渡。这种模式非常适合 FAQ 列表或可折叠菜单。
                    </Text>
                </Animated.View>
            )}
            <Text style={styles.cardDesc}>使用 Layout Animations 实现平滑高度变化</Text>
        </View>
    );
}

// 7. Pulse Effect
const PulseRipple = () => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withRepeat(
            withTiming(2, { duration: 2000, easing: Easing.out(Easing.ease) }),
            -1, 
            false
        );
        opacity.value = withRepeat(
            withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
            -1, 
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value
    }));

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>7. 脉冲波纹效果</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
                <View style={[styles.circle, { backgroundColor: '#2196F3', zIndex: 2 }]} />
                <Animated.View style={[styles.circle, { backgroundColor: '#2196F3', position: 'absolute' }, animatedStyle]} />
            </View>
            <Text style={styles.cardDesc}>无限扩散动画，适用于雷达或信号发射器</Text>
        </View>
    )
}

// 1. Basic Scale/Rotate Animation Component
const BouncingBox = () => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` }
    ],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.5),
      withSpring(1)
    );
    rotation.value = withSpring(rotation.value + 90);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>1. 基础弹跳与旋转</Text>
      <TouchableOpacity onPress={handlePress} style={styles.centerContent}>
        <Animated.View style={[styles.box, styles.purpleBox, animatedStyle]}>
          <Text style={styles.boxText}>点击我</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.cardDesc}>使用 withSpring 和 withSequence 组合动画</Text>
    </View>
  );
};

// 2. Continuous Animation Component
const LoadingSpinner = () => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1 // Infinite repeat
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>2. 循环加载动画</Text>
      <View style={styles.centerContent}>
        <Animated.View style={[styles.spinner, animatedStyle]} />
      </View>
      <Text style={styles.cardDesc}>使用 withRepeat 和 withTiming 创建无限循环</Text>
    </View>
  );
};

// 3. Draggable Component
const DraggableBall = () => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      isPressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? '#FF6B6B' : '#4ECDC4',
    };
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>3. 手势拖拽交互</Text>
      <View style={[styles.centerContent, { height: 150, overflow: 'hidden', backgroundColor: '#f0f0f0', borderRadius: 8 }]}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.ball, animatedStyle]}>
             <Text style={styles.ballText}>拖我去任何地方</Text>
          </Animated.View>
        </GestureDetector>
      </View>
      <Text style={styles.cardDesc}>结合 Gesture Handler 和 Reanimated 处理复杂手势</Text>
    </View>
  );
};

// 4. Layout Animations List
const AnimatedList = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  const addItem = () => {
    const nextId = items.length > 0 ? Math.max(...items) + 1 : 1;
    setItems((prev) => [nextId, ...prev]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter(item => item !== id));
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardTitle}>4. 布局进出场动画</Text>
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ 添加</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.listContainer}>
        {items.map((item) => (
          <Animated.View 
            key={item}
            entering={SlideInRight}
            exiting={SlideOutLeft}
            layout={Layout.springify()}
            style={styles.listItem}
          >
            <Text style={styles.listItemText}>项目 #{item}</Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Text style={styles.deleteText}>删除</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <Text style={styles.cardDesc}>自动化 Layout 转换与进出场效果</Text>
    </View>
  );
};

const AnimationScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>动画展示</Text>
            <Text style={styles.subtitle}>Powered by Reanimated 3</Text>
          </View>

          <BouncingBox />
          <LoadingSpinner />
          <DraggableBall />
          <AnimatedList />
          <FlipCard />
          <AccordionItem />
          <PulseRipple />
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2c3e50',
  },
  cardDesc: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 12,
    fontStyle: 'italic',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleBox: {
    backgroundColor: '#8641FA',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#E0E0E0',
    borderTopColor: '#2196F3',
    borderRightColor: '#2196F3',
  },
  ball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  ballText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    padding: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  listContainer: {
    height: 180, // Limit height
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  // New Styles
  flipCard: {
    width: 200,
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  flipCardFront: {
    backgroundColor: '#FF9800',
  },
  flipCardBack: {
    backgroundColor: '#9C27B0',
  },
  flipText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
});
