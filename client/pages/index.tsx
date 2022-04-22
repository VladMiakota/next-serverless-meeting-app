import {
    useMeetingManager,
    useLocalVideo,
    Microphone,
    Camera,
    VideoTileGrid, Dialer, LeaveMeeting
} from "amazon-chime-sdk-component-library-react";
import {MeetingSessionConfiguration} from 'amazon-chime-sdk-js'
import {NextPage} from "next";
import React, {useState} from "react";
import axiosConfig from "../api/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import AppControlBar from "../components/AppControlBar";
import AppModal from "../components/AppModal";
import styles from "../styles/styles";

const Index: NextPage = () => {
    const meetingManager = useMeetingManager()
    const {toggleVideo} = useLocalVideo()

    const [isMeetingStarted, setIsMeetingStarted] = useState(false)
    const [muted, setMuted] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const [enteredMeetingId, setEnteredMeetingId] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [meetingId, setMeetingId] = useState('')

    const toggleCamera = async () => {
        await toggleVideo()
        setCameraActive(!cameraActive)
    }

    const muteMicrophone = () => {
        setMuted(!muted)
    }

    const onOpenModal = () => {
        setIsOpenModal(true)
    }

    const onCloseModal = () => {
        setEnteredMeetingId('')
        setIsButtonDisabled(true)
        setIsOpenModal(false)
    }

    const onStartMeeting = async () => {
        const userId = uuidv4()
        const connectUrl = enteredMeetingId ? `/join?clientId=${userId}&meetingId=${enteredMeetingId}` : `/join?clientId=${userId}`
        try {
            onCloseModal()
            const response = await axiosConfig.post(connectUrl);
            const {attendee, meeting} = response.data
            setMeetingId(enteredMeetingId || meeting.Meeting.MeetingId)
            const meetingSessionConfiguration = new MeetingSessionConfiguration(meeting.Meeting, attendee.Attendee)

            await meetingManager.join(meetingSessionConfiguration)

            await meetingManager.start()
            setIsMeetingStarted(true)
        } catch (e) {
            console.log(e)
        }
    }
    const onEndMeeting = async () => {
        const json = JSON.stringify({ meetingId });
        await axiosConfig.post('/end', json);
        meetingManager.audioVideo?.stop()
        setIsMeetingStarted(false)
    }

    const onInputValueChange =(event: React.FormEvent<HTMLInputElement>) => {
        setEnteredMeetingId(event.currentTarget.value)
        setIsButtonDisabled(false)
    }

    const microphoneButtonProps = {
        icon: <Microphone muted={muted} />,
        onClick: muteMicrophone,
        label: muted ? 'Unmute': 'Mute'
    };

    const cameraButtonProps = {
        icon: <Camera disabled={!cameraActive} />,
        onClick: toggleCamera,
        label: 'Camera'
    };
    const startMeetingButtonProps = {
        icon: isMeetingStarted ? <LeaveMeeting/> : <Dialer/>,
        onClick: isMeetingStarted? onEndMeeting : onOpenModal,
        label: isMeetingStarted ? 'End' : 'Start',
    }

  return (
      <div>
          <div style={styles.videoGridStyles}>
              <VideoTileGrid/>
              <AppControlBar
                  layout='bottom'
                  buttonProps={[microphoneButtonProps, startMeetingButtonProps, cameraButtonProps]}/>
          </div>
          {
              isOpenModal &&
              <AppModal
                  inputValue={enteredMeetingId}
                  onInputValueChange={onInputValueChange}
                  onClose={onCloseModal}
                  onStartMeeting={onStartMeeting}
                  isButtonDisabled={isButtonDisabled}
              />
          }
      </div>
  );
}

export default Index
