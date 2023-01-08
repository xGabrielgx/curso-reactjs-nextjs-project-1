import './styles.css'

export const TextInput = ( {inputValue, handleInputChange}) => {
  return (
    <input 
      className="text-input"
      onChange={handleInputChange}
      value={inputValue}
      type="search" 
      placeholder="Type your search"
      />
  )
}