const tasksService = () => {
    const apiUrl = `${process.env.REACT_APP_API_ADDRESS}tasks`
    
    const add = async (task) => {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        if (!res.ok) {
			return
        }

        const data = await res.json()

        return data
    }

    const remove = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
    }

    const get = async (id) => {
        const res = await fetch(`${apiUrl}/${id}`)

        if (!res.ok) {
            return
        }        

		const data = await res.json()

        return data
    }

    const list = async () => {
        const res = await fetch(apiUrl)
        

        if (!res.ok) {
            return
        }
		
		const data = await res.json()

        return data
    }

    const update = async (id, task) => {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        if (!res.ok) {
            return
        }        

        const data = await res.json()

        return data
    }

    return {
        apiUrl,
        add,
        get,
        list,
        remove,
        update
    }
}

export default tasksService