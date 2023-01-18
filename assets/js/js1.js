document.addEventListener('DOMContentLoaded', () => {
    const date = new Date()
    sessionStorage.clear()
    createBoxID(13, 'container-IDPerson', "ID-Person")
    createBoxID(13, 'container-IDStudent', "ID-Student")

    document.getElementById('birthday').addEventListener('click', () => {
        console.log(document.getElementById('birthdayInput').click())
    })

    document.getElementById('birthdayInput').setAttribute('max' , date.toJSON().substring(0 , 10))
    document.getElementById('birthdayInput').setAttribute('min' , date.getUTCFullYear()-100+"-"+date.toJSON().substring(5 , 10))

    document.getElementById('birthdayInput').addEventListener('change' , (e)=>{
        document.getElementById('birthday').value = e.target.value
    })
    
    document.getElementById('input-img').addEventListener('change', (value) => {
        if(value.srcElement.files.length && (value.srcElement.files[0].type == "image/jpeg" || value.srcElement.files[0].type == "image/png")){
            let reader = new FileReader()
            reader.readAsDataURL(value.target.files[0])
            reader.addEventListener('load' , (e)=>{
                document.getElementById('exImg').setAttribute('src' , e.currentTarget.result)
            })
        }
    })

    document.getElementById('faculty').addEventListener('change' , (e)=>{
        if(e.target.value != 0) {
            e.target.setAttribute('style' , 'color:black')
        }
    })

    document.getElementById('gendar').addEventListener('change' , (e)=>{
        if(e.target.value != 0) {
            e.target.setAttribute('style' , 'color:black')
        }
    })

    Select('button[type="reset"]').addEventListener('click' , ()=>{
        document.getElementById('faculty').setAttribute('style' , 'color:#757575;')
        document.getElementById('gendar').setAttribute('style' , 'color:#757575;')
        document.getElementById('exImg').setAttribute('src' , 'RMUTT.png')
    })

    document.getElementById('exImg').addEventListener('click' , ()=>{
        document.getElementById('input-img').click()
    })


    Select('button[type="submit"]').addEventListener('click' , async (e)=>{
        let IdSd = ""
        let IdPs = ""
        let prefix = Select('input[type="radio"]:checked')
        let fullname = Select('#fullname')
        let email = Select('#email')
        let faculty = Select('#faculty')
        let birthday = Select('#birthday')
        let gendar = Select('#gendar')
        let img = Select('#exImg')

        let chk = true
        
        SelectAll('#container-IDPerson input').forEach((e , v)=>{
            IdPs += e.value
        })

        SelectAll('#container-IDStudent input').forEach((e , v)=>{
            IdSd += e.value
        })

        const data = new Map([
            ['IdPs' , (IdPs.length == 13) ? IdPs : ""],
            ['IdSd' , (IdSd.length == 13) ? IdSd : ""],
            ['prefix' , (prefix) ? prefix.getAttribute('value') : "" ],
            ['fullname' , fullname.value],
            ['email' , email.value],
            ['faculty' , (faculty.value != 0) ? faculty.value : ""],
            ['birthday' , birthday.value],
            ['gendar' , (gendar.value != 0) ? gendar.value : ""],
            ['img' , (img.getAttribute('src') != "RMUTT.png") ? img.getAttribute('src') : ""]
        ])

        let profile = ""

        data.forEach((v , k)=>{
            if(v == "") {
                chk = false
                profile += k+"="+v+"&"
                return false;
            } else {
                profile += k+"="+v+"&"
            }
        })

        if(chk && document.getElementById('imNotRobot').checked == true) {
            data.forEach((v , k)=>{
                sessionStorage.setItem(k,v)
            })
            // await fetch(window.location.href+"profile?"+profile , {
            // })
            // .then((val)=>val.text())
            // .then((html)=>{
            //     document.documentElement.innerHTML = html
            //     window.history.pushState({} , '' , 'profile')
            // }
            //     )
            // .catch((error)=>{
            //     console.log("Error:"+error)
            // })
        } else {
            e.preventDefault()
            alert('โปรดกรอกข้อมูลให้ครบถ้วน')
        }

        
    })
})

Select = (e) => document.querySelector(e)
SelectAll = (e) => document.querySelectorAll(e)

createBoxID = (length, focusContent, ID_Child) => {
    for (x = 1; x <= length; x++) {
        let InputID = document.createElement("input")
        //let html = parser.parseFromString("<input type='text' maxlength='1' id='"+ID_Child+"-"+x+"'>" , '/text/html')
        document.getElementById(focusContent).append(InputID)

        InputID.setAttribute('type', 'text')
        InputID.setAttribute('maxlength', 1)
        InputID.setAttribute('id', ID_Child + "-" + x)
        InputID.setAttribute('name', ID_Child)

        document.getElementById(ID_Child + "-" + x).addEventListener("keyup", (thisX) => {
            thisX.target.value = ""
            if (!isNaN(parseInt(thisX.key))) {
                thisX.target.value = thisX.key
                if (thisX.key != undefined && thisX.target.nextSibling != null) {
                    thisX.target.nextSibling.focus()
                } else if (thisX.target.nextSibling == null) {
                    thisX.target.blur()
                }
            } else if(thisX.key == "Backspace"){
                if(thisX.target.previousSibling != null){
                    thisX.target.previousSibling.value = ""
                    thisX.target.previousSibling.focus()
                }
            }
        })
    }
}
