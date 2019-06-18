window.addEventListener('load', function () {
    var go_back = document.getElementById("go-back");
    var today = document.getElementById("go-today");
    var go_forward = document.getElementById("go-forward");
    var main_slides = document.getElementsByTagName("main");
    var mounth = document.getElementsByClassName('calendar-mounth');
    var data_box = document.getElementsByClassName('data-box');
    // var input_smth = document.getElementsByClassName('modal-icon-input');
    // var button_sv = document.getElementsByClassName('modal-icon-save');
    // var button_cnl = document.getElementsByClassName('modal-icon-cancel');



    // Реализация перехода по календарю
    go_back.addEventListener('click', slide_back);
    go_forward.addEventListener('click', slide_forward);
    today.addEventListener('click', slide_today);

    var currentSlide=1;
    function slide_today(){
        main_slides[currentSlide].style.display = "none";
        mounth[currentSlide].style.display = "none";
        currentSlide = 1;
        main_slides[currentSlide].style.display = "flex";
        mounth[currentSlide].style.display = "flex";
    }

    function slide_forward() {
        main_slides[currentSlide].style.display = "none";
        mounth[currentSlide].style.display = "none";
        currentSlide = (currentSlide+1)%main_slides.length;
        main_slides[currentSlide].style.display = "flex";
        mounth[currentSlide].style.display = "flex";
    }

    function slide_back() {
        if(currentSlide==0){
            main_slides[currentSlide].style.display = "none";
            mounth[currentSlide].style.display = "none";
            currentSlide = main_slides.length-1;
            main_slides[currentSlide].style.display = "flex";
            mounth[currentSlide].style.display = "flex";
        }else{
            main_slides[currentSlide].style.display = "none";
            mounth[currentSlide].style.display = "none";
            currentSlide = (currentSlide-1)%main_slides.length;
            main_slides[currentSlide].style.display = "flex";
            mounth[currentSlide].style.display = "flex";
        }
    }



    // реализация модального окна(тут же и заметки для конкретного дня) и записи в заметки

    var flag = new Array(data_box.length);
    for(let i=0; i < data_box.length; i++){


        data_box[i].addEventListener('click',function(){

            window.sessionStorage.setItem("mounth",mounth[currentSlide].innerText);
            window.sessionStorage.setItem("date",data_box[i].innerText);

            if (flag[i]==true)
            {
                var modal_icon_check = document.getElementsByClassName('modal-icon');
                for(let j=0;j<modal_icon_check.length;j++){
                    if(modal_icon_check[j].getAttribute('title') == i){
                        modal_icon_check[j].style.display = "flex";
                    }
                }
            }
            else{
                modal_icon = document.createElement('div');
                document.getElementsByClassName('container')[0].appendChild(modal_icon);
                modal_icon.classList.add("modal-icon");
                modal_icon.style.display = "flex";
                modal_icon.setAttribute('title',i);
                flag[i]=true;

                var modal_icon_header = document.createElement('div');
                modal_icon.appendChild(modal_icon_header);
                modal_icon_header.classList.add("modal-icon-header");
                modal_icon_header.innerText = sessionStorage.getItem("mounth")+" - "+sessionStorage.getItem("date");

                var modal_icon_textarea = document.createElement('textarea');
                modal_icon.appendChild(modal_icon_textarea);
                modal_icon_textarea.classList.add("modal-icon-textarea");
                modal_icon_textarea.setAttribute('readonly',"readonly");

                var modal_icon_input = document.createElement('input');
                modal_icon.appendChild(modal_icon_input);
                modal_icon_input.classList.add("modal-icon-input");
                modal_icon_input.setAttribute('placeholder',"напишите заметку");

                var modal_icon_save = document.createElement('button');
                var modal_icon_cancel = document.createElement('button');
                modal_icon.appendChild(modal_icon_save);
                modal_icon_save.classList.add("modal-icon-save");
                modal_icon.appendChild(modal_icon_cancel);
                modal_icon_cancel.classList.add("modal-icon-cancel");
                modal_icon_save.innerText = "сохранить";
                modal_icon_cancel.innerText = "отмена";
            }

            modal_icon_cancel.addEventListener('click',function(){
                modal_icon_input.value = "";
                this.parentNode.style.display = "none";
            })

            modal_icon_save.addEventListener('click',function(){
                this.parentNode.firstChild.nextSibling.value += modal_icon_input.value+". ";
                modal_icon_input.value = "";
                this.parentNode.style.display = "none";
            })
        })

    }


})