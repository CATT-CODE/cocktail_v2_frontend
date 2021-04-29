import { useState } from 'react'

function useSignUpHooks() {
	const [input, setInput] = useState("")
	
	function handleOnChange(event) {
		setInput(event.target.value)
	}
	
	return [input, handleOnChange]
}

export default useSignUpHooks;