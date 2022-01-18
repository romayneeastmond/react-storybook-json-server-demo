import useState from 'storybook-addon-state'
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs'

import Modal from '../../components/UI/Modal'

import '../../App.scss'

export default {
    title: 'Components/UI/Modal',
    component: Modal,
    argTypes: {
        body: {
            control: {
                type: null
            }
        },
        bodyString: {
            name: 'Body String (text)',
            type: {
                name: 'string',
                required: false
            },
            defaultValue: '',
            description: 'String value that is copied into the disabled body: PropTypes.element',
            table: {
                type: {
                    summary: 'string'
                },
                defaultValue: {
                    summary: 'Modal Content'
                },
            },
            control: {
                type: 'text'
            }
        },
        size: { control: 'select' },
        persist: {
            description: 'Determines if the Modal can only be closed by the action buttons instead of the modal background.'
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
                    <p className='small'>Modal stories unavailable because they rely on Storybook useState which is not compatible with this view.</p>
                    <ArgsTable story={PRIMARY_STORY} />
                </>
            )
        }
    }
}

const Template = ({ bodyString, ...args }) => {
    const [showModal, setShowModal] = useState(false)

    const onShowModal = () => {
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className='small'>
                <p>
                    Automatically displaying the modal hides the Storybook 'Canvas' and 'Docs'. Manually launch the modal by clicking the button below.
                </p>
                <p>
                    Modal relies on Storybook useState which is unavailable on the 'Docs' view.
                </p>
            </div>
            <hr />
            <button className='btn btn-sm btn-outline-secondary' onClick={onShowModal}>
                Show Modal
            </button>

            {
                (showModal === true) &&
                <Modal body={<>{bodyString}</>} {...args} onOkClick={hideModal} onCancelClick={hideModal} isDestroyed={hideModal}>

                </Modal>
            }
        </>
    )
}

export const Default = Template.bind({})
Default.args = {
    bodyString: 'Modal Content',
    buttonOk: 'Ok',
    buttonCancel: 'Cancel'
}

export const CustomBody = Template.bind({})
CustomBody.args = {
    title: 'Modal with props.children Inserted',
    bodyString: '',
    children: <>
        <p>An example of a Modal with props.children</p>
        <p>Therefore allowing any kind of HTML content. <strong>Horay!</strong></p>
        <p>This includes <a href='https://storybook.js.org/' target='_blank'>clicking on</a> external links.</p>
    </>,
    buttonOk: 'Confirm',
    buttonCancel: 'Close'
}