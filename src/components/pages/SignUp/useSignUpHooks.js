import { useState } from 'react'

function useSignUpHooks() {
	const [input, setInput] = useState("")
	
	function handleOnChange(e) {
		let inputValue = e.target.value;
		setInput(inputValue)
	}
	
	return [input, handleOnChange]
}

export default useSignUpHooks;