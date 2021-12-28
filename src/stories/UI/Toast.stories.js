import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

import Toast from '../../components/UI/Toast'
import ToastWrapper from '../../components/UI/ToastWrapper'
import { FaCheckCircle } from 'react-icons/fa'

import '../../App.scss'

export default {
    title: 'Components/UI/Toast',
    component: Toast,
    subcomponents: {
        ToastWrapper
    },
    argTypes: {
        icon: {
            description: 'Any image element. See Font Awesome story for an example.',
            control: {
                type: null
            }
        },
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
                    summary: 'Toast Raised'
                },
            },
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <hr />
                    <p className='small'>Toast stories unavailable because unrelated toasts rely on event callbacks that do not interact well with this view.</p>
                    <ArgsTable story={PRIMARY_STORY} />                    
                </>
            )
        }
    }
}

const onClickToast = () => {
    alert('This is a toast click from within StoryBook.')
}

const Template = ({ textString, ...args }) => {
    return (
        <>
            <div className='small'>
                <p>
                    Toast relies on event callbacks that do not interact well with the 'Docs' view.
                </p>
            </div>
            <hr />
            <ToastWrapper>
                <Toast text={<>{textString}</>} {...args} />
            </ToastWrapper>
        </>
    )
}

export const Default = Template.bind({})
Default.args = {
    textString: 'Toast Raised'
}

export const FontAwesome = ({ textString, ...args }) => {
    const currentText = textString === ''
        ? <>Nice <b>all</b> your changes have been made!</>
        : <>{textString}</>

    return (
        <>
            <div className='small'>
                Empyting the Text String field will display an HTML message. From Storybook view the 'Story' tab for source code.
            </div>
            <hr />
            <ToastWrapper>
                <Toast
                    color={'alert-success'}
                    text={currentText}
                    title={'Successful Changes'}
                    subTitle={'2 seconds ago'}
                    persist={true}
                    icon={<FaCheckCircle className='mr-2' />}
                    {...args}
                />
            </ToastWrapper>
        </>
    )
}

export const StickyToast = ({ textString, ...args }) => {
    const currentText = textString === ''
        ? <>This is an informational toast that does not auto-hide</>
        : <>{textString}</>

    return (
        <>
            <div className='small'>
                Empyting the Text String field will display an HTML message. From Storybook view the 'Story' tab for source code.
            </div>
            <hr />
            <ToastWrapper>
                <Toast
                    color={'alert-info'}
                    text={currentText}
                    title={'Sticky Toast'}
                    persist={true}
                    onClick={onClickToast}
                    {...args}
                />
            </ToastWrapper>
        </>
    )
}