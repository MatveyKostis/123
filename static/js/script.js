let mainMenuTriger = document.querySelector('.menuTriger')
let mainMenuContainer = document.querySelector('.mainMenuContainer')
mainMenuTriger.addEventListener('click', function(){
    mainMenuContainer.classList.toggle('mainMenuOpened')
})

let allComments = ['Цей кадр нереально крутий! :)',
				'Ти вмієш дивувати! Кожен кадр - поєднання життєлюбності і краси',
				'Спинися мить, прекрасна ти!',
				'Просто супер! Як тобі це вдається?',
				'Це прото шедевр мистецтва',
				'В цьому штучному світі так приємно знайти щось натуральне))',
				'Клас!!!))',
				'Нереально чудово!',
				'А ти вмієш дивувати ;)',
				'Це фото так і проситься в рамочку на стіну']
let allDescriptions = ['Коли радості немає меж',
						'Любов в кожному пікселі',
						'Фото заряджене позитивом',
						'Зловив дзен',
						'Як мало потрібно для щастя',
						'Знали б ви що в мене на умі! ;)',
						'Show must go on',
						'Good vibes only',
						'My inspiration',
						'On my way to paradise',
						'Що це, якщо не любов? Х)'];
                        
function generateRandomElement(array){
    return array[Math.floor(Math.random() * array.length)]
}

function generatePicturesDB(count){
    let pictures = []

    for(let i = 0; i < count; i++){

        let comments = []
        for (let j = 0; j < Math.floor(Math.random() * 10 ); j++) {
            comments.push(generateRandomElement(allComments))
        }

        let pictureExample = {
            src: `${i}.jpg`,
            comments: comments,
            commentsNumber: comments.length,
            description: generateRandomElement(allDescriptions),
            likes: Math.floor(Math.random() * 300)
        }
        pictures.push(pictureExample)
    }

    return pictures
}
let picturesDB = generatePicturesDB(26)
function showPictures(photosArray){
    let picturesTemplate = document.querySelector('#templatePictureExample')
    let pictureExample = picturesTemplate.content.querySelector('.pictureExample')
    let picturesContainer = document.querySelector('.picturesContainer')

    for(let i = 0; i < photosArray.length; i++){
        let photoBlock = pictureExample.cloneNode(true)
        photoBlock.querySelector(".pictureImg").src = '../static/img/photos/' + photosArray[i].src
        photoBlock.querySelector(".pictureStars").innerText = photosArray[i].likes
        photoBlock.querySelector(".pictureComments").innerText = photosArray[i].commentsNumber
        picturesContainer.append(photoBlock)
    }
}

showPictures(picturesDB)

let picturesContainer = document.querySelector('.picturesContainer')
picturesContainer.addEventListener('click', function(evt){
    let checkedElement = evt.target
    console.log(checkedElement)
    if(checkedElement.querySelector('.pictureImg')){
        for(let i = 0; i < picturesDB.length; i++){
            if(checkedElement.querySelector('.pictureImg').getAttribute('src') === '../static/img/photos/' + picturesDB[i].src){
                showCheckedPicture(picturesDB[i])
                break
            }
        }
    }
})
function showCheckedPicture(picture) {
    let openedPictureCommentsContainer = document.querySelector('.openedPictureCommentsContainer')
    let commentExample = document.querySelector('#templateComment').content.querySelector('.commentBlock')

    document.querySelector('.descriptionText').innerText = picture.description
    document.querySelector('.openedPictureStars').innerText = picture.likes
    document.querySelector('.openedPictureComments').innerText = picture.commentsNumber
    document.querySelector('.openedPictureImg').setAttribute('src', '../static/img/photos/' + picture.src)

    for(let i = 0; i < picture.commentsNumber; i++){
        let commentBlock = commentExample.cloneNode(true)
        commentBlock.querySelector(".commentText").innerText = picture.comments[i]
        commentBlock.querySelector(".commentAuthor").innerText = 'Анонім'
        openedPictureCommentsContainer.append(commentBlock)
    }
    document.querySelector('.openedPictureContainer').classList.remove('hidden')
}

document.querySelector('.closeButton').addEventListener('click', function(){
    document.querySelector('.openedPictureCommentsContainer').innerHTML = ''
    document.querySelector('.openedPictureContainer').classList.add('hidden')
})