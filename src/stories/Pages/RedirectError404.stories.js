import Error404 from '../../components/Pages/Error404'

import '../../App.scss'

export default {
    title: 'Pages/Dynamic/Error 404 Page',
    component: Error404,
    argTypes: {
        message: {
            control: {
                type: null
            }
        },
        messageString: {
            name: 'Message String (message)',
            type: { 
                name: 'string', 
                required: false 
            },
            defaultValue: '',
            description: 'String value that is copied into the disabled message: PropTypes.element',
            table: {
                type: {
                    summary: 'string'
                },
                defaultValue: {
                    summary: '=\'/'
                },
            },
            control: {
                type: 'text'
            }
        }
    }
}

const Template = ({ messageString, ...args }) => (
    <Error404 message={<>{messageString}</>} {...args} />
)

export const Default = Template.bind({})
Default.args = {
    errorCode: 'Error 404',
    messageString: '=\'/'
}

export const Message = Template.bind({})
Message.args = {
    errorCode: 'Error 404',
    messageString: 'Plain Error Message'
}

export const MessageAndCode = ({ messageString, ...args }) => {
    const currentMessage = messageString === ''
        ? <span><b className='error'>Reason:</b> Message with HTML elements</span>
        : <>{messageString}</>

    return (
        <Error404
            errorCode={'Error 400'}
            message={currentMessage}
            {...args}
        >
            <hr />
            <div className='small'>
                Empyting the Message String field will display an HTML message.
                <br />
                From Storybook view the 'Story' tab for source code.
            </div>
        </Error404>
    )
}