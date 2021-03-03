
document.addEventListener('DOMContentLoaded', () => {
    
    function renderUser(user) {
        let userList = document.getElementById('user-list')

        let newUser = document.createElement('li')
            newUser.style.margin = "40px 40px"
        
        let userSpan = document.createElement('span')

        let userDiv = document.createElement('div')
            userDiv.style.border = "thick solid #000000"
            userDiv.style.padding = " 20px "
            userDiv.style.borderRadius = "15px"


        let username = document.createElement('h4')
            username.innerText = 'Username: '

        let userLink = document.createElement('a')
            userLink.href = user.html_url
            userLink.innerText = user.login

        username.appendChild(userLink)

        let userAvatar = document.createElement('img')
            userAvatar.src = user.avatar_url
            userAvatar.alt = `${user.login} avatar`

        let userRepos = document.createElement('div')
            userRepos.innerText = `See ${user.login}'s repos`
            userRepos.style.padding = "20px"
            userRepos.style.textDecoration = "underline"
            
            let displayRepos = true
            
            userRepos.addEventListener('click', () => {
                
                if (displayRepos) {
                    displayRepos = false
                    const REPO_URL = `https://api.github.com/users/${user.login}/repos`

                    fetch(REPO_URL)
                        .then(res => res.json())
                        .then(parsRes => {
                            let repoDiv = document.createElement('span')
                                repoDiv.dataset.repoId = user.id
                            let repoList = document.createElement('ul')

                            repoDiv.appendChild(repoList)
                            parsRes.forEach(repo => {
                              
                                let listItem = document.createElement('li')

                                let listLink = document.createElement('a')
                                    listLink.innerText = repo.name
                                    listLink.href = repo.html_url
                                    listLink.target = '_blank'

                                listItem.appendChild(listLink)

                                repoList.appendChild(listItem)
                            })
                            userDiv.appendChild(repoDiv)
                        })
                    } else {
                        displayRepos = true
                        document.querySelectorAll('[data-repo-id]').forEach(item => item.innerHTML = '')
                    }
            })

        userDiv.append(username, userAvatar, userRepos)

        userSpan.appendChild(userDiv)

        newUser.appendChild(userSpan)

        userList.appendChild(newUser)
        
    }

    function renderMessage() {
        let searchForm = document.getElementById('github-form')
        
        let sibling = document.createElement('div')
            sibling.innerText = "No search results found"
            searchForm.

        searchForm.insertAdjacentElement(sibling)
    }

    let searchForm = document.getElementById('github-form')
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let user = e.target.search.value
        let userSearch = `?q=${user}`
        
        const USER_URL = `https://api.github.com/search/users${userSearch}`

        fetch(USER_URL)
            .then(res => res.json())
            .then(usersRes => {
                    let userList = document.getElementById('user-list')
                    userList.innerHTML = ''
                    usersRes.items.forEach(user => renderUser(user))
                    searchForm.reset()
            })
    })
})