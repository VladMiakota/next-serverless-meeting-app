import {ControlBar, ControlBarButton} from "amazon-chime-sdk-component-library-react";
import React from "react";
import {ControlBarLayout} from "amazon-chime-sdk-component-library-react/lib/components/ui/ControlBar";

interface IButtonProps {
    icon: JSX.Element;
    onClick: () => void
    label: string
}

interface Props {
    layout: ControlBarLayout;
    buttonProps: IButtonProps[]
}

const AppControlBar: React.FC<Props> = (props) => {
    const {layout, buttonProps} = props
    return (
        <ControlBar showLabels layout={layout} style={{height: '10vh'}}>
            {buttonProps.map((buttonProps, index) => (
                <ControlBarButton {...buttonProps} key={index}/>
            ))}
        </ControlBar>
    )

}

export default AppControlBar
