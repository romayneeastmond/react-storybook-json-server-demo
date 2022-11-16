import Alert from '../../components/UI/Alert'

import '../../App.scss'

export default {
    title: 'Components/UI/Alert',
    component: Alert,
    argTypes: {
        text: {
            control: {
                type: null
            }
        },
        textString: {
            name: 'Text String (text)',
            type: {
                name: 'string',
                required: false
            },
            defaultValue: '',
            description: 'String value that is copied into the disabled text: PropTypes.element',
            table: {
                type: {
                    summary: 'string'
                },
                defaultValue: {
                    summary: 'Alert Raised'
                },
            },
            control: {
                type: 'text'
            }
        }
    }
}

const onClickAlert = () => {
    console.log('This is an alert click from within StoryBook.')
}

const Template = ({ textString, ...args }) => (
    <Alert text={<>{textString}</>} {...args} />
)

export const Default = Template.bind({})
Default.args = {
    textString: 'Alert Raised'
}

export const HideClose = ({ textString, ...args }) => {
    const currentText = textString === ''
        ? <>
            This is an informational alert with a hidden close button. Made possible by passing null to the onClick handler
            <hr />
            From Storybook view the 'Story' tab for source code.
        </>
        : <>{textString}</>

    return (
        <>
            <div className='small'>
                Emptying the Text String field will display an HTML message.
            </div>
            <hr />

            <Template
                colour={'alert-info'}
                text={currentText}
                {...args}
                onClick={null}
            />
        </>
    )
}

export const AutoClick = ({ textString, ...args }) => {
    const currentText = textString === ''
        ? <><b>Success!</b> Setting the autoClick flag to true should automatically return the click event.</>
        : <>{textString}</>

    return (
        <>
            <div className='small'>
                Emptying the Text String field will display an HTML message. From Storybook view the 'Story' tab for source code.
            </div>
            <hr />

            <Template
                colour={'alert-success'}
                text={currentText}
                autoClick={true}
                onClick={onClickAlert}
                {...args}
            />
        </>
    )
}

export const WarningAlert = ({ textString, ...args }) => {
    const currentText = textString === ''
        ? <><b>Warning</b> Resetting the controls, in Storybook, may not reload an alert that has been closed.<br />Try changing the text or colour instead!</>
        : <>{textString}</>

    return (
        <>
            <div className='small'>
                Emptying the Text String field will display an HTML message. From Storybook view the 'Story' tab for source code.
            </div>
            <hr />

            <Template
                colour={'alert-warning'}
                text={currentText}
                {...args}
            />
        </>
    )
}