import React from 'react'
import {Input, Icon} from 'antd'
import styles from './PickInput.less'

interface PickInputProps {
    disabled?: boolean,
    value?: string,
    onClick?: () => void,
    onClear?: () => void,
    className?: string,
}

const PickInput: React.FunctionComponent<PickInputProps> = (props) => {
    const handleClick = React.useCallback(
        () => {
            if (!props.disabled && props.onClick) {
                props.onClick()
            }
        },
        [props.disabled, props.onClick]
    )

    const clearButton = props.onClear && !props.disabled && props.value
        ? <Icon
            type="close-circle"
            onClick={props.onClear}
        />
        : null

    return (
        <Input
            disabled={props.disabled}
            readOnly
            placeholder="Выберите значение"
            value={props.value || ''}
            suffix={clearButton}
            className={props.className}
            addonAfter={
                <Icon
                    className={props.disabled ? styles.disabledButton : null}
                    type="paper-clip"
                    onClick={!props.disabled ? handleClick : null}
                />
            }
        />
    )
}

export default React.memo(PickInput)
