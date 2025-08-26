const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET-USER': {
      const username = action.payload.username
      const favList = action.payload.favList
      const userID = action.payload.userID
      const newState = { username, favList, userID }
      localStorage.setItem('$User', JSON.stringify(newState))
      return newState
    }

    case 'ADD-FAV': {
      const postID = state.favList.find(
        (favItem) => favItem.postID == action.payload.postID
      )

      if (!postID) {
        const newFavList = [...state.favList]
        newFavList.push({ postID: action.payload.postID })
        const newState = { ...state, favList: newFavList }
        localStorage.setItem('$User', JSON.stringify(newState))
        return newState
      } else {
        return state
      }
    }

    case 'DELETE-FAV': {
      const newFavList = state.favList.filter(
        (favItem) => favItem.postID !== action.payload.postID
      )
      const newState = { ...state, favList: newFavList }
      localStorage.setItem('$User', JSON.stringify(newState))
      return newState
    }

    case 'NSFW-CONTENT-OFF': {
      const newState = { ...state, nsfw_content: false }
      return newState
    }

    case 'NSFW-CONTENT-ON': {
      const newState = { ...state, nsfw_content: true }
      return newState
    }

    default:
      return state
  }
}

export default userReducer
