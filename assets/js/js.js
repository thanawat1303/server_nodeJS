document.addEventListener('DOMContentLoaded', () => {
    createBoxID(13, 'container-IDPerson', "ID-Person")
    createBoxID(13, 'container-IDStudent', "ID-Student")

    document.getElementById('birthday').addEventListener('click', () => {
        console.log(document.getElementById('birthdayInput').click())
    })


    document.getElementById('input-img').addEventListener('change', (value) => {
        if(value.srcElement.files.length && (value.srcElement.files[0].type == "image/jpeg" || value.srcElement.files[0].type == "image/png")){
            let reader = new FileReader()
            reader.readAsDataURL(value.target.files[0])
            reader.addEventListener('load' , (e)=>{
                document.getElementById('exImg').setAttribute('src' , e.currentTarget.result)
            })
        } else {
            
        }
    })
})

createBoxID = (length, focusContent, ID_Child) => {
    for (x = 1; x <= length; x++) {
        let InputID = document.createElement("input")
        //let html = parser.parseFromString("<input type='text' maxlength='1' id='"+ID_Child+"-"+x+"'>" , '/text/html')
        document.getElementById(focusContent).append(InputID)

        InputID.setAttribute('type', 'text')
        InputID.setAttribute('maxlength', 1)
        InputID.setAttribute('id', ID_Child + "-" + x)

        document.getElementById(ID_Child + "-" + x).addEventListener("keyup", (thisX) => {
            if (!isNaN(thisX.key)) {
                thisX.target.value = thisX.key
                if (thisX.key != undefined && thisX.target.nextSibling != null) {
                    thisX.target.nextSibling.focus()
                } else if (thisX.target.nextSibling == null) {
                    thisX.target.blur()
                }
            }
        })
    }
}