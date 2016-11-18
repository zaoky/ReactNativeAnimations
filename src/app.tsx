
import * as React from 'react';
import { StyleSheet, View, Animated, Easing, Text, TouchableWithoutFeedback, PanResponder, Dimensions } from 'react-native';
const {height} = Dimensions.get("window");

export class ReactNativeAnimations extends React.Component<void, void> {

    animatedValue: Animated.Value;

    componentWillMount() {
        this.animatedValue = new Animated.Value(100);
    }

    componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 300,
            duration: 1000,
            easing: Easing.bounce
        }).start();

    }


    render() {
        //const animatedStyle = { opacity: this.animatedValue }
        const animatedStyle = { height: this.animatedValue } //we can animate any prop
        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.box, animatedStyle]} />
            </View>
        );
    }
}


export class AnimateScaleButton extends React.Component<any, void>{
    animatedValue: Animated.Value;

    constructor(props: any) {
        super(props);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: .5
        }).start();
    }

    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start();
    }

    render() {
        const animatedStyle = {
            transform: [{ scale: this.animatedValue }]
        };

        return (
            <View style={[styles.container]} >
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                    >
                    <Animated.View style={[styles.button, animatedStyle]}>
                        <Text style={[styles.text]} > Press Me </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export class AnimateDraggedItems extends React.Component<void, void>{
    animatedValue: Animated.ValueXY;
    panResponder: React.PanResponderInstance;
    _value: { x: number, y: number };
    componentWillMount() {
        this.animatedValue = new Animated.ValueXY();
        this.animatedValue.addListener((value) => this._value = value);
        this._value = { x: 0, y: 0 };
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.animatedValue.setOffset({
                    x: this._value.x,
                    y: this._value.y
                });
                this.animatedValue.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.animatedValue.x, dy: this.animatedValue.y }
            ]),
            onPanResponderRelease: (e, gestureState) => {
                this.animatedValue.flattenOffset();
                Animated.decay(this.animatedValue, {
                    deceleration: 0.996,
                    velocity: { x: gestureState.vx, y: gestureState.vy }
                }).start();
            }
        });
    }

    render() {
        const animatedStyle = {
            transform: this.animatedValue.getTranslateTransform()
        };

        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}
                    >
                    <Text style={[styles.text]} >Drag Me</Text>
                </Animated.View>
            </View>
        );
    }
}

export class AnimateColorInterpolation extends React.Component<void, void>{
    animatedValue: Animated.Value;

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 150,
            duration: 1500
        }).start();
    }
    render() {
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 50],
            outputRange: ['rgb(0,0,0)', 'rgb(51,250,170)']
        });
        const animatedStyle = {
            backgroundColor: interpolateColor,
            transform: [{ translateY: this.animatedValue }]
        };
        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.box, animatedStyle]} />
            </View>
        );
    }
}

export class AnimateRotationInterpolation extends React.Component<void, void>{
    animatedValue: Animated.Value;

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 1500
        }).start();
    }

    render() {
        const interpolateRotation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const animatedStyle = {
            transform: [{ rotate: interpolateRotation }]
        };

        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.box, animatedStyle]} >
                    <Text style={[styles.text]}> Spinner </Text>
                </Animated.View>
            </View>
        );
    }
}

export class SequenceAnimation extends React.Component<void, void>{
    animatedValue1: Animated.Value;
    animatedValue2: Animated.Value;
    componentWillMount() {
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(1);
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.animatedValue1, {
                toValue: 150,
                duration: 1000
            }),
            Animated.spring(this.animatedValue2, {
                toValue: 3
            }),
            Animated.timing(this.animatedValue1, {
                toValue: 0,
                duration: 1000
            }),
            Animated.spring(this.animatedValue2, {
                toValue: 0.5
            })
        ]).start();
    }

    render() {
        const animatedStyle = {
            transform: [
                { translateY: this.animatedValue1 },
                { scale: this.animatedValue2 }
            ]
        };
        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.box, animatedStyle]} />
            </View>
        );
    }
}

export  class StaggerAnimation extends React.Component<void, void>{
    animatedValue1: Animated.Value;
    animatedValue2: Animated.Value;
    animatedValue3: Animated.Value;
    componentWillMount() {
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);
    }

    componentDidMount() {
      Animated.stagger(300,[
          Animated.timing(this.animatedValue1, {
              toValue: height,
              duration: 1500
          }),
          Animated.timing(this.animatedValue2, {
              toValue: height,
              duration: 1500
          }),
          Animated.timing(this.animatedValue3, {
              toValue: height,
              duration: 1500
          })
      ]).start();
    }

    render() {
        const animatedStyle1 = {
            height: this.animatedValue1
        };
        const animatedStyle2 = {
            height: this.animatedValue2
        };
        const animatedStyle3 = {
            height: this.animatedValue3
        };
        return (
            <View style={[styles.containerStagger]} >
                <Animated.View style={[styles.boxStagger, animatedStyle1]} />
                <Animated.View style={[styles.boxStagger, animatedStyle2]} />
                <Animated.View style={[styles.boxStagger, animatedStyle3]} />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStagger: {
         flex: 1,
        flexDirection: 'row'
    },
    box: {
        backgroundColor: '#333',
        width: 100,
        height: 100      
    },
    boxStagger: {
          flex: 1,
        backgroundColor: '#333', 
        marginHorizontal: 5
    },
    button: {
        backgroundColor: '#333',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff'
    }
});
