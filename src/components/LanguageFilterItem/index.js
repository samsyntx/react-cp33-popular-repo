// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, isActiveTab, changeTabIdOnClick} = props
  const {id, language} = itemDetails
  const classAdd = isActiveTab ? 'color-item' : ''

  const changeStateSelectedLang = () => {
    changeTabIdOnClick(id)
  }

  return (
    <li className="list-item">
      <button
        onClick={changeStateSelectedLang}
        type="button"
        className={`list-button ${classAdd}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
