import React, {FunctionComponent} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {Store} from '../../interfaces/store'
import {$do} from '../../actions/actions'
import {MultivalueSingleValue} from '../../interfaces/data'
import MultivalueTag from '../ui/Multivalue/MultivalueTag'
import {MultivalueFieldMeta} from '../../interfaces/widget'

export interface MultivalueFieldOwnProps {
    widgetName: string, // TODO: for future pagination support
    defaultValue: MultivalueSingleValue[],
    widgetFieldMeta: MultivalueFieldMeta,
    bcName: string,
    disabled: boolean,
    metaError: string
}

export interface MultivalueFieldProps extends MultivalueFieldOwnProps {
    cursor: string,
    page: number,
    popupBcName: string,
    fieldKey: string,
    onRemove: (
        bcName: string,
        popupBcName: string,
        cursor: string,
        associateFieldKey: string,
        newValue: MultivalueSingleValue[],
        removedItem: MultivalueSingleValue
    ) => void,
    onMultivalueAssocOpen: () => void
}

const MultivalueField: FunctionComponent<MultivalueFieldProps> = (props) => {

    const onRemove = (newValue: MultivalueSingleValue[], removedItem: MultivalueSingleValue) => {
        props.onRemove(props.bcName, props.popupBcName, props.cursor, props.fieldKey, newValue, removedItem)
    }

    return <MultivalueTag
        onPopupOpen={props.onMultivalueAssocOpen}
        onChange={onRemove}
        value={props.defaultValue}
        disabled={props.disabled}
        widgetFieldMeta={props.widgetFieldMeta}
        page={props.page}
        bcName={props.bcName}
        metaError={props.metaError}
    />
}

function mapStateToProps(store: Store, ownProps: MultivalueFieldOwnProps) {
    // TODO: for future pagination support
    // const widget = store.view.widgets.find(widget => widget.name === ownProps.widgetName)
    // const bc = store.screen.bo.bc[widget.bcName]
    return {
        cursor: store.screen.bo.bc[ownProps.bcName].cursor,
        page: 0,
        popupBcName: ownProps.widgetFieldMeta.popupBcName,
        assocValueKey: ownProps.widgetFieldMeta.assocValueKey,
        fieldKey: ownProps.widgetFieldMeta.key
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onMultivalueAssocOpen: (bcName: string, widgetFieldMeta: MultivalueFieldMeta, page: number) => {
            // TODO: for future pagination support
            // if (page !== 1) {
            //   dispatch($do.componentChangePage({page: 1, bcName: popupBcName, isPopup: true}))
            // }
            dispatch($do.showViewPopup({
                assocValueKey: widgetFieldMeta.assocValueKey,
                bcName: widgetFieldMeta.popupBcName,
                calleeBCName: bcName,
                associateFieldKey: widgetFieldMeta.key
            }))
        },
        onRemove: (
            bcName: string,
            popupBcName: string,
            cursor: string,
            associateFieldKey: string,
            dataItem: MultivalueSingleValue[],
            removedItem: MultivalueSingleValue
        ) => {
            dispatch($do.removeMultivalueTag({
                bcName,
                popupBcName,
                cursor,
                associateFieldKey,
                dataItem,
                removedItem
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultivalueField)
