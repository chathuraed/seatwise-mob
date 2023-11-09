import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {width, scale, verticalScale} from '../../styles/scaling';
import {Images} from '../../resources';
import {useNavigation} from '@react-navigation/native';

type Props = {
  navigation: any;
};

const STEPS = [
  {
    key: 1,
    title: 'Select your preferred bus route and date',
    description:
      'Choose from various available bus routes and pick the date for your journey.',
    image: Images.tour_1,
  },
  {
    key: 2,
    title: 'Reserve seats quickly and easily',
    description:
      'Book your bus seats with just one click and secure your spot on the bus.',
    image: Images.tour_2,
  },
  {
    key: 3,
    title: 'Get confirmation and ticket details',
    description:
      'Receive instant confirmation of your reservation along with ticket details for your journey.',
    image: Images.tour_3,
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: verticalScale(120),
        zIndex: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
      }}>
      {STEPS.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const size = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: verticalScale(10),
              width: scale(10),
              borderRadius: scale(5),
              margin: scale(10),
              backgroundColor: 'white',
              transform: [
                {
                  scale: size,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const ProductTourScreen = () => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const flatListRef = React.useRef(null);

  const handleNextButtonPress = () => {
    // Get the current index of the FlatList
    const currentIndex = Math.floor(scrollX._value / width);

    // Check if there's a next item, and if so, scroll to it
    if (currentIndex < STEPS.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({index: nextIndex});
    } else {
      navigation.navigate('Landing');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_bar}>
        <View style={styles.logo} />
        <TouchableOpacity
          style={styles.skip_button}
          onPress={() => navigation.navigate('Onboarding')}>
          <Text style={styles.skip_text}>skip</Text>
        </TouchableOpacity>
      </View>
      <Indicator scrollX={scrollX} />
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        data={STEPS}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => {
          return (
            <View style={[{width}, styles.content]}>
              <View style={{marginHorizontal: scale(24)}}>
                <Text style={styles.content_heading}>{item.title}</Text>
                <Text style={styles.content_description}>
                  {item.description}
                </Text>
              </View>

              <View style={styles.bottom_container}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNextButtonPress()}>
                    <Text style={styles.start_button_text}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductTourScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top_bar: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(38),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: scale(52),
    height: verticalScale(52),
    backgroundColor: '#234F68',
  },
  skip_button: {
    borderRadius: scale(100),
    backgroundColor: '#DFDFDF',
  },
  skip_text: {
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(8),
    color: 'black',
    fontSize: scale(12),
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: scale(22),
    letterSpacing: 0.36,
  },
  content: {
    marginTop: verticalScale(51),
  },
  content_heading: {
    color: 'black',
    fontSize: scale(25),
    fontFamily: 'Lato',
    fontWeight: '500',
    lineHeight: verticalScale(40),
    letterSpacing: 0.75,
  },
  content_description: {
    marginTop: verticalScale(20),
    color: '#292929',
    fontSize: scale(12),
    fontFamily: 'Lato',
    fontWeight: '400',
    lineHeight: verticalScale(20),
    letterSpacing: 0.36,
  },
  bottom_container: {
    flex: 1,
    marginHorizontal: scale(10),
    marginTop: verticalScale(36),
    marginBottom: verticalScale(10),
  },
  image: {
    borderRadius: scale(30),
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: verticalScale(43),
  },
  button: {
    backgroundColor: '#8BC83F',
    borderRadius: scale(10),
  },
  start_button_text: {
    color: 'white',
    fontSize: scale(16),
    fontFamily: 'Lato',
    fontWeight: '700',
    paddingVertical: verticalScale(17),
    paddingHorizontal: scale(60),
  },
});
