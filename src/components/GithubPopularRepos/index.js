import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    neededList: [],
    isLoading: false,
    fetchingFailed: false,
    ActiveTabId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.setState({isLoading: true})
    this.fetchingData()
  }

  fetchingData = async () => {
    const {ActiveTabId} = this.state
    try {
      const apiUrl = `https://apis.ccbp.in/popular-repos?language=${ActiveTabId}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.fetchingDone(data.popular_repos)
    } catch (error) {
      this.fetchingError(error)
    }
  }

  fetchingDone = popularRepo => {
    const changeCaseRepo = popularRepo.map(eachObject => ({
      name: eachObject.name,
      id: eachObject.id,
      issuesCount: eachObject.issues_count,
      forksCount: eachObject.forks_count,
      starsCount: eachObject.stars_count,
      avatarUrl: eachObject.avatar_url,
    }))
    this.setState({neededList: changeCaseRepo, isLoading: false})
  }

  fetchingError = error => {
    this.setState({isLoading: false, fetchingFailed: true})
    console.log(error)
  }

  changeTabIdOnClick = uniqueId => {
    this.setState(
      {ActiveTabId: uniqueId, isLoading: true, neededList: []},
      this.fetchingData,
    )
  }

  render() {
    const {neededList, isLoading, fetchingFailed, ActiveTabId} = this.state
    return (
      <div className="main-bg">
        <h1 className="main-heading">Popular</h1>
        <ul className="ul-list-menu-items">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              itemDetails={eachData}
              isActiveTab={eachData.id === ActiveTabId}
              changeTabIdOnClick={this.changeTabIdOnClick}
            />
          ))}
        </ul>

        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )}

        {fetchingFailed && (
          <div className="fetch-error-complete-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              className="f-image"
              alt="failure view"
            />
            <h1 className="error-msg">Something Went Wrong</h1>
          </div>
        )}

        <ul className="repo-list">
          {neededList.map(eachValue => (
            <RepositoryItem key={eachValue.id} repoDetails={eachValue} />
          ))}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
