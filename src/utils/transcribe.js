import React, { useState } from 'react';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from '../aws-exports';
import mic from 'microphone-stream';
import { Mic, Search, Stop } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { ResultContext } from "../App";



Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());


export default function SpeechToText({ setQuery, query }) {
    // const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")
    const { state, dispatch } = React.useContext(ResultContext);
    function AudioRecorder(props) {
        const [recording, setRecording] = useState(false);
        const [micStream, setMicStream] = useState();
        const [audioBuffer] = useState(
            (function () {
                let buffer = [];
                function add(raw) {
                    buffer = buffer.concat(...raw);
                    return buffer;
                }
                function newBuffer() {
                    console.log("resetting buffer");
                    buffer = [];
                }

                return {
                    reset: function () {
                        newBuffer();
                    },
                    addData: function (raw) {
                        return add(raw);
                    },
                    getData: function () {
                        return buffer;
                    }
                };
            })()
        );

        async function startRecording() {
            console.log('start recording');
            audioBuffer.reset();

            window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
                const startMic = new mic();

                startMic.setStream(stream);
                startMic.on('data', (chunk) => {
                    var raw = mic.toRaw(chunk);
                    if (raw == null) {
                        return;
                    }
                    audioBuffer.addData(raw);

                });

                setRecording(true);
                setMicStream(startMic);
            });
        }

        async function stopRecording() {
            console.log('stop recording');
            const { finishRecording } = props;

            micStream.stop();
            setMicStream(null);
            setRecording(false);

            const resultBuffer = audioBuffer.getData();

            if (typeof finishRecording === "function") {
                finishRecording(resultBuffer);
            }

        }

        return (
            <div className="audioRecorder">
                <div>
                    {recording &&
                        <Button
                            onClick={stopRecording}
                            variant="coutlined"
                            style={{ backgroundColor: 'red', padding: "6px 12px" }}
                        >
                            <Stop />
                        </Button>}
                    {!recording &&
                        <Button
                            onClick={startRecording}
                            variant="coutlined"
                            style={{ padding: "6px 12px" }}
                        >
                            <Mic />
                        </Button>}
                </div>
            </div>
        );
    }

    function convertFromBuffer(bytes) {
        setQuery('Converting text...');

        Predictions.convert({
            transcription: {
                source: {
                    bytes
                },
                // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
            },
        }).then(({ transcription: { fullText } }) => {
            setQuery(fullText);
            searchPhoto(fullText, dispatch);
        })
            .catch(err => setQuery(JSON.stringify(err, null, 2)))
    }

    return (
        <div className="Text">
            <div>
                <AudioRecorder finishRecording={convertFromBuffer} />
                {/* <p>{response}</p> */}
            </div>
        </div>
    );
}

const searchPhoto = async (query, dispatch) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const response = await fetch(`https://urmkm2ivv6.execute-api.us-east-1.amazonaws.com/beta/search?query=${query}`, requestOptions)
        const data = await response.json();
        dispatch({ type: "ADD_RESULTS", payload: { data } })
        console.log(data);
    } catch (err) {
        console.error(err)
    }
}