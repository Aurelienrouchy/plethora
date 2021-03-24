import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Tickets } from '../provider/tickets/tickets.types';
import { getRandomBetween } from '../utils/math';

const { width, height } = Dimensions.get('screen');

interface ScratchProps {
    ticket: Tickets;
    onFinish: any;
    data: number[]
}

export default function Scratch({ ticket, onFinish, data }: ScratchProps) {
    const el = useRef(null);
    const [ready, setReady] = useState(false);
    const [html, setHtml] = useState('');

    useLayoutEffect(() => {
        // if (data) {
            const position = {
                0: {
                    x: width / 2 - 35,
                    y: height / 3 
                },
                1: {
                    x: width / (2 * 3),
                    y: height / 2 - 55 
                },
                2: {
                    x: width / (2 * 3) + 40,
                    y: height / 2 + 75
                },
                3: {
                    x: width - (width / 3) - 40,
                    y: height / 2 + 75
                },
                4: {
                    x: width - (width / 3),
                    y: height / 2 - 55 
                }
            }

            let js = `
                setTimeout(function() {
                    const container = document.getElementById('js--sc--container');
                `
                data.forEach((number, index) => {
                    js += `
                        let div${index} = document.createElement('div');

                        div${index}.textContent = '${number}';
                        div${index}.style.top = '${position[index].y}px';
                        div${index}.style.left = '${position[index].x}px';
                        div${index}.style.position = 'absolute'
                        div${index}.style.width = '70px'
                        div${index}.style.height = '70px'
                        div${index}.style.display = 'flex'
                        div${index}.style.justifyContent = 'center'
                        div${index}.style.alignItems = 'center'
                        div${index}.style.fontSize = '24px'
                        div${index}.style.backgroundColor = '#fff'
                        div${index}.style.borderRadius = '100px'
                        div${index}.style.zIndex = 2

                        document.body.appendChild(div${index});
                    `
                })
                js += `
                }, 200);
            `;

            ready && el.current.injectJavaScript(js);
        // }

    }, [ready, data]);

    useLayoutEffect(() => {
        const getHtml = async () => {
            const files = await Asset.loadAsync(require('./scratch.html'));   
            let fileContents = await FileSystem.readAsStringAsync(files[0].localUri);
            fileContents += `
                    window.addEventListener('load', function () {
                        
                        window.ReactNativeWebView.postMessage("load")
                        const scContainer = document.getElementById('js--sc--container');
                        const sc = new ScratchCard('#js--sc--container', {
                            enabledPercentUpdate: true,
                            scratchType: SCRATCH_TYPE.CIRCLE,
                            brushSrc: './images/brush.png',
                            containerWidth: ${width},
                            containerHeight: ${height},
                            imageForwardSrc: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
                            imageBackgroundSrc: 'https://images.unsplash.com/photo-1545487749-bdd172ea3df1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
                            clearZoneRadius: 30,
                            percentToFinish: 20,
                            nPoints: 30,
                            pointSize: 4,
                            callback: function () {
                                window.ReactNativeWebView.postMessage("finish")
                            }
                        })
                        sc.init();
                    })
                    </script>
                    </body>
            </html>`
            setHtml(fileContents);
        };
        getHtml();
    }, [data]);

    const onMessage = (event) => {
        switch (event.nativeEvent.data) {
            case 'finish':
                onFinish()
                // const res = data.getTicket.selected.reduce((acc, cur) => acc + cur.value, 0);
                // afterScratching(res);
                break;
            case 'load':
                setReady(true);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.main}>
            <WebView
                ref={el}
                style={styles.webview}
                originWhiteList={['*']}
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onMessage={onMessage}
                source={{html}}
                allowFileAccessFromFileURLs={true}
                domStorageEnabled
                allowFileAccess={true}
                javaScriptEnabled={true}
                mixedContentMode="compatibility"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        height,
        width,
        flex: 1,
        zIndex: 1,
        backgroundColor: 'blue'
    },
    webview: {
        ...StyleSheet.absoluteFillObject,
        width,
        height,
        zIndex: 2,
    },
});