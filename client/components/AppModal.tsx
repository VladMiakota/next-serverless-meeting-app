import {Modal, ModalBody, ModalButton, ModalButtonGroup, ModalHeader} from "amazon-chime-sdk-component-library-react";
import React from "react";

interface Props {
    inputValue: string;
    onInputValueChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onStartMeeting: () => Promise<void>;
    isButtonDisabled: boolean
}

const AppModal:React.FC<Props> = (props) => {
    const {inputValue, onClose, onStartMeeting, onInputValueChange, isButtonDisabled} = props
    return (
        <Modal size="md" onClose={onClose} rootId="modal-root">
            <ModalHeader title="Connect to meeting" />
            <ModalBody>
                <p>Are you want to connect to existing meeting or start new?</p>
                <label>
                    Enter meeting Id to connect to existing meeting:
                    <input
                        value={inputValue}
                        onChange={onInputValueChange}
                        placeholder='Enter meeting ID'
                    />
                </label>
                <ModalButtonGroup
                    primaryButtons={[
                        <ModalButton onClick={onStartMeeting} label="Start new meeting" variant="primary"/>
                    ]}
                    secondaryButtons={[
                        <ModalButton
                            onClick={onStartMeeting}
                            label="Connect to existing"
                            variant="secondary"
                            disabled={isButtonDisabled}
                        />
                    ]}
                />
            </ModalBody>
        </Modal>
    )
}

export default AppModal
